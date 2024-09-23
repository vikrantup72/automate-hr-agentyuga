import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	Typography,
	Box,
	Button,
	TextField,
	Chip,
	IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import AddIcon from "@mui/icons-material/Add";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useDispatch } from "react-redux";
import { setOpenModal } from "../../../../../../redux/Actions/UserAction";
import styles from "../../openPosition.module.css";
import ModalManager from "../../../../../../components/modalManager";
import apiCall from "../../../../../API/apiService";
import apiEndpoints from "../../../../../API/apiEndpoints";
import { useLocation } from "react-router-dom";

const CandidateDetailsTable = () => {
	const [candidate, setCandidate] = useState(null);
	const [jobOpening, setJobOpening] = useState(null);
	const [newItem, setNewItem] = useState({
		applicant_id: "",
		round_no: null,
		date: "",
		time: "",
		interviewer: [],
	});
	const [newInterviewer, setNewInterviewer] = useState("");

	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const applicantId = searchParams.get("applicant_id");
		const jobOpeningId = searchParams.get("job_opening_id");

		if (applicantId) fetchData(applicantId);
		if (jobOpeningId) fetchJobOpeningData(jobOpeningId);
	}, []);

	const fetchJobOpeningData = async (jobOpeningId) => {
		try {
			const data = await apiCall(
				"get",
				`${apiEndpoints.JOB_INTERVIEW}/${jobOpeningId}`
			);
			setJobOpening(data);
			resetNewItem(data);
		} catch (error) {
			console.error("Error fetching job opening data:", error);
		}
	};

	const fetchData = async (id) => {
		try {
			const data = await apiCall(
				"get",
				`${apiEndpoints.CANDIDATE_DETAILS}/${id}`
			);
			setCandidate(data);
			resetNewItem(data);
		} catch (error) {
			console.error("Error fetching candidate data:", error);
		}
	};

	const resetNewItem = (jobOpeningData) => {
		setNewItem({
			applicant_id: (jobOpeningData?.applicant_id ?? jobOpeningData?.id) || "",
			round_no: jobOpeningData?.round_no + 1 || null,
			date: "",
			time: "",
			interviewer: [],
		});
	};

	const handleScheduleInterview = () => {
		dispatch(setOpenModal({ modalVisible: true }));
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewItem((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddInterviewer = () => {
		if (newInterviewer.trim() !== "") {
			setNewItem((prev) => ({
				...prev,
				interviewer: [...prev.interviewer, newInterviewer.trim()],
			}));
			setNewInterviewer("");
		}
	};

	const handleRemoveInterviewer = (index) => {
		setNewItem((prev) => ({
			...prev,
			interviewer: prev.interviewer.filter((_, i) => i !== index),
		}));
	};

	const handleSave = async () => {
		try {
			// Implement your API call to save the interview schedule
			await apiCall("post", apiEndpoints.JOB_INTERVIEW, newItem);
			alert("Interview scheduled successfully");
			// Optionally, you can refresh the job opening data here
			if (jobOpening?.id) {
				await fetchJobOpeningData(jobOpening.id);
			}
			dispatch(setOpenModal({ modalVisible: false }));
		} catch (error) {
			console.error("Error scheduling interview:", error);
		}
	};

	const handleClear = () => {
		resetNewItem(jobOpening);
	};

	if (!candidate) {
		return <Typography>Loading candidate details...</Typography>;
	}

	return (
		<div className={styles.container}>
			<ModalManager>
				<div
					style={{
						marginBottom: "20px",
						display: "flex",
						flexDirection: "column",
						flexWrap: "wrap",
						width: "90%",
						margin: "auto",
					}}
				>
					<TextField
						label="Round No"
						name="round_no"
						type="number"
						value={newItem.round_no || ""}
						onChange={handleInputChange}
						style={{ margin: "10px" }}
					/>
					<TextField
						label="Date"
						name="date"
						type="date"
						value={newItem.date || ""}
						onChange={handleInputChange}
						style={{ margin: "10px" }}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						label="Time"
						name="time"
						type="time"
						value={newItem.time || ""}
						onChange={handleInputChange}
						style={{ margin: "10px" }}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<Box
						style={{
							margin: "10px",
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
						}}
					>
						<Box display="flex" alignItems="center" width="100%">
							<TextField
								label="Add Interviewer"
								value={newInterviewer}
								onChange={(e) => setNewInterviewer(e.target.value)}
								style={{ flexGrow: 1, marginRight: "10px" }}
							/>
							<IconButton onClick={handleAddInterviewer} color="primary">
								<AddIcon />
							</IconButton>
						</Box>
						<Box
							style={{
								display: "flex",
								flexWrap: "wrap",
								marginTop: "10px",
							}}
						>
							{newItem.interviewer.map((interviewer, index) => (
								<Chip
									key={index}
									label={interviewer}
									onDelete={() => handleRemoveInterviewer(index)}
									style={{ margin: "5px" }}
									deleteIcon={<PersonRemoveIcon />}
								/>
							))}
						</Box>
					</Box>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSave}
						style={{ margin: "10px" }}
					>
						<SaveIcon /> Save
					</Button>
					<Button
						variant="contained"
						color="default"
						onClick={handleClear}
						style={{ margin: "10px" }}
					>
						<ClearAllIcon /> Clear
					</Button>
				</div>
			</ModalManager>

			{/* Existing table content */}
			<TableContainer component={Paper}>
				<Table aria-label="candidate details table">
					<TableBody>
						<TableRow>
							<TableCell component="th" scope="row" colSpan={6}>
								<Typography variant="h6">Applicants Details</Typography>
							</TableCell>
							<TableCell align="right">
								<Box sx={{ whiteSpace: "nowrap" }}>
									<Button
										variant="contained"
										color="primary"
										onClick={handleScheduleInterview}
									>
										Schedule Interview
									</Button>
								</Box>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<strong>Name:</strong> {candidate.candidate_name || "N/A"}
							</TableCell>
							<TableCell>
								<strong>Email:</strong> {candidate.candidate_email || "N/A"}
							</TableCell>
							<TableCell>
								<strong>Phone:</strong> {candidate.candidate_phone || "N/A"}
							</TableCell>
							<TableCell>
								<strong>Location:</strong> {candidate.current_location || "N/A"}
							</TableCell>
							<TableCell>
								<strong>Current CTC:</strong> ₹
								{candidate.current_ctc
									? candidate.current_ctc.toLocaleString()
									: "N/A"}
							</TableCell>
							<TableCell>
								<strong>Expected CTC:</strong> ₹
								{candidate.expected_ctc
									? candidate.expected_ctc.toLocaleString()
									: "N/A"}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<strong>Notice Period:</strong>{" "}
								{candidate.notice_period || "N/A"}
							</TableCell>
							<TableCell>
								<strong>Experience:</strong> {candidate.experience || "N/A"}
							</TableCell>
							<TableCell>
								<strong>Current Company:</strong>{" "}
								{candidate.current_company || "N/A"}
							</TableCell>
							<TableCell colSpan={3}>
								<strong>Notable Companies:</strong>{" "}
								{candidate.notable_company
									? candidate.notable_company.join(", ")
									: "N/A"}
							</TableCell>
						</TableRow>

						{/* Education Qualifications Row */}
						{candidate.education_qualification?.length > 0 && (
							<>
								<TableRow>
									<TableCell component="th" scope="row" colSpan={6}>
										<Typography variant="h6">
											Education Qualifications
										</Typography>
									</TableCell>
								</TableRow>
								{candidate.education_qualification.map((edu, index) => (
									<TableRow key={index}>
										<TableCell colSpan={2}>
											<strong>Degree:</strong> {edu.degree_name || "N/A"}
										</TableCell>
										<TableCell colSpan={2}>
											<strong>Start Date:</strong>{" "}
											{edu.start_date
												? new Date(edu.start_date).toLocaleDateString()
												: "N/A"}
										</TableCell>
										<TableCell colSpan={2}>
											<strong>End Date:</strong>{" "}
											{edu.end_date
												? new Date(edu.end_date).toLocaleDateString()
												: "N/A"}
										</TableCell>
									</TableRow>
								))}
							</>
						)}

						{/* Skills Row */}
						{candidate.skills?.length > 0 && (
							<>
								<TableRow>
									<TableCell component="th" scope="row" colSpan={6}>
										<Typography variant="h6">Skills</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={6}>
										<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
											{candidate.skills.map((skill, index) => (
												<Box
													key={index}
													sx={{
														bgcolor: "primary.main",
														color: "white",
														px: 2,
														py: 0.5,
														borderRadius: 1,
													}}
												>
													{skill}
												</Box>
											))}
										</Box>
									</TableCell>
								</TableRow>
							</>
						)}

						{/* Job Opening Details Row */}
						{jobOpening && (
							<>
								<TableRow>
									<TableCell component="th" scope="row" colSpan={6}>
										<Typography variant="h6">Interview Details</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<strong>Department:</strong>{" "}
										{jobOpening.department_name || "N/A"}
									</TableCell>

									<TableCell>
										<strong>Subdepartment:</strong>{" "}
										{jobOpening.subdepartment_name || "N/A"}
									</TableCell>

									<TableCell>
										<strong>Role:</strong> {jobOpening.role_name || "N/A"}
									</TableCell>

									<TableCell>
										<strong>Interview Round:</strong>{" "}
										{jobOpening.round_name || "N/A"}
									</TableCell>
									<TableCell>
										<strong>Round Number:</strong>{" "}
										{`${jobOpening.round_no}/${candidate.total_rounds}` ||
											"N/A"}
									</TableCell>
									<TableCell>
										<strong>Status:</strong> {jobOpening.status || "N/A"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<strong>Date:</strong> {jobOpening.date || "N/A"}
									</TableCell>
									<TableCell>
										<strong>Time:</strong> {jobOpening.time || "N/A"}
									</TableCell>
									<TableCell>
										<strong>Interview Type:</strong>{" "}
										{jobOpening?.interview_type || "N/A"}
									</TableCell>
									<TableCell colSpan={3}>
										<strong>Interviewers:</strong>{" "}
										{jobOpening.interviewer
											? jobOpening.interviewer.join(", ")
											: "N/A"}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={6}>
										<strong>Feedback:</strong> {jobOpening.feedback || "N/A"}
									</TableCell>
								</TableRow>
								<TableCell colSpan={6}>
									<strong>Transcript:</strong> {jobOpening.transcript || "N/A"}
								</TableCell>
							</>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default CandidateDetailsTable;
