import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavbar } from "../redux/Actions/UserAction";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import hrlogo from "../app/assets/images/hrlogo.png";
import { useMediaQuery } from "react-responsive";
import { Button } from "@mui/material";
function Navbar() {
	const navbar = useSelector((state) => state.user.navbar);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isMobile = useMediaQuery({
		query: "(max-width: 820px)",
	});
	const isiPadPro = useMediaQuery({
		query: "(max-width: 1024px)",
	});
	useLayoutEffect(() => {
		if (isMobile || isiPadPro) {
			dispatch(setNavbar(false));
		}
	}, [isMobile, isiPadPro]);
	const [selectedItem, setSelectedItem] = useState("/");
	const handleClick = (path) => {
		setSelectedItem(path);
		if (isMobile || isiPadPro) {
			dispatch(setNavbar(false));
		}
		navigate(path);
	};

	const onLogoutHandler = () => {
		const isConfirmed = window.confirm("Are you sure you want to logout?");
		if (isConfirmed) {
			localStorage.clear();
			navigate("/");
			window.location.reload();
		} else {
			console.log("Logout canceled");
		}
	};

	return (
		<>
			<div
				onClick={() => dispatch(setNavbar(!navbar))}
				className={`sidebar-overlay  ${navbar ? "open" : "closed"}`}
			/>
			<aside className={`sidebar  ${navbar ? "open" : "closed"}`}>
				<div
					style={{
						display: "flex",
					}}
				>
					<div className={`menubarOpen`}>
						<img style={{ width: 220 }} src={hrlogo} alt="Image description" />
						<div style={{ marginTop: 20 }}>
							<div
								onClick={() => handleClick("/")}
								className={`drawer-lable ${
									selectedItem === "/" ? "selected" : ""
								}`}
							>
								Department
							</div>
							<div
								onClick={() => handleClick("/sub-department")}
								className={`drawer-lable ${
									selectedItem === "/sub-department" ? "selected" : ""
								}`}
							>
								SubDepartment
							</div>
							<div
								onClick={() => handleClick("/role")}
								className={`drawer-lable ${
									selectedItem === "/role" ? "selected" : ""
								}`}
							>
								Role
							</div>
							<div
								onClick={() => handleClick("/open-position")}
								className={`drawer-lable ${
									selectedItem === "/open-position" ? "selected" : ""
								}`}
							>
								Job Opening
							</div>
							<div
								onClick={() => handleClick("/interview-list")}
								className={`drawer-lable ${
									selectedItem === "/interview-list" ? "selected" : ""
								}`}
							>
								Interview List
							</div>
						</div>

						<div style={{ position: "absolute", bottom: 20, width: "100%" }}>
							<div onClick={onLogoutHandler} className={`drawer-lable`}>
								<i
									class="fa fa-sign-out"
									style={{ fontSize: "20px", marginRight: 10 }}
								/>
								Logout
							</div>
						</div>
					</div>
				</div>
			</aside>
		</>
	);
}

export default Navbar;
