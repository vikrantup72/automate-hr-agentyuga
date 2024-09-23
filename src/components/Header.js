import React, { useState } from "react";
import "./headerStyle.css";
import profile from "../app/assets/images/vikrant1.jpg";
import setting from "../app/assets/images/setting.png";
import search from "../app/assets/images/search.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNavbar } from "../redux/Actions/UserAction";
import { useMediaQuery } from "react-responsive";

const Header = () => {
	const navbar = useSelector((state) => state.user.navbar);
	const dispatch = useDispatch();
	const menuBurger = require("../app/assets/images/burger.png");
	const navigate = useNavigate();
	return (
		<div className="header-container">
			<div className="header-wrapper">
				<div className="menu-wrapper">
					<img
						className={`header-menu-button`}
						onClick={() => dispatch(setNavbar(!navbar))}
						src={menuBurger}
						alt="Image description"
					/>
				</div>

				<div className="profile-container">
					<div
						onClick={() => navigate("/profile")}
						className="circular-container"
					>
						<img
							src={profile}
							alt="profile"
							className="header-profile-picture"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
