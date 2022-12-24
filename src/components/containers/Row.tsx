import React from "react";
import Container from "./Container";
import { CSSProperties } from "react";

type RowProps = {
  title: string;
  customStyle?: CSSProperties;
  children: React.ReactNode;
};

const Row: React.FunctionComponent<RowProps> = ({
  title,
  customStyle,
  children,
}) => {
  return (
    <Container
      containerTitle={title}
      customStyle={customStyle}
    >
      {children}
    </Container>
  );
};

export default Row