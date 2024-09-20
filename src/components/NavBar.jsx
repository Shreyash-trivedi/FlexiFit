import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const op = React.useRef(null);
  const navigate = useNavigate();

  const toggleOverlay = (event) => {
    op.current.toggle(event);
    setOverlayVisible(!overlayVisible);
  };

  const handleSignInButton = () => {
    navigate("/login");
  };

  const handleSignUpButton = () => {
    navigate("/sign-up");
  };

  const end = (
    <div className="flex items-center">
      <Button
        severity="danger"
        className="p-button-text"
        onClick={toggleOverlay}
        icon="pi pi-user"
      />
      <OverlayPanel ref={op} className="w-64">
        <div className="flex flex-col gap-2">
          <Button
            label="Sign In"
            className="p-button-primary"
            icon="pi pi-sign-in"
            onClick={handleSignInButton}
          />
          <Button
            label="Sign Up"
            className="p-button-secondary"
            icon="pi pi-user-plus"
            onClick={handleSignUpButton}
          />
        </div>
      </OverlayPanel>
    </div>
  );

  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
    },
    {
      label: "About",
      icon: "pi pi-fw pi-info-circle",
    },
    {
      label: "Contact",
      icon: "pi pi-fw pi-envelope",
    },
  ];

  return (
    <div
      style={{
        top: "0px",
        width: "100vw",
        height: "50px",
        background: "#0b3362", //"#027184",
        marginBottom: "10px",
        position: "absolute",
        textAlign: "center",
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      <Menubar model={items} end={end} className="border-none shadow-md" />
    </div>
  );
};

export default NavBar;
