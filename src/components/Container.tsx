import React, { UIEventHandler } from "react";

type ContainerProps = {
  containerTitle: string,
  customStyle?: React.CSSProperties,
  children: React.ReactNode
}

const Container: React.FunctionComponent<ContainerProps> = ({
  containerTitle,
  customStyle = null,
  children
}) => {
    const defaultStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    display: "flex",
  }

    const containerStyle: React.CSSProperties = {
    ...defaultStyle,
    ...customStyle
  }

    return (
    <div
      className={containerTitle}
      style={containerStyle}
    >
      {children}
    </div>
  );
}

export default Container;
