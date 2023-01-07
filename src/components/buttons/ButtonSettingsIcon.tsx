import React, { useEffect, useRef, useState } from "react";
import { ICON_DIRECTORY } from "../navbar/NavLink"
import ButtonSettingsWindow from "./ButtonSettingsWindow";

type ButtonSettingsIconProps = {
  //
}

const iconPath: string = `${ICON_DIRECTORY}btn-settings-icon.png`;

const ButtonSettingsIcon: React.FunctionComponent<ButtonSettingsIconProps> = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  function toggleSettingsWindow() {
    setIsVisible(!isVisible)
  }

  
  const settingsWindow = <div 
    style={{
      display : (isVisible) ? "block" : "none",
      position: "relative"
    }}>
    <ButtonSettingsWindow 
      setVisible={setIsVisible}
    />
  </div>
  return (
    <>
    {settingsWindow}
    <span 
      className="ButtonSettingsContainer"
      style={{
        height: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: "4.8rem"
      }}
    >
      <button 
        className="button-settings-btn"
        onClick={toggleSettingsWindow}
      >
        <img
          className="ButtonSettingsIcon"
          src={iconPath} 
          alt='settings icon' 
        />
      </button>
    </span>
    </>
  )
}

export default ButtonSettingsIcon