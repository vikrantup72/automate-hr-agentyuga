/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "./button.css";
const Button = ({ name, path, onClick }) => {
	return (
		<a className="button-container btn-bg" onClick={onClick}>
			<Link to={path} className="button-text">
				{name}
			</Link>
		</a>
	);
};

export default Button;
