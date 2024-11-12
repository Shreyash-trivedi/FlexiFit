import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navStyle = {
    backgroundColor: "var(--surface-0)",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "sticky",
    top: 0,
    zIndex: 10,
    borderBottom: "1px solid var(--surface-200)",
  };

  const containerStyle = {
    width: "100%",
    maxWidth: "1400px",
    padding: "0 24px",
    display: "flex",
    gap: "14px",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "0 6px",
    fontWeight: 600,
    fontSize: "18px",
    textDecoration: "none",
    color: "var(--text-color)",
  };

  const menuButtonStyle = {
    display: "none",
    color: "var(--text-color)",
    "@media screen and (max-width: 768px)": {
      display: "flex",
      alignItems: "center",
    },
  };

  const navItemsStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "32px",
    padding: "0 6px",
    listStyle: "none",
    "@media screen and (max-width: 768px)": {
      display: "none",
    },
  };

  const navLinkStyle = {
    display: "flex",
    alignItems: "center",
    color: "var(--text-color)",
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "var(--primary-color)",
    },
  };

  const activeLinkStyle = {
    ...navLinkStyle,
    color: "var(--primary-color)",
    borderBottom: "1.8px solid var(--primary-color)",
  };

  const userContainerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    gap: "16px",
    alignItems: "center",
    padding: "0 6px",
  };

  const mobileMenuStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "16px",
    width: "90%",
    padding: "12px 40px 24px 40px",
    backgroundColor: "var(--surface-0)",
    position: "absolute",
    top: "80px",
    right: 0,
    transition: "all 0.6s ease-in-out",
    transform: isOpen ? "translateY(0)" : "translateY(-100%)",
    borderRadius: "0 0 20px 20px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
    opacity: isOpen ? "100%" : "0",
    zIndex: isOpen ? "1000" : "-1000",
  };

  return (
    <div style={navStyle}>
      <div style={containerStyle}>
        <Button
          icon="pi pi-bars"
          link
          style={menuButtonStyle}
          onClick={() => setIsOpen(!isOpen)}
        />

        <Link to="/" style={logoStyle}>
          {/* <img src={LogoImg} alt="Logo" style={logoImageStyle} /> */}
          <span>FlexiFit</span>
        </Link>

        {/* <div style={mobileMenuStyle}>
          <NavLink to="/" style={({isActive}) => isActive ? activeLinkStyle : navLinkStyle}>Chat</NavLink>
          <NavLink to="/workouts" style={({isActive}) => isActive ? activeLinkStyle : navLinkStyle}>Workouts</NavLink>
          <NavLink to="/dashboard" style={({isActive}) => isActive ? activeLinkStyle : navLinkStyle}>Dashboard</NavLink>
        </div> */}

        <ul style={navItemsStyle}>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? activeLinkStyle : navLinkStyle
            }
          >
            Chat
          </NavLink>
          <NavLink
            to="/workouts"
            style={({ isActive }) =>
              isActive ? activeLinkStyle : navLinkStyle
            }
          >
            Workouts
          </NavLink>
          <NavLink
            to="/dashboard"
            style={({ isActive }) =>
              isActive ? activeLinkStyle : navLinkStyle
            }
          >
            Dashboard
          </NavLink>
        </ul>

        <div style={userContainerStyle}>
          {currentUser && (
            <Avatar
              image={currentUser?.img}
              label={currentUser?.name[0]}
              shape="circle"
              size="large"
            />
          )}
          {currentUser ? (
            <Button
              label="Logout"
              link
              severity="secondary"
              onClick={() => dispatch(logout())}
            />
          ) : (
            <Button
              label="Log In"
              link
              severity="secondary"
              onClick={() => navigate("/login")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
