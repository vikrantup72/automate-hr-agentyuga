import React, { useEffect, useState } from "react";
import {
	Typography,
	Card,
	CardContent,
	Box,
	Grid,
	Divider,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PeopleIcon from "@mui/icons-material/People";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom"; // To get query params
import styles from "./roundOpening.module.css"; // Define styles here
import apiCall from "../../../API/apiService";
import apiEndpoints from "../../../API/apiEndpoints";
import Loader from "../../../../components/Loader";

const RoundOpening = () => {
	const [data, setData] = useState(null); // State to hold fetched data

	// Function to fetch data based on id
	const fetchData = async (id) => {
		try {
			const response = await apiCall("get", `${apiEndpoints.ROLE}/${id}`); // Assuming API call
			console.log(response);
			setData(response); // Save the fetched data to state
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		const url = window.location.href;
		const pathSegments = url.split("/");
		const id = pathSegments[4];
		console.log("id:", id);
		if (id) {
			fetchData(id); // Call the API
		}
	}, []);

	// Now you can use `data` to display the fetched role information
	return (
		<div className={styles.container}>
			<Card
				className={styles.card}
				sx={{
					mb: 3,
					backgroundColor: "#ffffff",
					borderRadius: 3,
					boxShadow: 3,
					padding: 3,
					margin: 2,
					height: "auto",
					overflow: "auto",
				}}
			>
				<CardContent>
					<Box mb={3}>
						<Typography
							variant="h5"
							sx={{ color: "#2c5da7", fontWeight: "bold", mb: 2 }}
						>
							{data?.role_name}
						</Typography>
						<Typography variant="subtitle1" sx={{ color: "#6f7e8c", mb: 1 }}>
							Department: {data?.department_name}
						</Typography>
						<Typography variant="subtitle1" sx={{ color: "#6f7e8c" }}>
							Sub-Department: {data?.subdepartment_name}
						</Typography>
					</Box>

					<Divider />

					<Box mt={2} mb={3}>
						<Grid container spacing={3}>
							{/* Level */}
							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center" mb={2}>
									<WorkIcon sx={{ mr: 1, color: "#2c5da7" }} />
									<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
										Level
									</Typography>
								</Box>
								<Box
									sx={{
										p: 1,
										backgroundColor: "#f9fafb",
										borderRadius: 1,
									}}
								>
									<Typography variant="body1">{data?.level}</Typography>
								</Box>
							</Grid>

							{/* Salary */}
							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center" mb={2}>
									<MonetizationOnIcon sx={{ mr: 1, color: "#2c5da7" }} />
									<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
										Salary
									</Typography>
								</Box>
								<Box
									sx={{
										p: 1,
										backgroundColor: "#f9fafb",
										borderRadius: 1,
									}}
								>
									<Typography variant="body1">
										{data?.salary_min} - {data?.salary_max}
									</Typography>
								</Box>
							</Grid>

							{/* Employment Type */}
							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center" mb={2}>
									<PeopleIcon sx={{ mr: 1, color: "#2c5da7" }} />
									<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
										Employment Type
									</Typography>
								</Box>
								<Box
									sx={{
										p: 1,
										backgroundColor: "#f9fafb",
										borderRadius: 1,
									}}
								>
									<Typography variant="body1">
										{data?.employment_type}
									</Typography>
								</Box>
							</Grid>

							{/* Work Arrangement */}
							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center" mb={2}>
									<WorkIcon sx={{ mr: 1, color: "#2c5da7" }} />
									<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
										Work Arrangement
									</Typography>
								</Box>
								<Box
									sx={{
										p: 1,
										backgroundColor: "#f9fafb",
										borderRadius: 1,
									}}
								>
									<Typography variant="body1">
										{data?.work_arrangement}
									</Typography>
								</Box>
							</Grid>

							{/* Total Rounds */}
							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center" mb={2}>
									<PeopleIcon sx={{ mr: 1, color: "#2c5da7" }} />
									<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
										Number of Rounds
									</Typography>
								</Box>
								<Box
									sx={{
										p: 1,
										backgroundColor: "#f9fafb",
										borderRadius: 1,
									}}
								>
									<Typography variant="body1">{data?.total_rounds}</Typography>
								</Box>
							</Grid>

							{/* City */}
							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center" mb={2}>
									<LocationCityIcon sx={{ mr: 1, color: "#2c5da7" }} />
									<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
										City
									</Typography>
								</Box>
								<Box
									sx={{
										p: 1,
										backgroundColor: "#f9fafb",
										borderRadius: 1,
									}}
								>
									<Typography variant="body1">{data?.city}</Typography>
								</Box>
							</Grid>
						</Grid>
					</Box>

					{/* Round details */}
					{data?.rounds?.length > 0 && (
						<Box mt={3}>
							<Typography
								variant="h6"
								sx={{ mb: 2, color: "#2c5da7", fontWeight: "bold" }}
							>
								Round Details:
								{` (${data.rounds.length}/${data.total_rounds})`}
							</Typography>
							{data.rounds.map((round, roundIndex) => (
								<React.Fragment key={roundIndex}>
									<Accordion
										sx={{
											mb: 2,
											backgroundColor: "#f7f9fc",
											borderRadius: 1,
											boxShadow: 1,
										}}
									>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											sx={{ borderBottom: "1px solid #ddd" }}
										>
											<Typography
												variant="subtitle1"
												sx={{ fontWeight: "bold" }}
											>
												{round.round_name} ({round.type})
											</Typography>
										</AccordionSummary>
										<AccordionDetails>
											{Object.values(round.question_bank).map(
												(question, qIndex) => (
													<Box key={qIndex} sx={{ pb: 1 }}>
														<Typography
															variant="body1"
															sx={{ fontWeight: "bold" }}
														>
															Q: {question.question}
														</Typography>
														<Typography
															variant="body2"
															sx={{ ml: 2, color: "#555" }}
														>
															A: {question.answer}
														</Typography>
													</Box>
												)
											)}
										</AccordionDetails>
									</Accordion>
								</React.Fragment>
							))}
						</Box>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default RoundOpening;
