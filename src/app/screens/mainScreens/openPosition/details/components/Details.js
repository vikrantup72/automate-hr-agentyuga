import * as React from "react";
import {
	Typography,
	Card,
	CardContent,
	Box,
	Grid,
	Divider,
	Button,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PeopleIcon from "@mui/icons-material/People";
import styles from "../../openPosition.module.css"; // Define styles here

const Details = ({ handleAddApplicant }) => {
	const row = {
		department: "Engineering",
		subDepartment: "Software Development",
		roleName: "Frontend Developer",
		salaryMin: "60,000",
		salaryMax: "90,000",
		level: "Mid-level",
		ftPt: "Full-Time",
		workType: "Remote",
		count: "3",
		city: "San Francisco",
	};

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
					<Box
						mb={3}
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Box>
							<Typography
								variant="h5"
								sx={{ color: "#2c5da7", fontWeight: "bold", mb: 2 }}
							>
								{row.roleName}
							</Typography>
							<Typography variant="subtitle1" sx={{ color: "#6f7e8c", mb: 1 }}>
								Department: {row.department}
							</Typography>
							<Typography variant="subtitle1" sx={{ color: "#6f7e8c" }}>
								Sub-Department: {row.subDepartment}
							</Typography>
						</Box>
						{/* Add Applicant Button */}
						<Button
							variant="contained"
							color="primary"
							onClick={handleAddApplicant}
							sx={{ backgroundColor: "#2c5da7" }}
						>
							Add Applicant
						</Button>
					</Box>

					<Divider />

					<Box mt={2} mb={3}>
						<Grid container spacing={3}>
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
									<Typography variant="body1">{row.level}</Typography>
								</Box>
							</Grid>

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
										{row.salaryMin} - {row.salaryMax}
									</Typography>
								</Box>
							</Grid>

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
									<Typography variant="body1">{row.ftPt}</Typography>
								</Box>
							</Grid>

							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center" mb={2}>
									<WorkIcon sx={{ mr: 1, color: "#2c5da7" }} />
									<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
										Work Type
									</Typography>
								</Box>
								<Box
									sx={{
										p: 1,
										backgroundColor: "#f9fafb",
										borderRadius: 1,
									}}
								>
									<Typography variant="body1">{row.workType}</Typography>
								</Box>
							</Grid>

							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center" mb={2}>
									<PeopleIcon sx={{ mr: 1, color: "#2c5da7" }} />
									<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
										Number of Positions
									</Typography>
								</Box>
								<Box
									sx={{
										p: 1,
										backgroundColor: "#f9fafb",
										borderRadius: 1,
									}}
								>
									<Typography variant="body1">{row.count}</Typography>
								</Box>
							</Grid>

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
									<Typography variant="body1">{row.city}</Typography>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</CardContent>
			</Card>
		</div>
	);
};

export default Details;
