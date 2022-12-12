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
import TextView from './components/TextView';
import { useState } from 'react'; 
import { getLines } from'./linesCache';

function App() {
  const [numLines, setNumLines] = useState("1 2 3 4 5 6 7 8 9 10 11 ")
  const [dataLines, setDataLines] = useState("This is the data")
  // const [selectedOption, setSelectedOption] = useState(null)

  function handleChange(event) {
    // setSelectedOption(event.target.value);
    const lineNums = event.target.value
    const lines = getLines(lineNums)
    setNumLines(lines)
  }

  // Number of lines decreases

  function* lineGenerator(currentLines, loadLimit, genString = "") {
    const startingPoint = (genString[0] || 1)
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
              buttonTitle="Option 1"
              groupName="quick-options"
              checked="true" 
            />
            <Button 
              type="checkbox" 
              buttonTitle="Option 2"
              groupName="quick-options"
            />
            <Button 
              type="checkbox" 
              buttonTitle="Option 3"
              groupName="quick-options"
            />
            <Button 
              type="checkbox" 
              buttonTitle="Option 4"
              groupName="quick-options" 
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
              onChange={handleChange}
              checked="true"
            />
            <Button
              type="radio"
              buttonTitle="10"
              customStyle={{ maxWidth: "3.5rem" }}
              groupName="size-options"
              onChange={handleChange}
            />
            <Button
              type="radio"
              buttonTitle="100"
              customStyle={{ maxWidth: "3.5rem" }}
              groupName="size-options"
              onChange={handleChange}
            />
            <Button
              type="radio"
              buttonTitle="1000"
              customStyle={{ maxWidth: "3.5rem" }}
              groupName="size-options"
              onChange={handleChange}
            />
          </Container>

          <Container
            containerTitle={"OtherButtonSection"}
            customStyle={{ justifyContent: "space-between" }}
          >
            <Button 
              type="radio" 
              buttonTitle="Other" 
              maxWidth="3.5rem"
              groupName="size-options"
              onChange={handleChange} 
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
            lineNumbers={numLines}
            data={dataLines}
          />
        </Section>
      </Main>
    </Layout>
  );
}

export default App;
