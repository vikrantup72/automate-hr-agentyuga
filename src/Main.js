import React, { useEffect, useState } from "react";
import Login from "./app/screens/authScreens/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import "./App.css";
import Header from "./components/Header";
import { Profile } from "./app/screens/mainScreens/Profile";
import Department from "./app/screens/mainScreens/department";
import ModalManager from "./components/modalManager";
import SubDepartment from "./app/screens/mainScreens/subDepartment";
import RoleManagement from "./app/screens/mainScreens/role";
import OpenPositionManagement from "./app/screens/mainScreens/openPosition";
import RoundManagement from "./app/screens/mainScreens/roundOpening";
import InterviewList from "./app/screens/mainScreens/interviewList";
import JobOpeningDetails from "./app/screens/mainScreens/openPosition/details/index";
import Loader from "./components/Loader";
import CandidateDetailsTable from "./app/screens/mainScreens/openPosition/details/components/CandidateDetails";

const Main = () => {
	const [token, setToken] = useState(null);
	const tokenfunc = useSelector((state) => state.user.tokenfunc);
	const navbar = useSelector((state) => state.user.navbar);
	const isLoading = useSelector((state) => state.user.isLoading);

	const { modalVisible, modalData } = useSelector((state) => state.user);
	console.log(isLoading, "isLoading");

	useEffect(() => {
		getToken();
	}, []);

	const getToken = () => {
		let res = localStorage.getItem("key");
		setToken(res);
	};

	return (
		<BrowserRouter>
			{tokenfunc || token ? (
				<div>
					{isLoading && <Loader />}
					<Header />
					<Navbar />

					<div className={`main ${navbar ? "open" : "closed"}`}>
						<Routes>
							<Route path="/" element={<Department />} />
							<Route path="/sub-department" element={<SubDepartment />} />
							<Route path="/role" element={<RoleManagement />} />
							<Route
								path="/open-position"
								element={<OpenPositionManagement />}
							/>
							<Route
								path="/job-opening-details/:id?"
								element={<JobOpeningDetails />}
							/>
							<Route
								path="/round-management/:id?"
								element={<RoundManagement />}
							/>
							<Route
								path="/candidate-details"
								element={<CandidateDetailsTable />}
							/>
							<Route path="/interview-list" element={<InterviewList />} />

							<Route path="/profile" element={<Profile />} />
							<Route path="*" element={<Navigate to="/" />} />
						</Routes>
					</div>
				</div>
			) : (
				<>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</>
			)}
		</BrowserRouter>
	);
};

export default Main;
