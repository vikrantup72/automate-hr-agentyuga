import React, { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { setTokenFunction } from "../../../redux/Actions/UserAction";
import hrlogo from "../../assets/images/hrlogo.png";
import { useGoogleLogin } from "@react-oauth/google";
const Login = () => {
	const dispatch = useDispatch();
	const handleLoginSuccess = async (tokenResponse) => {
		console.log("Login Success:", tokenResponse);
		const raw = JSON.stringify({
			accessToken: tokenResponse?.access_token,
		});
		const res = await fetch("http://localhost:8000/api/v1/google/verify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: raw,
		});
		if (res.ok) {
			const data = await res.json();
			const accessToken = data.accessToken;
			localStorage.setItem("key", accessToken);
			dispatch(setTokenFunction(true));
		} else {
			console.error("Failed to verify token:", res.statusText);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: handleLoginSuccess,
		onError: (error) => console.log("Login Failed:", error),
	});

	return (
		<div className="wrapper">
			<img
				style={{ width: 220, position: "absolute", top: 0, left: 0 }}
				src={hrlogo}
				alt="Image description"
			/>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					margin: "auto",
					alignItems: "center",
					textAlign: "center",
					height: "100vh",
				}}
			>
				<div className="card">
					<img
						onClick={() => {
							localStorage.setItem("key", "accessToken");
							dispatch(setTokenFunction(true));
						}}
						alt="img"
						src="https://miro.medium.com/v2/resize:fit:1400/1*u0bwdudgoyKjSLntsRcqiw.png"
						className="logo"
					/>
				</div>
			</div>
		</div>
	);
};

export default Login;
