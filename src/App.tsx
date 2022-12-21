import React, { Fragment } from "react";
import "./App.css";
import Layout from "./components/Layout";
import LeftAside from "./components/LeftAside";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Container from "./components/Container";
import Button from "./components/Button";
import NewItemForm from "./components/NewItemForm";
import Main from "./components/Main";
import {
  TextAreaFooter,
  TextAreaContainer,
  LineNumbersContainer,
  TextArea,
  TextAreaSidebar,
  UtilButton,
} from "./components/TextView";
import Data from "./data_logic/Data";

const data: Data = new Data();

function App() {
  const [dataTypes, setDataTypes] = React.useState<Array<string>>(["FirstNames"]);
  const [quickOption, setQuickOption] = React.useState<{[key: string]: boolean;}>({
    FirstNames: true,
    LastNames: false,
    Emails: false,
    PhoneNumbers: false,
    StreetAddresses: false,
    Cities: false,
    Countries: false,
    ZipCodes: false,
  });
  const [otherOption, setOtherOption] = React.useState<{[key: string]: boolean;}>({
    AlphaNumerics: false,
  });
  const [itemCount, setItemCount] = React.useState<number>(1);
  const [loadedCount, setLoadedCount] = React.useState<number>(1);
  const [format, setFormat] = React.useState<string>("JSON");
  const [dataString, setDataString] = React.useState<string>("");
  const [dataLines, setDataLines] = React.useState<string>("");
  const [copyButtonLabel, setCopyButtonLabel] = React.useState<string>("");
  const [newItemForms, setNewItemForms] = React.useState<Array<{id: string}>>([])
  const [formId, setFormId] = React.useState<number>(0)

  // Render default state on app load
  React.useEffect(() => {
    updateDataString();
  }, []);

  // Updates the dataString based on states
  const updateDataString = (): void => {
    data.update({
      itemCount: itemCount,
      types: dataTypes,
      format: format,
    });

    // This loads the dataString in small increments rather than the entire thing
    const truncated = Math.min(loadedCount, itemCount);
    const dataItem = data.loader.get(truncated);
    setDataString(dataItem.dataString);
    setDataLines(dataItem.dataLines);

    // This resets the copy button label to its original icon
    setCopyButtonLabel("");
  };

  // Handler for clicking one of the click options
  const handleQuickOptionSelect = (event: React.FormEvent<HTMLInputElement>) => {
    const option: string = event.currentTarget.value;
    setQuickOption({
      ...quickOption,
      [option]: !quickOption[option],
    });
  };

  // This code creates an Array of DataTypes, based on the quick options selected
  React.useEffect(() => {
    const quickOptions = Object.keys(quickOption).filter(
      (type) => quickOption[type] === true
    );

    // Combine with custom options if user chose custom
    const otherOptions = Object.keys(otherOption).filter(
      (type) => otherOption[type] === true
    )

    const types = [...quickOptions, ...otherOptions]
    setDataTypes(types);
  }, [quickOption, otherOption]);

  // Handler for when the user selects a size option
  const handleSizeSelect = (event: React.FormEvent<HTMLInputElement>) => {
    const count: number = Number(event.currentTarget.value);
    setItemCount(count);
    setLoadedCount(Math.min(count, 100));
  };

  // Rerenders the data on the screen when itemCount, dataTypes, or format change
  React.useEffect(() => {
    updateDataString();
  }, [itemCount, dataTypes, format]);

  // Handler for when the users changes the format
  const handleFormatSelect = (event: React.FormEvent<HTMLInputElement>) => {
    const currentFormat: string = event.currentTarget.value;
    setFormat(currentFormat);
  };

  // Loads a string on the screen 100 items at a time
  const lazyLoadData = () => {
    if (loadedCount > itemCount) return;
    setLoadedCount(loadedCount + 100);
    updateDataString();
  };

  // Loads more data when the user reaches the bottom
  const handleScroll = (event: React.UIEvent) => {
    const containerHeight = event.currentTarget.clientHeight;
    const contentHeight = event.currentTarget.scrollHeight;
    const threshold = contentHeight - containerHeight;

    if (event.currentTarget.scrollTop >= threshold - 50) {
      lazyLoadData();
    }
  };

  // Handler for when the user clicks on the Copy button
  const handleCopy = () => {
    const dataToCopy = data.loader.getFullString();
    navigator.clipboard.writeText(dataToCopy);
    setCopyButtonLabel("Copied!");
  };

  // Handler for when the user clicks on the Clear button
  const handleClear = () => {
    const defaultOptions = {
      FirstNames: false,
      LastNames: false,
      Emails: false,
      PhoneNumbers: false,
      StreetAddresses: false,
      Cities: false,
      Countries: false,
      ZipCodes: false,
    }
    setQuickOption(defaultOptions)
  };

  // Handler for when the user clicks on the refresh button
  const handleRefresh = () => {
    data.shuffle()
    updateDataString()
  }

  // Handler for when the user clicks on the download button
  const handleDownload = () => {
    const dataToDownload = data.loader.getFullString()
    let blob: Blob | MediaSource

    switch (format) {
      case "JSON":
        blob = new Blob([dataToDownload], { type: 'application/json' });
        break;
    
      case "CSV":
        blob = new Blob([dataToDownload], { type: 'text/csv' });
        break
    }

    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob!)
    a.download = `data.${format.toLowerCase()}`
    document.body.appendChild(a)
    a.click()
  }

  // Handler for when the user clicks Add Another Field
  const handleAddField = () => {
    setNewItemForms([...newItemForms, {id: `form-${formId}`}])
    setFormId(formId + 1)
  };

  const handleDeleteForm = (formId: string) => {
    setNewItemForms(newItemForms.filter(form => form.id !== formId))
  }

  const handleFormSelect = (selectedOptions: any) => {
    let option = selectedOptions.value
    console.log(selectedOptions.id)
    setOtherOption({
      ...otherOption,
      [option]: !otherOption[option],
    });
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
              checked={quickOption["FirstNames"]}
              onChange={handleQuickOptionSelect}
            />
            <Button
              type="checkbox"
              buttonTitle="Last Names"
              groupName="quick-options"
              onChange={handleQuickOptionSelect}
              checked={quickOption["LastNames"]}
            />
            <Button
              type="checkbox"
              buttonTitle="Emails"
              groupName="quick-options"
              onChange={handleQuickOptionSelect}
              checked={quickOption["Emails"]}
            />
            <Button
              type="checkbox"
              buttonTitle="Phone Numbers"
              groupName="quick-options"
              onChange={handleQuickOptionSelect}
              checked={quickOption["PhoneNumbers"]}
            />
            <Button
              type="checkbox"
              buttonTitle="Street Addresses"
              groupName="quick-options"
              onChange={handleQuickOptionSelect}
              checked={quickOption["StreetAddresses"]}
            />
            <Button
              type="checkbox"
              buttonTitle="Cities"
              groupName="quick-options"
              onChange={handleQuickOptionSelect}
              checked={quickOption["Cities"]}
            />
            <Button
              type="checkbox"
              buttonTitle="Countries"
              groupName="quick-options"
              onChange={handleQuickOptionSelect}
              checked={quickOption["Countries"]}
            />
            <Button
              type="checkbox"
              buttonTitle="Zip Codes"
              groupName="quick-options"
              onChange={handleQuickOptionSelect}
              checked={quickOption["ZipCodes"]}
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
          title="More Options"
          customStyle={{
            paddingTop: "var(--half)",
            paddingBottom: "var(--one",
          }}
        >
          <div>
            {newItemForms.map(form => (
              <NewItemForm 
                key={form.id}
                id={form.id}
                onDelete={handleDeleteForm}
                onChangeSelect={handleFormSelect}
              />
            ))}
          </div>
          <Button
            type="normal"
            buttonTitle="Add Field"
            customStyle={{ marginTop: "1rem", height: "3.5rem" }}
            onClick={handleAddField}
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
          <Container
            containerTitle={"TextViewWrapper"}
            customStyle={{
              height: "100%",
              overflow: "hidden",
              flexDirection: "column",
            }}
          >
            <Container
              containerTitle={"TextAreaWrapper"}
              customStyle={{
                height: "100%",
                flexDirection: "row",
                paddingBottom: "var(--half)",
              }}
            >
              <TextAreaContainer onScroll={handleScroll}>
                <LineNumbersContainer>{dataLines}</LineNumbersContainer>

                <TextArea>{dataString}</TextArea>
              </TextAreaContainer>
              <TextAreaSidebar>
                <UtilButton
                  title="copy"
                  customStyle={{
                    marginBottom: "auto",
                    marginTop: "1rem",
                  }}
                  onClick={handleCopy}
                  clickedLabel={copyButtonLabel}
                />
                <UtilButton title="download"
                  onClick={handleDownload} 
                />
                <UtilButton title="refresh" 
                  onClick={handleRefresh}
                />
                <UtilButton title="clear"
                  onClick={handleClear}
                />
              </TextAreaSidebar>
            </Container>
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
              {/* <Button
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
              /> */}
            </TextAreaFooter>
          </Container>
        </Section>
      </Main>
    </Layout>
  );
}

export default App;
