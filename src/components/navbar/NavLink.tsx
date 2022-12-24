import React from "react";

const ICON_DIRECTORY: string = "/icons/";
type NavLinkProps = {
  title: string,
  path: string,
}

const NavLink: React.FunctionComponent<NavLinkProps> = ({
  title,
  path,

}) => {
  const icon_link:string = `${ICON_DIRECTORY}${title}.png`;
  return (
    <span
      className="NavLinkContainer"
      style={{
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "var(--one)",
        marginBottom: "var(--one)",
      }}
    >
      <a href={path}>
        <img
          className="NavIcon"
          style={{
            height: "40px",
          }}
          src={icon_link}
          alt={`${title}`}
        />
      </a>
    </span>
  );
}

export default NavLink