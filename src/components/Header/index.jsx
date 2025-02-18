import React, { useContext } from 'react';
import './index.css'
import { AiOutlineMenu } from "react-icons/ai";
import { IoNotificationsOutline, IoListSharp, IoMailOpenOutline } from "react-icons/io5";
import { CiLight, CiDark } from "react-icons/ci";
import { NavMenuContext } from '../../Context/navMenuContext';
import { NavLink } from 'react-router-dom';
const Header = () => {
    const data = useContext(NavMenuContext)
    const openNavMenu = () => {
        data.setOpenNav(prev => !prev)
    }
    const themeSetter = () => {
        data.setTheme(prev => !prev)
    }

    return (
      <header
        style={{
          background: data.theme && "#212631",
          color: data.theme && "#fff",
        }}
      >
        <div className="header-sections-container">
          <section className="header-section-one-main">
            <AiOutlineMenu
              size={22}
              style={{ marginRight: "20px", marginBottom: "0px" }}
              onClick={openNavMenu}
            />
            <div className="header-section-one-sub">
              <NavLink
                to={"/"}
                style={{ color: "#6c6c71", textDecoration: "none" }}
              >
                <p
                  style={{
                    margin: "0px 0px 0px 12px",
                    fontSize: "17px",
                    fontWeight: "500",
                  }}
                >
                  Dashboard
                </p>
              </NavLink>

              <p
                style={{
                  margin: "0px 0px 0px 12px",
                  fontSize: "17px",
                  fontWeight: "500",
                }}
              >
                Users
              </p>
              <NavLink
                to="/settings"
                style={{ color: "#6c6c71", textDecoration: "none" }}
              >
                <p
                  style={{
                    margin: "0px 0px 0px 12px",
                    fontSize: "17px",
                    color: "#6c6c71",
                    textDecoration: "none",
                  }}
                >
                  Settings
                </p>
              </NavLink>
            </div>
          </section>
          <section className="header-section-two-main">
            <div className="d-flex justify-content-center align-items-center">
              <IoNotificationsOutline
                size={22}
                style={{ margin: "0px 6px 0px 6px" }}
              />
              <IoListSharp size={22} style={{ margin: "0px 6px 0px 6px" }} />
              <IoMailOpenOutline
                size={22}
                style={{ margin: "0px 6px 0px 6px" }}
              />
            </div>
            <div className="header-theme-change-card" onClick={themeSetter}>
              {data.theme ? <CiDark size={22} /> : <CiLight size={22} />}
            </div>
            <div className="header-profile-image-card">
              <img
                src="https://randomuser.me/img/creator_arron.png"
                className="header-profile-image"
              />
            </div>
          </section>
        </div>
      </header>
    );
}

export default Header