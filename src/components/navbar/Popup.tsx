import React, { useEffect, useRef, useContext } from "react";
import { DarkModeContext } from "../../App";


type PopupProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

// Closes the settings window when clicked outside of the menu
function useClickOutsideHandler(
  ref: React.MutableRefObject<any>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current 
        && !ref.current.contains(event.target)
        && (event.target as HTMLElement).id !== "info-icon"
      ) {
        setVisible(false);
      }
    }
    // Bind event
    document.addEventListener("mousedown", handleClickOutside);

    // Unbind event
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const PopupWindow: React.FunctionComponent<PopupProps> = ({
  setVisible,
}) => {
  const darkMode = useContext(DarkModeContext)
  const themeClassName = (darkMode) ? 'dark-mode' : 'light-mode'

  const darkModePathModifier = (darkMode) ? "-dark" : ""

  const wrapperRef = useRef(null);
  useClickOutsideHandler(wrapperRef, setVisible);
  return (
    <div
      ref={wrapperRef}
      className="InfoBoxContainer"
      style={{
        width: "500px",
        height: "700px",
        background: (darkMode) ? "var(--brown)" : "var(--mist)",
        position: "absolute",
        top: "-41rem",
        left: "50px",
        zIndex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: (darkMode) ? "var(--dark-mode-border-style)" : "var(--border-style)",
        borderRadius: "12px",
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.13)'
      }}
    >
      <div
        className="CloseButtonContainer"
        style={{
          position: "relative",
        }}
        onClick={() => setVisible(false)}
      >
        <img
          className="CloseButtonIcon"
          style={{
            height: "12px",
            position: "absolute",
            left: "25rem",
            top: "-21.3rem",
            cursor: "pointer",
          }}
          src={`/icons/close-icon${darkModePathModifier}.png`}
          alt="close-icon"
        />
      </div>

      <div
        className="AboutContainer"
        style={{ 
          height: "100%",
          width: "70%",
          paddingTop: "1rem",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h1
          className={`AboutTitle ${themeClassName}`}
          style={{
            fontSize: "24px",
            fontWeight: "600",
            borderBottom: (darkMode) ? "var(--dark-mode-border-style)" : "var(--border-style)",
            textAlign: "center",
            marginTop: "1rem",
            marginBottom: ".5rem"
          }}
        >
          About
        </h1>

        <p
          className={themeClassName}
          style={{marginBottom: "2rem"}}
        >
        This tool provides quick access to random data in various forms that you can easily copy and paste into your IDE. It is useful for simple testing purposes, but may not meet more complex testing needs.
        </p>

        <h1
          className={`AboutTitle ${themeClassName}`}
          style={{
            fontSize: "24px",
            fontWeight: "600",
            borderBottom: (darkMode) ? "var(--dark-mode-border-style)" : "var(--border-style)",
            textAlign: "center",
            marginBottom: ".5rem"
          }}
        >
          How to use
        </h1>
        <ul
          className={themeClassName}
          style={{
            listStyleType: "square",
            paddingLeft: "2rem",
            height: "45%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <li>
            <p>Select one or more <em>Quick Options</em> from the list.</p>
          </li>
          <li>
            <p>For more available item types, click <em>Add Field</em> and select an item from the dropdown menu.</p>
          </li>
          <li>
            <p>To choose a size for the items, click on one of the predefined sizes or select <em>Other</em> to enter your own size.</p>
          </li>
          <li>
            <p>Select a format type from available options.</p>
          </li>
          <li>
            <p>Use the <em>Copy</em>, <em>Download</em>, <em>Refresh</em>, or <em>Clear</em> icons to perform their respective functionality. </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PopupWindow;
