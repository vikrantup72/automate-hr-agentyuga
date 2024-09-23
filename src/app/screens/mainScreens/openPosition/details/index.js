import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Details from "./components/Details";
import Applicant from "./components/Applicant";
import apiEndpoints from "../../../../API/apiEndpoints";
import apiCall from "../../../../API/apiService";
import ModalManager from "../../../../../components/modalManager/index";
import { useDispatch } from "react-redux";
import { setOpenModal } from "../../../../../redux/Actions/UserAction";
import TableForm from "../../../../../components/AddApplicantTable";

const JobOpeningDetails = () => {
	const resetItem = () => ({
		candidate_name: "",
		candidate_email: "",
		candidate_phone: "",
		current_location: "",
		current_ctc: "",
		expected_ctc: "",
		notice_period: "",
		education_qualification: [
			{ degree_name: "", start_date: "", end_date: "" },
		],
		skills: [],
		notable_company: [],
		experience: "",
		current_company: "",
	});
	const dispatch = useDispatch();
	const [newItem, setNewItem] = useState(resetItem());
	const [editingIndex, setEditingIndex] = useState(null);
	const [activeTab, setActiveTab] = useState(0);
	const [candidates, setCandidates] = useState([]);
	const [job_opening_id, setJob_opening_id] = useState();

	useEffect(() => {
		const urlSegments = window.location.href.split("/");
		const id = urlSegments[4];
		if (id) {
			fetchData(id);
			setJob_opening_id(id);
		}
	}, []);

	const fetchData = async (id) => {
		try {
			const data = await apiCall(
				"get",
				`${apiEndpoints.JOB_OPENING_APPLICANTS}/${id ?? job_opening_id}`
			);
			setCandidates(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleTabChange = (event, newValue) => setActiveTab(newValue);

	const handleAddApplicant = () =>
		dispatch(setOpenModal({ modalVisible: true }));

	const handleSaveOrUpdate = async (method) => {
		try {
			await apiCall(method, apiEndpoints.CANDIDATE_DETAILS, {
				...newItem,
				job_opening_id,
			});
			alert(`JobOpening Created successfully`);
			await fetchData();
			setNewItem(resetItem());
			dispatch(setOpenModal({ modalVisible: false }));
		} catch (error) {
			console.error(`Error posting data:`, error);
		}
	};

	const handleAddRow = () => handleSaveOrUpdate("post");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewItem((prev) => ({ ...prev, [name]: value }));
	};

	const handleArrayInputChange = (index, field, value, arrayName) => {
		setNewItem((prev) => {
			const updatedArray = [...prev[arrayName]];
			updatedArray[index][field] = value;
			return { ...prev, [arrayName]: updatedArray };
		});
	};

	const handleAddEducation = () => {
		setNewItem((prev) => ({
			...prev,
			education_qualification: [
				...prev.education_qualification,
				{ degree_name: "", start_date: "", end_date: "" },
			],
		}));
	};

	const handleRemoveEducation = (index) => {
		setNewItem((prev) => ({
			...prev,
			education_qualification: prev.education_qualification.filter(
				(_, i) => i !== index
			),
		}));
	};

	const handleAddSkill = (skill) => {
		setNewItem((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
	};

	return (
		<div>
			<ModalManager>
				<TableForm
					item={newItem}
					onChange={handleInputChange}
					onArrayInputChange={handleArrayInputChange}
					handleAddEducation={handleAddEducation}
					handleRemoveEducation={handleRemoveEducation}
					onAddSkill={handleAddSkill}
					isEdit={editingIndex !== null}
					onSave={handleAddRow}
					onClear={() => setNewItem(resetItem())}
				/>
			</ModalManager>
			<Tabs
				value={activeTab}
				onChange={handleTabChange}
				indicatorColor="primary"
				textColor="primary"
				variant="fullWidth"
				aria-label="job opening tabs"
			>
				<Tab label="Applicant" />
				<Tab label="Details" />
			</Tabs>
			<Box>
				{activeTab === 0 && <Applicant candidates={candidates} />}
				{activeTab === 1 && <Details handleAddApplicant={handleAddApplicant} />}
			</Box>
		</div>
	);
};

export default JobOpeningDetails;
