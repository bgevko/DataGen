import React, { useEffect, useRef } from "react";
import InputCheckbox from "../inputs/InputCheckbox";
import InputNumber from "../inputs/InputNumber";

type SettingsProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

// Closes the settings window when clicked outside of the menu
function useClickOutsideHandler(
  ref: React.MutableRefObject<any>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
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

const ButtonSettingsWindow: React.FunctionComponent<SettingsProps> = ({
  setVisible,
}) => {
  const wrapperRef = useRef(null);
  useClickOutsideHandler(wrapperRef, setVisible);
  return (
    <div
      ref={wrapperRef}
      className="SettingsContainer"
      style={{
        width: "360px",
        height: "85px",
        background: "var(--mist)",
        border: "1px var(--thunder) solid",
        borderRadius: "12px",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        top: "-7rem",
        left: "-125px",
        justifyContent: "flex-start",
        alignItems: "center",
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
            left: "9.7rem",
            top: ".5rem",
            cursor: "pointer",
          }}
          src="/icons/close-icon.png"
          alt="close-icon"
        />
      </div>

      <div
        style={{
          width: "80%",
          textAlign: "center",
          borderBottom: "var(--border-style)",
          paddingTop: ".3rem",
          paddingBottom: ".3rem",
        }}
      >
        <h2
          style={{
            fontWeight: "700",
            color: "var(--thunder)",
          }}
        >
          Array Settings
        </h2>
      </div>
      <InputCheckbox
        label="Enable multiple data types in array."
        onChange={() => {
          console.log("Changed");
        }}
      />
    </div>
  );
};

export default ButtonSettingsWindow;
