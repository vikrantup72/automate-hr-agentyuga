import * as React from "react";
import {
	Typography,
	Card,
	CardContent,
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	DialogContentText,
	TablePagination,
	IconButton,
	Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close"; // Optional for "Close" action button

const Applicant = ({ candidates }) => {
	const [openCloseConfirmation, setOpenCloseConfirmation] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [selectedCandidate, setSelectedCandidate] = useState(null); // Track the candidate to be closed
	const navigate = useNavigate();

	const handleCloseClick = (candidate) => {
		setSelectedCandidate(candidate);
		setOpenCloseConfirmation(true);
	};

	const handleCloseConfirmation = (confirmed) => {
		setOpenCloseConfirmation(false);
		if (confirmed) {
			console.log(
				`Application for ${selectedCandidate.candidate_name} closed.`
			);
		}
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const navigateToCandidate = (id) => {
		navigate(`/candidate-details?applicant_id=${id}`);
	};

	return (
		<Box>
			<Card
				sx={{
					backgroundColor: "#e9f1ff",
					borderRadius: 2,
					boxShadow: 4,
					height: "76vh",
					overflowY: "scroll",
				}}
			>
				<CardContent>
					<TableContainer sx={{ borderRadius: 1.6 }}>
						<Table>
							<TableHead>
								<TableRow sx={{ backgroundColor: "#2c5da7" }}>
									{[
										"Candidate Name",
										"Email",
										"Phone",
										"Current Location",
										"Current CTC",
										"Expected CTC",
										"Notice Period",
										"Notable Companies",
										"Experience",
										"Current Company",
										"Status",
										"R1",
										"R2",
										"R3",
										"Actions",
									].map((header) => (
										<TableCell
											key={header}
											sx={{
												color: "#fff",
												whiteSpace: "nowrap",
												padding: "8px 16px",
											}}
										>
											<Typography variant="subtitle2">{header}</Typography>
										</TableCell>
									))}
								</TableRow>
							</TableHead>

							<TableBody>
								{candidates
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((candidate, index) => (
										<TableRow
											key={candidate.id}
											sx={{
												backgroundColor:
													index % 2 === 0 ? "#f9f9f9" : "#e0e0e080",
												"&:hover": {
													backgroundColor: "#d1e0ff10", // Row hover effect
													cursor: "pointer",
												},
											}}
											onClick={() => navigateToCandidate(candidate.id)}
										>
											{[
												candidate.candidate_name,
												candidate.candidate_email,
												candidate.candidate_phone,
												candidate.current_location,
												`₹${candidate.current_ctc.toLocaleString()}`,
												`₹${candidate.expected_ctc.toLocaleString()}`,
												candidate.notice_period,
												candidate.notable_company.join(", "),
												candidate.experience,
												candidate.current_company,
												"Under Review", // Status placeholder
												"Scheduled", // R1 placeholder
												"N/A", // R2 placeholder
												"N/A", // R3 placeholder
											].map((cellData, cellIndex) => (
												<TableCell
													key={cellIndex}
													sx={{
														padding: "8px 16px",
														"&:last-child": { pr: 2 }, // Padding adjustment
													}}
												>
													{cellData}
												</TableCell>
											))}
											<TableCell>
												<Tooltip title="Schedule Interview" arrow>
													<Button
														variant="contained"
														color="primary"
														size="small"
														sx={{ mb: 0.6 }}
														onClick={(e) => e.stopPropagation()} // Prevent row click
													>
														Schedule
													</Button>
												</Tooltip>
												<Tooltip title="Close Application" arrow>
													<IconButton
														color="error"
														size="small"
														onClick={(e) => {
															e.stopPropagation(); // Prevent row click
															handleCloseClick(candidate);
														}}
													>
														<CloseIcon />
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Card>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={candidates.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleRowsPerPageChange}
			/>
			{/* Close Confirmation Dialog */}
			<Dialog
				open={openCloseConfirmation}
				onClose={() => handleCloseConfirmation(false)}
			>
				<DialogTitle>Close Confirmation</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to close the application for{" "}
						<b>{selectedCandidate?.candidate_name}</b>? This action cannot be
						undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleCloseConfirmation(false)}>Cancel</Button>
					<Button onClick={() => handleCloseConfirmation(true)} color="error">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default Applicant;
