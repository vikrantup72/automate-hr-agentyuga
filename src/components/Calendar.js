// RNCalendar.js
import React, { useMemo, useState } from "react";
import "./Calendar.css";

const Calendar = ({ onSelectDate }) => {
	const [selectedDate, setSelectedDate] = useState(null);
	const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const currentDate = new Date();
	const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
	const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
	const [currentDay, setCurrentDay] = useState(currentDate.getUTCDate());
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

	const getDaysInMonth = () => {
		const days = [];

		const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

		for (let i = 0; i < startDayIndex; i++) {
			days.push({
				day: null,
				disabled: true,
			});
		}

		for (let i = 1; i <= daysInMonth; i++) {
			days.push({
				day: i,
				disabled: false,
			});
		}

		const totalDays = Math.ceil(days.length / 7) * 7;

		const remainingDays = totalDays - days.length;

		for (let i = 0; i < remainingDays; i++) {
			days.push({
				day: null,
				disabled: true,
			});
		}

		return days;
	};

	const onBackward = () => {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear(currentYear - 1);
			setSelectedDate(null);
			setCurrentDay(null);
		} else {
			setCurrentMonth(currentMonth - 1);
			setCurrentDay(null);
			setSelectedDate(null);
		}
	};

	const onForward = () => {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear(currentYear + 1);
			setSelectedDate(null);
			setCurrentDay(null);
		} else {
			setCurrentMonth(currentMonth + 1);
			setSelectedDate(null);
			setCurrentDay(null);
		}
	};

	const renderDays = () => {
		const daysInMonth = getDaysInMonth();
		const weeks = [];

		for (let i = 0; i < daysInMonth.length; i += 7) {
			const week = daysInMonth.slice(i, i + 7);

			weeks.push(
				<div key={i} className="calendar-week">
					{week.map((dayObj, index) => (
						<button
							key={index}
							onClick={() => {
								if (!dayObj.disabled) {
									setSelectedDate(dayObj.day);
									setCurrentDay(dayObj.day);
									onSelectDate(`${(dayObj.day).toString().padStart(2, "0")}-${currentMonth+1}-${currentYear}`);
								} else {
									setCurrentDay(dayObj.day);
								}
							}}
							className={`calendar-day ${
								currentDay === dayObj.day ? "selected" : "disabled"
							}`}
						>
							<span>{dayObj.day}</span>
						</button>
					))}
				</div>
			);
		}
		return weeks;
	};

	return (
		<div className="calendar-container">
			<div className={"calendar-header"}>
				<button onClick={() => onBackward()}>◀︎</button>

				<span>
					{months[currentMonth]} {currentYear}
				</span>

				<button onClick={() => onForward()}>▶︎</button>
			</div>
			<div className="calendar-weekLabels">
				{weekDays.map((day) => (
					<span key={day} className="calendar-dayLabel">
						{day}
					</span>
				))}
			</div>
			{renderDays()}
		</div>
	);
};

export default Calendar;
