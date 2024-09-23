import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ModalManager from "../../../../components/modalManager";
import { setOpenModal } from "../../../../redux/Actions/UserAction";
import styles from "./openPosition.module.css"; // Updated style file
import Button from "@mui/material/Button"; // Assuming you're using Material UI for the button
import TableForm from "../../../../components/OpenPosition";
import DataTable from "./component/DataTable";
import apiCall from "../../../API/apiService";
import apiEndpoints from "../../../API/apiEndpoints";
const OpenPositionManagement = () => {
	const resetItem = () => {
		return {
			id: "",
			department_id: "",
			subdepartment_id: "",
			role_id: "",
			department_name: "",
			subdepartment_name: "",
			role_name: "",
			salary_min: "",
			salary_max: "",
			level: "",
			employment_type: "",
			work_arrangement: "",
			no_open_positions: "",
			total_rounds: "",
			opening_rounds: [
				{
					round_name: "",
					question_bank: {
						q1: { question: "", answer: "" },
						q2: {
							question: "",
							answer: "",
						},
					},
					type: "",
					objective: "",
					prompt: "",
				},
			],
			city: "",
		};
	};
	const dispatch = useDispatch();
	const [rows, setRows] = React.useState([]);
	const [departments, setDepartments] = React.useState([]);
	const [subDepartments, setSubDepartments] = React.useState([]);
	const [roles, setRoles] = React.useState([]);
	const [newItem, setNewItem] = React.useState(resetItem());
	const [editingIndex, setEditingIndex] = React.useState(null);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(9);
	// New states for filtering
	const [selectedDepartment, setSelectedDepartment] = React.useState("");
	const [selectedSubDepartment, setSelectedSubDepartment] = React.useState("");
	const [selectedRole, setSelectedRole] = React.useState("");

	useEffect(() => {
		fetchData();
		getDepartmentData();
		getSubdepartmentData();
		getRoleData();
	}, []);
	const fetchData = async () => {
		try {
			const data = await apiCall("get", apiEndpoints.JOB_OPENING);
			console.log(data);
			setRows(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const postData = async (obj) => {
		try {
			const data = await apiCall("post", apiEndpoints.JOB_OPENING, obj);
			console.log(data);
			alert("JobOpening Created successfully");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const putData = async (obj) => {
		try {
			const data = await apiCall("put", apiEndpoints.JOB_OPENING, obj);
			console.log(data);
			alert("JobOpening Updated successfully");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const deleteData = async (id) => {
		try {
			const data = await apiCall("delete", `${apiEndpoints.JOB_OPENING}/${id}`);
			console.log(data);
			alert("JobOpening Deleted successfully");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const getDepartmentData = async () => {
		try {
			const data = await apiCall("get", apiEndpoints.DEPARTMENT);
			console.log(data, "deparment");
			const departments = data?.map((department) => ({
				id: department.id,
				name: department.name,
			}));
			setDepartments(departments);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const getSubdepartmentData = async () => {
		try {
			const data = await apiCall("get", apiEndpoints.SUB_DEPARTMENT);
			const result = data?.map((subdepartment) => ({
				id: subdepartment.id,
				name: subdepartment.name,
				department_id: subdepartment.department_id,
			}));
			setSubDepartments(result);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const getRoleData = async () => {
		try {
			const data = await apiCall("get", apiEndpoints.ROLE);
			const result = data?.map((role) => ({
				id: role.id,
				name: role.role_name,
				subdepartment_id: role.subdepartment_id,
			}));
			setRoles(result);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const getRoleByIdData = async (id) => {
		try {
			const originalData = await apiCall("get", `${apiEndpoints.ROLE}/${id}`);
			const transformedData = {
				id: "",
				department_id: originalData.department_id,
				subdepartment_id: originalData.subdepartment_id,
				role_id: originalData.id,
				department_name: originalData.department_name,
				subdepartment_name: originalData.subdepartment_name,
				role_name: originalData.role_name,
				salary_min: originalData.salary_min,
				salary_max: originalData.salary_max,
				level: originalData.level,
				employment_type: originalData.employment_type,
				work_arrangement: originalData.work_arrangement,
				no_open_positions: "",
				total_rounds: originalData.total_rounds,
				city: originalData.city,
				opening_rounds: originalData.rounds.map((round) => ({
					round_name: round.round_name,
					question_bank: {
						q1: {
							question: round.question_bank.q1
								? round.question_bank.q1.question
								: "",
							answer: round.question_bank.q1
								? round.question_bank.q1.answer
								: "",
						},
						q2: {
							question: round.question_bank.q2
								? round.question_bank.q2.question
								: "",
							answer: round.question_bank.q2
								? round.question_bank.q2.answer
								: "",
						},
					},
					type: round.type,
					objective: round.objective || "", // Default to empty string if not provided
					prompt: round.prompt || "", // Default to empty string if not provided
				})),
			};
			setNewItem(transformedData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleInputChange = async (e) => {
		const { name, value, department_id, subdepartment_id, role_id } = e.target;
		if (department_id) {
			setNewItem({
				...newItem,
				["department_id"]: department_id,
				[name]: value,
			});
			console.log(name, value, department_id);
		} else if (subdepartment_id) {
			setNewItem({
				...newItem,
				["subdepartment_id"]: subdepartment_id,
				[name]: value,
			});
			console.log(name, value, department_id);
		} else if (role_id) {
			setNewItem({
				...newItem,
				["role_id"]: role_id,
				[name]: value,
			});
			await getRoleByIdData(role_id);
			console.log(name, value, department_id);
		} else {
			setNewItem({ ...newItem, [name]: value });
		}
	};

	const handleAddRow = async () => {
		await postData(newItem);
		await fetchData();
		setNewItem(resetItem());
		dispatch(setOpenModal({ modalVisible: false }));
	};

	const handleEditRow = (id) => {
		dispatch(setOpenModal({ modalVisible: true }));
		setEditingIndex(id);
		const itemToEdit = rows.find((row) => row.id === id);
		setNewItem(itemToEdit);
	};

	const handleSaveRow = async () => {
		await putData(newItem);
		await fetchData();
		setEditingIndex(null); // Stop editing mode
		setNewItem(resetItem());
		dispatch(setOpenModal({ modalVisible: false }));
	};

	const handleDeleteRow = async (id) => {
		await deleteData(id);
		await fetchData();
	};

	const handleSelectChange = (e, index) => {
		const updatedRows = [...rows];
		updatedRows[index].status = e.target.value;
		setRows(updatedRows);
	};

	// Open the modal for creating a new open position
	const handleOpenCreateModal = () => {
		setEditingIndex(null);
		setNewItem(resetItem());
		dispatch(setOpenModal({ modalVisible: true }));
	};

	const handleRemoveQuestion = (roundIndex, questionKey) => {
		const updatedRounds = [...newItem.opening_rounds];
		const updatedQuestionBank = { ...updatedRounds[roundIndex].question_bank };

		delete updatedQuestionBank[questionKey]; // Remove the question by its key

		if (Object.keys(updatedQuestionBank).length === 0) {
			updatedQuestionBank.q1 = { question: "", answer: "" }; // Add a default question if empty
		}

		updatedRounds[roundIndex].question_bank = updatedQuestionBank;
		setNewItem({ ...newItem, opening_rounds: updatedRounds });
	};

	const handleAddQuestion = (roundIndex) => {
		const updatedRounds = [...newItem.opening_rounds];
		const questionBankLength = Object.keys(
			updatedRounds[roundIndex].question_bank
		).length;
		const newQuestionKey = `q${questionBankLength + 1}`; // Dynamically generate new question key

		updatedRounds[roundIndex].question_bank[newQuestionKey] = {
			question: "",
			answer: "",
		};
		setNewItem({ ...newItem, opening_rounds: updatedRounds });
	};

	const handleQuestionChange = (roundIndex, questionKey, field, value) => {
		const updatedRounds = [...newItem.opening_rounds];
		updatedRounds[roundIndex].question_bank[questionKey][field] = value;
		setNewItem({ ...newItem, opening_rounds: updatedRounds });
	};

	const handleRemoveRound = (index) => {
		const updatedRounds = newItem.opening_rounds.filter((_, i) => i !== index);

		if (updatedRounds.length === 0) {
			updatedRounds.push({
				round_name: "",
				question_bank: { q1: { question: "", answer: "" } },
				type: "AI",
				objective: "",
			});
		}

		setNewItem({ ...newItem, opening_rounds: updatedRounds });
	};

	const handleRoundChange = (index, field, value) => {
		const updatedRounds = [...newItem.opening_rounds];
		updatedRounds[index] = { ...updatedRounds[index], [field]: value };
		setNewItem({ ...newItem, opening_rounds: updatedRounds });
	};

	const handleAddRound = () => {
		setNewItem({
			...newItem,
			opening_rounds: [
				...newItem.opening_rounds,
				{
					round_name: "",
					question_bank: { q1: { question: "", answer: "" } },
					type: "AI",
					objective: "",
					prompt: "",
				},
			],
		});
	};

	const handleDepartmentFilterChange = (event) => {
		setSelectedDepartment(event.target.value);
		setSelectedSubDepartment(""); // Reset sub-department when department changes
		setSelectedRole(""); // Reset role when department changes
	};

	const handleSubDepartmentFilterChange = (event) => {
		setSelectedSubDepartment(event.target.value);
		setSelectedRole(""); // Reset role when sub-department changes
	};

	const handleRoleFilterChange = (event) => {
		setSelectedRole(event.target.value);
	};

	// Filtered rows based on selected filters
	const filteredRows = rows.filter((row) => {
		return (
			(!selectedDepartment || row.department_id === selectedDepartment) &&
			(!selectedSubDepartment ||
				row.subdepartment_id === selectedSubDepartment) &&
			(!selectedRole || row.role_id === selectedRole)
		);
	});

	return (
		<div className={styles.container}>

			<div className={styles.filterContainer}>
				<select
					value={selectedDepartment}
					onChange={handleDepartmentFilterChange}
					className={styles.filter}
				>
					<option value="">All Departments</option>
					{departments.map((department) => (
						<option key={department.id} value={department.id}>
							{department.name}
						</option>
					))}
				</select>

				<select
					value={selectedSubDepartment}
					onChange={handleSubDepartmentFilterChange}
					className={styles.filter}
					disabled={!selectedDepartment}
				>
					<option value="">All Sub-Departments</option>
					{subDepartments
						.filter((sub) => sub.department_id === selectedDepartment)
						.map((sub) => (
							<option key={sub.id} value={sub.id}>
								{sub.name}
							</option>
						))}
				</select>

				<select
					value={selectedRole}
					onChange={handleRoleFilterChange}
					className={styles.filter}
					disabled={!selectedSubDepartment}
				>
					<option value="">All Roles</option>
					{roles
						.filter((role) => role.subdepartment_id === selectedSubDepartment)
						.map((role) => (
							<option key={role.id} value={role.id}>
								{role.name}
							</option>
						))}
				</select>

				{/* Conditionally render the Clear Filters button */}
				{(selectedDepartment || selectedSubDepartment || selectedRole) && (
					<Button
						variant="outlined"
						color="primary"
						onClick={() => {
							setSelectedDepartment(""); // Reset department
							setSelectedSubDepartment(""); // Reset sub-department
							setSelectedRole(""); // Reset role
						}}
						className={styles.clearFilterButton} // Optional: style class for button
					>
						Clear Filters
					</Button>
				)}
			</div>

			<div className={styles.buttonContainer} style={{ textAlign: "right" }}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleOpenCreateModal}
					style={{ marginBottom: 6 }}
				>
					Create Open Position
				</Button>
			</div>
			<ModalManager>
				<TableForm
					item={newItem}
					departments={departments}
					subDepartments={subDepartments}
					roles={roles}
					onChange={handleInputChange}
					isEdit={editingIndex}
					onSave={editingIndex !== null ? handleSaveRow : handleAddRow}
					onClear={() => setNewItem(resetItem())}
					onRoundChange={handleRoundChange}
					onAddRound={handleAddRound}
					onAddQuestion={handleAddQuestion}
					onQuestionChange={handleQuestionChange}
					onRemoveRound={handleRemoveRound}
					onRemoveQuestion={handleRemoveQuestion}
				/>
			</ModalManager>
			<DataTable
				rows={filteredRows} // Pass filtered rows here
				page={page}
				rowsPerPage={rowsPerPage}
				handleSelectChange={handleSelectChange}
				handleEditRow={handleEditRow}
				handleDeleteRow={handleDeleteRow}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
};

export default OpenPositionManagement;
