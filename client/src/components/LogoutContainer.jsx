import React from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import styled from "styled-components";
import { useDashboardContext } from "../pages/Dashboard";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = React.useState(false);
  const { user, logoutUser } = useDashboardContext();
  

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        {user.avatar ? (
          <img src={user.avatar} className="img" />
        ) : (
          <FaUserCircle />
        )}

        {user?.name ? user.name : "user"}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  position: relative;
  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2);
    text-align: center;
    visibility: hidden;
    border-radius: var(--border-radius);
    background: var(--primary-500);
    color: #fff;
    letter-spacing: 0.2rem;
    cursor: pointer;
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background: transparent;
    border-color: transparent;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;


export default LogoutContainer;
