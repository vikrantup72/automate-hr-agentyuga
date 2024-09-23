import React, { useRef, useState } from "react";
import "./Profile.css";
import profile from "../../assets/images/vikrant1.jpg";
import username from "../../assets/images/username.png";
import phone from "../../assets/images/phone.png";
import location from "../../assets/images/location.png";
import camera from "../../assets/images/camera.png";
import Input from "../../../components/Input";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

export const Profile = () => {
	const fileInputRef = useRef(null);
	const navigate = useNavigate();
	const [selectedImage, setSelectedImage] = useState(profile);
	const handleCameraClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedImage(reader.result);
			};
			reader.readAsDataURL(selectedFile);
		}
	};
	return (
		<div className="profile-page-container">
			<div className="profile-page-section">
				<span>Personal info</span>
			</div>
			<div className="profile-page-sub-section">
				<div className="upper-profile-header">
					<div className="profile-page-picture">
						<img
							src={selectedImage}
							alt="profile"
							className="profile-page-picture-size"
						/>
						<img
							src={camera}
							alt="camera"
							className="camera-inline-with-profile"
							onClick={handleCameraClick}
						/>
						<input
							type="file"
							accept="image/*"
							ref={fileInputRef}
							style={{ display: "none" }}
							onChange={handleFileChange}
						/>
					</div>
					<span className="profile-bio">
						Basic info, like your name and Email ID and company details.
					</span>
				</div>
				<hr className="profile-hr" />
			</div>
			<div className="profile-update-wrapper">
				<Input icon={username} placeholder={"Name"} />
				<Input icon={phone} placeholder={"Mobile Number "} />
				<Input icon={location} placeholder={"Mail Id "} />
			</div>

			<div className="referral-button-wrapper">
				<div className="profile-button-wrapper">
					<Button name={"SAVE"} />
				</div>
			</div>
		</div>
	);
};
