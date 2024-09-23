import React, { useEffect, useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TablePagination,
	IconButton,
	Menu,
	MenuItem,
	Popover,
	Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "./Timeline.css";
import apiEndpoints from "../../../API/apiEndpoints";
import apiCall from "../../../API/apiService";
import { Schedule } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

const InterviewTimeline = () => {
	const [filterDateTimeFrom, setFilterDateTimeFrom] = useState("");
	const [filterDateTimeTo, setFilterDateTimeTo] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [cancelReason, setCancelReason] = useState("");
	const [selectedInterview, setSelectedInterview] = useState(null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [openFilterPopover, setOpenFilterPopover] = useState(false);
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const [interviewList, setInterviewList] = useState([]);
	const [openNoDataDialog, setOpenNoDataDialog] = useState(false);
	const [selectedApplicant, setSelectedApplicant] = useState();
	const navigate = useNavigate();
	useEffect(() => {
		fetchData();
	}, []);
	const fetchData = async () => {
		try {
			const data = await apiCall("get", apiEndpoints.JOB_INTERVIEW);
			setInterviewList(data);
			if (data.length == 0) {
				setOpenNoDataDialog(true);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			setOpenNoDataDialog(true);
		}
	};

	const cancelData = async (raw) => {
		try {
			const data = await apiCall("post", apiEndpoints.CANCEL_INTERVIEW, raw);
			alert("Interview cancel successfully!");
			await fetchData();
			setCancelReason("");
			setSelectedApplicant();
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleCancelSubmit = async () => {
		setOpenDialog(false);
		const raw = {
			jobinterview_id: selectedApplicant,
			cancellation_reason: cancelReason,
		};
		await cancelData(raw);
	};

	const handleDialogClose = () => {
		setCancelReason("");
		setSelectedApplicant();
		setOpenDialog(false);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleMenuClick = (event, interview) => {
		setAnchorEl(event.currentTarget);
		setSelectedInterview(interview);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleCancelMeeting = (id) => () => {
		setSelectedApplicant(id);
		setOpenDialog(true);
	};

	const handleFilterApply = () => {
		setOpenFilterPopover(false);
		setIsFilterApplied(true);
	};

	const handleClearFilters = () => {
		setFilterDateTimeFrom("");
		setFilterDateTimeTo("");
		setIsFilterApplied(false);
		setOpenFilterPopover(false);
	};

	const truncateText = (text, length = 18) => {
		return text.length > length ? text.substring(0, length) + "..." : text;
	};

	const filteredInterviews = isFilterApplied
		? interviewList?.filter((interview) => {
				const interviewDateTime = new Date(
					`${interview.date} ${interview.time}`
				);
				const filterDateTimeFromParsed = filterDateTimeFrom
					? new Date(filterDateTimeFrom)
					: null;
				const filterDateTimeToParsed = filterDateTimeTo
					? new Date(filterDateTimeTo)
					: null;

				return (
					(!filterDateTimeFromParsed ||
						interviewDateTime >= filterDateTimeFromParsed) &&
					(!filterDateTimeToParsed ||
						interviewDateTime <= filterDateTimeToParsed)
				);
		  })
		: interviewList;

	const handleNoDataDialogClose = () => {
		setOpenNoDataDialog(false);
	};

	const handleSchedule = (applicant_id, id) => {
		navigate(
			`/candidate-details?applicant_id=${applicant_id}&job_opening_id=${id}`
		);
	};

	const createScheduleHandler = (applicant_id, id) => () => {
		console.log(applicant_id, "applicant_id");
		handleSchedule(applicant_id, id);
	};

	return (
		<div className="timeline">
			<div style={{ width: "auto" }}>
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<Button
						aria-describedby="filter-popover"
						variant="contained"
						color="primary"
						onClick={() => setOpenFilterPopover(true)}
						startIcon={<CalendarTodayIcon />}
					>
						Filter
					</Button>
					{isFilterApplied && (
						<Button
							variant="outlined"
							color="secondary"
							onClick={handleClearFilters}
							style={{ marginLeft: "10px" }}
						>
							Clear Filters
						</Button>
					)}
				</div>

				<Popover
					id="filter-popover"
					open={openFilterPopover}
					anchorEl={anchorEl}
					onClose={() => setOpenFilterPopover(false)}
					anchorOrigin={{
						vertical: "center",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "center",
						horizontal: "center",
					}}
					style={{ width: "100%" }}
				>
					<div style={{ padding: "20px" }}>
						<TextField
							label="DateTime From"
							type="datetime-local"
							InputLabelProps={{ shrink: true }}
							fullWidth
							value={filterDateTimeFrom}
							onChange={(e) => setFilterDateTimeFrom(e.target.value)}
							style={{ marginBottom: "10px" }}
						/>
						<TextField
							label="DateTime To"
							type="datetime-local"
							InputLabelProps={{ shrink: true }}
							fullWidth
							value={filterDateTimeTo}
							onChange={(e) => setFilterDateTimeTo(e.target.value)}
							style={{ marginBottom: "10px" }}
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={handleFilterApply}
							style={{ marginTop: "10px" }}
						>
							Apply Filters
						</Button>
					</div>
				</Popover>

				{filteredInterviews?.length === 0 ? (
					<Dialog
						open={openNoDataDialog}
						onClose={handleNoDataDialogClose}
						PaperProps={{
							style: { width: "500px", maxWidth: "90%", margin: "auto" },
						}}
					>
						<DialogTitle>No Interviews Found</DialogTitle>
						<DialogContent>
							<Typography variant="body2">
								{isFilterApplied
									? "There are no interviews that match your filter criteria."
									: "There are currently no interviews scheduled."}
							</Typography>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleNoDataDialogClose} color="primary">
								Close
							</Button>
							{isFilterApplied && (
								<Button onClick={handleClearFilters} color="primary">
									Clear Filters
								</Button>
							)}
						</DialogActions>
					</Dialog>
				) : (
					<>
						<TableContainer component={Paper} style={{ marginTop: "10px" }}>
							<Table>
								<TableHead
									style={{ backgroundColor: "#2c5da7", color: "white" }}
								>
									<TableRow sx={{ color: "#fff", backgroundColor: "#2c5da7" }}>
										<TableCell sx={{ color: "#fff" }}>Date & Time</TableCell>
										<TableCell sx={{ color: "#fff" }}>Round Name</TableCell>
										<TableCell sx={{ color: "#fff" }}>Status</TableCell>
										<TableCell sx={{ color: "#fff" }}>Candidate</TableCell>
										<TableCell sx={{ color: "#fff" }}>Role</TableCell>
										<TableCell sx={{ color: "#fff" }}>Interviewers</TableCell>
										<TableCell sx={{ color: "#fff" }}>Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filteredInterviews?.map((interview, index) => (
										<TableRow key={index}>
											<TableCell>
												{`${interview.date} ${interview.time}`}
											</TableCell>
											<TableCell>{interview.round_name}</TableCell>
											<TableCell>{interview.status}</TableCell>
											<TableCell>
												{truncateText(interview.candidate_name)}
											</TableCell>
											<TableCell>{truncateText(interview.role_name)}</TableCell>
											<TableCell>
												{interview.interviewer.map((interviewer, idx) => (
													<div key={idx}>{truncateText(interviewer)}</div>
												))}
											</TableCell>
											<TableCell>
												<IconButton
													aria-label="more"
													aria-controls={`long-menu-${index}`}
													aria-haspopup="true"
													onClick={(event) => handleMenuClick(event, interview)}
												>
													<MoreVertIcon />
												</IconButton>
												<Menu
													id={`long-menu-${index}`}
													anchorEl={anchorEl}
													open={
														Boolean(anchorEl) && selectedInterview === interview
													}
													onClose={handleMenuClose}
												>
													<MenuItem
														onClick={handleCancelMeeting(interview?.id)}
													>
														Cancel Interview
													</MenuItem>
													<MenuItem
														onClick={createScheduleHandler(
															interview?.applicant_id,
															interview?.id
														)}
													>
														Schedule Interview
													</MenuItem>
												</Menu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>

						<TablePagination
							component="div"
							count={filteredInterviews?.length}
							page={page}
							onPageChange={handleChangePage}
							rowsPerPage={rowsPerPage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</>
				)}
			</div>

			{/* Cancel Interview Dialog */}
			<Dialog open={openDialog} onClose={handleDialogClose}>
				<DialogTitle>Cancel Interview</DialogTitle>
				<DialogContent>
					<Typography variant="body1">
						Are you sure you want to cancel the interview with{" "}
						{selectedInterview?.candidate_name}?
					</Typography>
					<TextField
						label="Reason for Cancellation"
						fullWidth
						multiline
						rows={4}
						value={cancelReason}
						onChange={(e) => setCancelReason(e.target.value)}
						style={{ marginTop: "10px" }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleCancelSubmit} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default InterviewTimeline;
