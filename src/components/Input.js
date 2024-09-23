import React from "react";
import './Input.css'
const Input = ({icon, placeholder, onChangeText, key_name}) => {
	return (
		<div className="input-container">
			<img src={icon} alt="profile" className="input-icon" />
			<input placeholder={placeholder}className="text-input" onChange={(e)=>onChangeText(e.target.value, key_name)} />
		</div>
	);
};

export default Input;
