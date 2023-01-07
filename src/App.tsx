import React, { createContext, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Aside from "./components/aside/Aside";
import Navbar from "./components/navbar/Navbar";
import NavLink from "./components/navbar/NavLink";
import QuickOptions from "./components/aside/QuickOptions";
import SizeOptions from "./components/aside/SizeOptions";
import { CustomOptions, ItemForms } from "./components/aside/CustomOptions";
import { TextArea, Text } from "./components/main/TextArea";
import Sidebar from "./components/main/Sidebar";
import SidebarButton from "./components/main/SidebarButton";
import TextFooter from "./components/main/TextFooter";
import Row from "./components/containers/Row";
import Button from "./components/buttons/Button";
import CheckboxButton from "./components/buttons/CheckboxButton";
import RadioButton from "./components/buttons/RadioButton";
import Main from "./components/main/Main";
import { useQuickOptions } from "./custom_hooks/useQuickOptions";
import { useSizeOptions } from "./custom_hooks/useSizeOptions";
import { useCustomItemForm } from "./custom_hooks/useCustomItemForm";
import { updateData } from "./utils/updateData";
import useHandleData from "./custom_hooks/useHandleData";
import { useFormatOptions } from "./custom_hooks/useFormatOptions";
import useDataString from "./custom_hooks/useDataString";
import useDarkMode from "./custom_hooks/useDarkMode";
import InputNumber from './components/inputs/InputNumber';

// Dark mode context
export const DarkModeContext = createContext(false)

function App() {

  // Quick options states
  const [quickOptions, quickOptionsSelected, handleQuickOptionSelect, clearQuickOptions] = useQuickOptions();

  // Custom option states
  const [
    customOptions,
    itemForms,
    formOptions,
    handleAddForm,
    handleDeleteForm,
    handleSelectItem,
    clearCustomOptions,
  ] = useCustomItemForm();

  // Size option states
  const [size, sizeSelected, inputValue, handleSizeSelect, handleInputValue, clearSizeOptions] = useSizeOptions();

  // Format option states
  const [format, formatSelected, handleSelectFormat, clearFormatOptions] = useFormatOptions()

  // Data type, (non-state)
  const dataTypes = [...quickOptions, ...customOptions]

  // Update data object, not a state
  const data = updateData(size, dataTypes, format)

  // Data data strings and lazy loading
  const [dataString, dataLines, handleScroll] = useDataString(data, size)

  // Handle functionality
  const [
    copiedState, setCopiedState,
    handleCopy,  
    handleDownload, 
    handleRefresh, 
    handleClear] = useHandleData(
      data, 
      clearQuickOptions,
      clearSizeOptions,
      clearCustomOptions,
      clearFormatOptions
    )
  
  // Dark mode
  const [darkMode, toggleDarkMode] = useDarkMode()
  
  useEffect(() => {
    const root = document.documentElement
    root.className = (darkMode) ? 'dark-mode' : 'light-mode'
  }, [darkMode])

  return (
    <DarkModeContext.Provider value={darkMode}>
      <Layout>
        <Navbar>
          <NavLink title="b-icon" path="https://github.com/bgevko/DataGen" customStyle={{marginBottom: "auto"}}/>
          <NavLink title="color-mode-icon" path="#" toggleDarkMode={toggleDarkMode}/>
          <NavLink title="info-icon" path="#" hasPopup={true} />
        </Navbar>
        <Aside>
          <QuickOptions>
            <CheckboxButton
              buttonTitle="First Names"
              groupName="quick-options"
              checked={quickOptionsSelected["FirstNames"]}
              onToggle={handleQuickOptionSelect}
            />
            <CheckboxButton
              buttonTitle="Last Names"
              groupName="quick-options"
              checked={quickOptionsSelected["LastNames"]}
              onToggle={handleQuickOptionSelect}
            />
            <CheckboxButton
              buttonTitle="Emails"
              groupName="quick-options"
              onToggle={handleQuickOptionSelect}
              checked={quickOptionsSelected["Emails"]}
            />
            <CheckboxButton
              buttonTitle="Phone Numbers"
              groupName="quick-options"
              onToggle={handleQuickOptionSelect}
              checked={quickOptionsSelected["PhoneNumbers"]}
            />
            <CheckboxButton
              buttonTitle="Street Addresses"
              groupName="quick-options"
              onToggle={handleQuickOptionSelect}
              checked={quickOptionsSelected["StreetAddresses"]}
            />
            <CheckboxButton
              buttonTitle="Cities"
              groupName="quick-options"
              onToggle={handleQuickOptionSelect}
              checked={quickOptionsSelected["Cities"]}
            />
            <CheckboxButton
              buttonTitle="Countries"
              groupName="quick-options"
              onToggle={handleQuickOptionSelect}
              checked={quickOptionsSelected["Countries"]}
            />
            <CheckboxButton
              buttonTitle="Zip Codes"
              groupName="quick-options"
              onToggle={handleQuickOptionSelect}
              checked={quickOptionsSelected["ZipCodes"]}
            />
          </QuickOptions>

          <SizeOptions>
            <Row
              title={"SizeOptionsRow"}
              customStyle={{ justifyContent: "space-between" }}
            >
              <RadioButton
                buttonTitle="1"
                groupName="size-options"
                onChange={handleSizeSelect}
                checked={sizeSelected["1"]}
                customStyle={{
                  width:"25%"
                }}
              />
              <RadioButton
                buttonTitle="5"
                groupName="size-options"
                onChange={handleSizeSelect}
                checked={sizeSelected["5"]}
                customStyle={{
                  width:"25%"
                }}
              />
              <RadioButton
                buttonTitle="10"
                groupName="size-options"
                onChange={handleSizeSelect}
                checked={sizeSelected["10"]}
                customStyle={{
                  width:"25%"
                }}
              />
              <RadioButton
                buttonTitle="50"
                groupName="size-options"
                onChange={handleSizeSelect}
                checked={sizeSelected["50"]}
                customStyle={{
                  width:"25%"
                }}
              />
            </Row>
            <Row
              title={"SizeOptionsRow"}
              customStyle={{ justifyContent: "space-between" }}
            >
              <RadioButton
                buttonTitle="100"
                groupName="size-options"
                onChange={handleSizeSelect}
                checked={sizeSelected["100"]}
                customStyle={{
                  width:"25%"
                }}
              />
              <RadioButton
                buttonTitle="500"
                groupName="size-options"
                onChange={handleSizeSelect}
                checked={sizeSelected["500"]}
                customStyle={{
                  width:"25%"
                }}
              />
              <RadioButton
                buttonTitle="1000"
                groupName="size-options"
                onChange={handleSizeSelect}
                checked={sizeSelected["1000"]}
                customStyle={{
                  width:"25%"
                }}
              />
              <RadioButton
                buttonTitle="5000"
                groupName="size-options"
                onChange={handleSizeSelect}
                checked={sizeSelected["5000"]}
                customStyle={{
                  width:"25%"
                }}
              />
            </Row>
            <Row
              title={"SizeOptionsRow"}
              customStyle={{ justifyContent: "space-between" }}
            >
              <RadioButton
                buttonTitle="Other"
                groupName="size-options"
                onChange={handleSizeSelect}
                checked={sizeSelected["Other"]}
                customStyle={{
                  width:"25%"
                }}
              />
              <InputNumber
                inputValue={inputValue}
                placeHolder="5,000 max"
                customStyle={{
                  width:"75%",
                }}
                hidden={!sizeSelected["Other"]}
                onChange={handleInputValue}
              />
            </Row>
          </SizeOptions>

          <CustomOptions>
            <ItemForms
              forms={itemForms}
              options={formOptions}
              disabledOptions={customOptions}
              onDelete={handleDeleteForm}
              onChangeSelect={handleSelectItem}
            />
            <Button
              isDisabled={(itemForms.length === formOptions.length)}
              buttonTitle="Add Field"
              customStyle={{ marginTop: "1rem", height: "3.5rem" }}
              onClick={handleAddForm}
            />
          </CustomOptions>
        </Aside>
        <Main>
          <TextArea>
            <Text
              dataLines={dataLines}
              dataItems={dataString}
              onScroll={handleScroll}
              setCopiedState={setCopiedState}
            />
            <Sidebar>
              <SidebarButton
                title="copy"
                customStyle={{
                  marginBottom: "auto",
                  marginTop: "1rem",
                }}
                onClick={handleCopy}
                copiedState={copiedState}
              />
              <SidebarButton title="download" onClick={handleDownload} />
              <SidebarButton title="refresh" onClick={handleRefresh} />
              <SidebarButton title="clear" onClick={handleClear} />
            </Sidebar>
          </TextArea>
          <TextFooter>
            <RadioButton
              buttonTitle="JSON"
              groupName="format-options"
              onChange={handleSelectFormat}
              checked={formatSelected["JSON"]}
              borderRadius="12px"
              height="50px"
              customStyle={{
                width: "7rem",
                minWidth: "90px"
              }}
            />
            <RadioButton
              buttonTitle="CSV"
              groupName="format-options"
              onChange={handleSelectFormat}
              checked={formatSelected["CSV"]}
              borderRadius="12px"
              height="50px"
              customStyle={{
                width: "7rem",
                minWidth: "90px"
              }}
            />
            <RadioButton
              buttonTitle="Array"
              groupName="format-options"
              onChange={handleSelectFormat}
              checked={formatSelected["Array"]}
              borderRadius="12px"
              height="50px"
              customStyle={{
                width: "7rem",
                minWidth: "90px"
              }}
            />
            <RadioButton
              buttonTitle="Object"
              groupName="format-options"
              onChange={handleSelectFormat}
              checked={formatSelected["Object"]}
              borderRadius="12px"
              height="50px"
              customStyle={{
                width: "7rem",
                minWidth: "90px"
              }}
            />
          </TextFooter>
        </Main>
      </Layout>
    </DarkModeContext.Provider>
  );
}

export default App;