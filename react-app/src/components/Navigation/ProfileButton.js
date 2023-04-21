import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import IconLabel from "../IconLabel";
import Button from "../Button";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ showMenu, setShowMenu ] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [ showMenu ]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout())
      .then(() => history.push("/"));
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="btn-mobile">
      <button className="btn signed-in-icons" onClick={openMenu}>
        <i class="fa-regular fa-user"></i>
      </button >
      <div className={ulClassName} ref={ulRef}>
        <IconLabel iconClass={"fa-regular fa-user"} labelText={user.username} />
        <IconLabel iconClass={"fa-regular fa-envelope"} labelText={user.email} />
        <div className="icon-label-component">
          <div className="icon-label-item-image-container">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
          <Button buttonStyle={'btn--dropdown'} onClick={handleLogout}>Log Out</Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
