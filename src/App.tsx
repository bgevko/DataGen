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

const data: Data = new Data();

function App() {
  const [dataTypes, setDataTypes] = React.useState<Array<string>>([
    "FirstNames",
  ]);
  const [quickOption, setQuickOption] = React.useState<{
    [key: string]: boolean;
  }>({
    FirstNames: true,
    LastNames: false,
    PhoneNumbers: false,
    ZipCodes: false,
  });
  const [itemCount, setItemCount] = React.useState<number>(1);
  const [loadedCount, setLoadedCount] = React.useState<number>(1)
  const [format, setFormat] = React.useState<string>("JSON");
  const [dataString, setDataString] = React.useState<string>("");
  const [dataLines, setDataLines] = React.useState<string>("");
  // const [selectedOption, setSelectedOption] = useState(null)

  React.useEffect(() => {
    updateDataString();
  }, []);

  const updateDataString = (): void => {
    const count = Math.min(loadedCount, itemCount)
    data.update({
      itemCount: count,
      types: dataTypes,
      format: format,
    });

    const dataItem = data.loader.get(itemCount);
    setDataString(dataItem.dataString);
    setDataLines(dataItem.dataLines);
  };

  const handleQuickOptionSelect = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const option: string = event.currentTarget.value;
    setQuickOption({
      ...quickOption,
      [option]: !quickOption[option],
    });
  };

  React.useEffect(() => {
    const types = Object.keys(quickOption).filter(
      (type) => quickOption[type] === true
    );
    setDataTypes(types);
  }, [quickOption]);

  const handleSizeSelect = (event: React.FormEvent<HTMLInputElement>) => {
    const count: number = Number(event.currentTarget.value);
    setItemCount(count);
    setLoadedCount(Math.min(count, 100))
  };

  React.useEffect(() => {
    updateDataString();
  }, [itemCount, dataTypes, format]);

  const handleFormatSelect = (event: React.FormEvent<HTMLInputElement>) => {
    const currentFormat: string = event.currentTarget.value;
    setFormat(currentFormat);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
  };

  const lazyLoadData = () => {
    if (itemCount === loadedCount) return;
    setLoadedCount(loadedCount + 100)
    updateDataString()
  };

  const handleScroll = (event: React.UIEvent) => {
    const containerHeight = event.currentTarget.clientHeight;
    const contentHeight = event.currentTarget.scrollHeight;
    const threshold = contentHeight - containerHeight;

    if (event.currentTarget.scrollTop >= threshold - 50) {
      lazyLoadData();
    }
  };

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
              defaultChecked={true}
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
              buttonTitle="Emails"
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
              buttonTitle="Street Addresses"
              groupName="quick-options"
              onChange={handleQuickOptionSelect}
            />
            <Button
              type="checkbox"
              buttonTitle="Cities"
              groupName="quick-options"
              onChange={handleQuickOptionSelect}
            />
            <Button
              type="checkbox"
              buttonTitle="Countries"
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
              buttonTitle="1"
              customStyle={{ maxWidth: "3.5rem" }}
              groupName="size-options"
              defaultChecked={true}
              onChange={handleSizeSelect}
            />
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
              buttonTitle="50"
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
              buttonTitle="100"
              customStyle={{ maxWidth: "3.5rem" }}
              groupName="size-options"
              onChange={handleSizeSelect}
            />
            <Button
              type="radio"
              buttonTitle="500"
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
            <Button
              type="radio"
              buttonTitle="5000"
              customStyle={{ maxWidth: "3.5rem" }}
              groupName="size-options"
              onChange={handleSizeSelect}
            />
            {/* <Button
              type="radio"
              buttonTitle="Other"
              groupName="size-options"
              onChange={handleSizeSelect}
            /> */}
            {/* <Input type="number" placeHolder="10,000 max" /> */}
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
          <TextView
            lineNumbers={dataLines}
            data={dataString}
            onScroll={handleScroll}
          >
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
                defaultChecked={true}
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
