import React, { CSSProperties, useState, useContext } from "react";
import PopupWindow from "./Popup";
import { DarkModeContext } from "../../App";

export const ICON_DIRECTORY: string = "/icons/";
type NavLinkProps = {
  title: string,
  path: string,
  customStyle?: CSSProperties,
  hasPopup?: boolean,
  toggleDarkMode?: () => void
}

const NavLink: React.FunctionComponent<NavLinkProps> = ({
  title,
  path,
  customStyle,
  hasPopup,
  toggleDarkMode

}) => {
  const darkMode = useContext(DarkModeContext)

  // Handle dark mode icons
  const darkModePathModifier = (darkMode) ? '-dark' : ''
  const iconLink: string = `${ICON_DIRECTORY}${title}${darkModePathModifier}.png`;
  const activeIconLink: string = `${ICON_DIRECTORY}${title}-active${darkModePathModifier}.png`;

  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const infoBox = (hasPopup)
  ?
    <PopupWindow setVisible={setPopupVisible}/>
  :
    null
  
  function handleClick() {
    if (toggleDarkMode) {
      toggleDarkMode()
      return
    }
    if (!hasPopup) return
    setPopupVisible(!popupVisible)
  }

  const iconPath = (popupVisible) ?  activeIconLink : iconLink
  return (
    <>
      <div style={{
        position: "relative",
        display: (popupVisible) ? "block" : "none"
      }}>
        {infoBox}
      </div>
      <span
        className="NavLinkContainer"
        style={{
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "var(--one)",
          marginBottom: "var(--one)",
          ...customStyle
        }}
      >
        <a
          href={path}
          onClick={handleClick}
        >
          <img
            id={title}
            className="NavIcon"
            style={{
              height: "35px",
            }}
            src={iconPath}
            alt={`${title}`}
          />
        </a>
      </span>
    </>
  );
}

export default NavLink