import React from "react";

const ICON_DIRECTORY = "/icons/";

function NavLink({ title, path }) {
  const icon_link = `${ICON_DIRECTORY}${title}.png`;

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

function Navbar() {
  return (
    <nav
      className="NavBar"
      style={{
        width: "10%",
        height: "100vh",
        minWidth: "80px",
        maxWidth: "90px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderRight: "var(--border-style)",
      }}
    >
      <NavLink title="b-icon" path="#" />
      <NavLink title="settings-icon" path="#" />
    </nav>
  );
}

export default Navbar;
