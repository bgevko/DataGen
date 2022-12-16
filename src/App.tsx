import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import LeftAside from "./components/LeftAside";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Container from "./components/Container";
import Button from "./components/Button";
import Input from "./components/Input";
import NewItemForm from "./components/NewItemForm";
import Main from "./components/Main";
import { TextView, TextAreaFooter } from "./components/TextView";
import Data from "./data_logic/Data";

function App() {
  const [dataTypes, setDataTypes] = React.useState<Array<string>>(["FirstNames"])
  const [itemCount, setItemCount] = React.useState<number>(5)
  const [format, setFormat] = React.useState<string>("JSON")
  const [dataString, setDataString] = React.useState<string>('')
  const [numLines, setNumLines] = React.useState<string>("1 2 3 4 5 6 7 8 9 10 11 ");
  const [dataLines, setDataLines] = React.useState<string>("This is the data");

  const data = new Data()
  // const [selectedOption, setSelectedOption] = useState(null)

  React.useEffect(() => {
    data.update({
      itemCount: itemCount,
      types: dataTypes
    })
    setDataString(data.displayJson())
  }, []);
  
  function handleQuickOptionSelect(event: React.FormEvent<HTMLInputElement>) {
    setDataTypes(prevDataTypes => prevDataTypes.concat(event.currentTarget.value));
  }

  function handleSizeSelect(event: React.FormEvent<HTMLInputElement>) {
    setItemCount(Number(event.currentTarget.value))
  }

  function handleFormatSelect(event: React.FormEvent<HTMLInputElement>) {
    setFormat(event.currentTarget.value)
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    console.log(event.currentTarget.value);
  }

  // Number of lines decreases

  function* lineGenerator(currentLines: number, loadLimit: number, genString: string = ""): IterableIterator<string> {
    const startingPoint = genString[0] || 1;
    for (let i = 1; i <= 10000; i++) {
      genString += `${i} `;

      if (i === currentLines || i % loadLimit === 0) {
        yield genString;
      }
    }
  }

  return (
    <Layout>
      <Navbar></Navbar>
      <LeftAside>
        <Section
          title="Quick Options"
          customStyle={{
            paddingTop: "var(--half)",
            paddingBottom: "var(--one",
            borderBottom: "var(--border-style)",
          }}
        >
          <Container
            containerTitle={"QuickOptions"}
            customStyle={{ flexDirection: "column" }}
          >
            <Button
              type="checkbox"
              buttonTitle="First Names"
              groupName="quick-options"
              onChange={handleQuickOptionSelect}
            />
            <Button
              type="checkbox"
              buttonTitle="Last Names"
              groupName="quick-options"
              onChange={handleQuickOptionSelect}
            />
            <Button
              type="checkbox"
              buttonTitle="Phone Numbers"
              groupName="quick-options"
              onChange={handleQuickOptionSelect}
            />
            <Button
              type="checkbox"
              buttonTitle="Zip Codes"
              groupName="quick-options"
              onChange={handleQuickOptionSelect}
            />
          </Container>
        </Section>

        <Section
          title="Set Size"
          customStyle={{
            paddingTop: "var(--half)",
            paddingBottom: "var(--one",
            borderBottom: "var(--border-style)",
          }}
        >
          <Container
            containerTitle={"SetSizeOptions"}
            customStyle={{ justifyContent: "space-between" }}
          >
            <Button
              type="radio"
              buttonTitle="5"
              customStyle={{ maxWidth: "3.5rem" }}
              groupName="size-options"
              onChange={handleSizeSelect}
            />
            <Button
              type="radio"
              buttonTitle="10"
              customStyle={{ maxWidth: "3.5rem" }}
              groupName="size-options"
              onChange={handleSizeSelect}
            />
            <Button
              type="radio"
              buttonTitle="100"
              customStyle={{ maxWidth: "3.5rem" }}
              groupName="size-options"
              onChange={handleSizeSelect}
            />
            <Button
              type="radio"
              buttonTitle="1000"
              customStyle={{ maxWidth: "3.5rem" }}
              groupName="size-options"
              onChange={handleSizeSelect}
            />
          </Container>

          <Container
            containerTitle={"OtherButtonSection"}
            customStyle={{ justifyContent: "space-between" }}
          >
            <Button
              type="radio"
              buttonTitle="Other"
              groupName="size-options"
              onChange={handleSizeSelect}
            />
            <Input type="number" placeHolder="10,000 max" />
          </Container>
        </Section>

        <Section
          title="Custom"
          customStyle={{
            paddingTop: "var(--half)",
            paddingBottom: "var(--one",
          }}
        >
          <NewItemForm></NewItemForm>
          <Button
            type="normal"
            buttonTitle="Add Another Field"
            customStyle={{ marginTop: "1rem", height: "3.5rem" }}
            onChange={handleChange}
          />
        </Section>
      </LeftAside>
      <Main>
        <Section
          customStyle={{
            width: "95%",
            height: "95%",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "var(--two)",
            background: "var(--mist)",
            borderRadius: "32px",
            boxShadow: "3px 3px 21px 11px rgba(0, 0, 0, 0.13)",
          }}
        >
          <TextView lineNumbers={numLines} data={dataString}>
            <TextAreaFooter>
              <Button
                type="radio"
                buttonTitle="JSON"
                groupName="format-options"
                customStyle={{
                  maxWidth: "6rem",
                  height: "50px",
                  marginLeft: "var(--one)",
                  borderRadius: "12px",
                }}
                onChange={handleFormatSelect}
              />
              <Button
                type="radio"
                buttonTitle="CSV"
                groupName="format-options"
                customStyle={{
                  maxWidth: "6rem",
                  height: "50px",
                  marginLeft: "var(--one)",
                  borderRadius: "12px",
                }}
                onChange={handleFormatSelect}
              />
              <Button
                type="radio"
                buttonTitle="JavaScript"
                groupName="format-options"
                customStyle={{
                  maxWidth: "6rem",
                  height: "50px",
                  marginLeft: "var(--one)",
                  borderRadius: "12px",
                }}
                onChange={handleFormatSelect}
              />
            </TextAreaFooter>
          </TextView>
        </Section>
      </Main>
    </Layout>
  );
}

export default App;
