import React, { useEffect, useState } from "react";
import "./AnalogClock.css"; // You can create a separate CSS file for styling

const AnalogClock = ({ onSetTimeCompleted }) => {
	const [isSelectedHour, setSelectedHour] = useState(new Date().getHours());
	const [isSelectedMin, setSelectedMin] = useState(new Date().getMinutes());

	const handleSetTime = () => {
		onSetTimeCompleted(`${isSelectedHour}:${isSelectedMin}:00`);
	};

	useEffect(() => {
		const displayTime = () => {
			const date = new Date();

			// Getting hour, mins, secs from date
			const hh = date.getHours();
			const mm = date.getMinutes();
			const ss = date.getSeconds();

			const hRotation = 30 * hh + mm / 2;
			const mRotation = 6 * mm;
			const sRotation = 6 * ss;
			document.getElementById("selectedH").innerHTML =
				(isSelectedHour ? isSelectedHour : hh.toString().padStart(2, "0")) +
				":";

			document.getElementById("selectedM").innerHTML =
				(isSelectedHour ? isSelectedHour : hh) > 12
					? `${
							isSelectedMin ? isSelectedMin : mm.toString().padStart(2, "0")
					  } PM`
					: `${
							isSelectedMin ? isSelectedMin : mm.toString().padStart(2, "0")
					  } AM`;

			document.getElementById(
				"hour"
			).style.transform = `rotate(${hRotation}deg)`;
			document.getElementById(
				"min"
			).style.transform = `rotate(${mRotation}deg)`;
			document.getElementById(
				"sec"
			).style.transform = `rotate(${sRotation}deg)`;
		};

		const intervalId = setInterval(displayTime, 1000);

		// Cleanup the interval on component unmount
		return () => clearInterval(intervalId);
	}, [isSelectedHour, isSelectedMin]);

	return (
		<div className="clock-wrapper">
			<div className="clock-container">
				<div className="clock">
					<div
						style={{ "--clr": "#fff", "--h": "44px" }}
						id="hour"
						className="hand"
					>
						<i></i>
					</div>
					<div
						style={{ "--clr": "#fff", "--h": "54px" }}
						id="min"
						className="hand"
					>
						<i></i>
					</div>
					<div
						style={{ "--clr": "#fff", "--h": "64px" }}
						id="sec"
						className="hand"
					>
						<i></i>
					</div>

					{[...Array(12)].map((_, index) => (
						<span key={index} style={{ "--i": index + 1 }}>
							<b>{index + 1}</b>
						</span>
					))}
				</div>
			</div>
			<div style={{ marginLeft: 6, textAlign: "center" }}>
				<b style={{ color: "#fff" }}>Hours</b>

				<div className="time-list-container">
					{[...Array(24)].map((_, index) => (
						<span
							onClick={() => setSelectedHour(index.toString().padStart(2, "0"))}
							key={index}
							className="Min-view"
						>
							<b>{index.toString().padStart(2, "0")}</b>
						</span>
					))}
				</div>
			</div>

			<div style={{ marginLeft: 6, textAlign: "center" }}>
				<b style={{ color: "#fff"}}>Min</b>
				<div className="time-list-container">
					{[...Array(60)].map((_, index) => (
						<span
							onClick={() => setSelectedMin(index.toString().padStart(2, "0"))}
							className="Min-view"
							key={index}
						>
							<b>{index.toString().padStart(2, "0")}</b>
						</span>
					))}
				</div>
			</div>

			<div style={{ margin: "auto" }}>
				<div className="view-time">
					<b id="selectedH"></b>
					<b id="selectedM"></b>
				</div>
				<div onClick={() => handleSetTime()} className="set-time">
					<b>Set Time</b>
				</div>
			</div>
		</div>
	);
};

export default AnalogClock;
