import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import TableForm from "../../../../components/RoleTableForm"; // Change to Role-based form
import ModalManager from "../../../../components/modalManager";
import { setOpenModal } from "../../../../redux/Actions/UserAction";
import styles from "./role.module.css"; // Rename style file
import Button from "@mui/material/Button"; // Assuming you're using Material UI for the button
import DataTable from "./component/DataTable";
import { useNavigate } from "react-router-dom";
import AddRoleTableForm from "../../../../components/RoundOpening";
import apiCall from "../../../API/apiService";
import apiEndpoints from "../../../API/apiEndpoints";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const RoleManagement = () => {
	const { modalVisible, modalType } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [rows, setRows] = React.useState([]);

	const resetItemState = () => {
		return {
			id: "",
			role_id: "",
			department_name: "",
			subdepartment_name: "",
			designation: "",
			role_name: "",
			salary_min: "",
			salary_max: "",
			level: "",
			employment_type: "",
			work_arrangement: "",
			total_rounds: "",
			rounds: [
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

	const [newItem, setNewItem] = React.useState(resetItemState());
	const [editingIndex, setEditingIndex] = React.useState(null);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(9);
	const [departments, setDepartments] = React.useState([]);
	const [subDepartments, setSubDepartments] = React.useState([]);
	// States for filtering
	const [filterDepartment, setFilterDepartment] = React.useState("");
	const [filterSubDepartment, setFilterSubDepartment] = React.useState("");
	const [filteredRows, setFilteredRows] = React.useState([]);
	const [noDataModalOpen, setNoDataModalOpen] = React.useState(false);


	useEffect(() => {
		fetchData();
		getDepartmentData();
		getSubdepartmentData();
	}, []);
	const fetchData = async () => {
		try {
			const data = await apiCall("get", apiEndpoints.ROLE);
			setRows(data);
			applyFilter(filterDepartment, filterSubDepartment, data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const postData = async (obj) => {
		try {
			const data = await apiCall("post", apiEndpoints.ROLE, obj);
			console.log(data);
			alert("Role Created successfully");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const putData = async (obj) => {
		try {
			const data = await apiCall("put", apiEndpoints.ROLE, obj);
			console.log(data);
			alert("Role Updated successfully");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const deleteData = async (id) => {
		try {
			const data = await apiCall("delete", `${apiEndpoints.ROLE}/${id}`);
			console.log(data);
			alert("Role Deleted successfully");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const getDepartmentData = async () => {
		try {
			const data = await apiCall("get", apiEndpoints.DEPARTMENT);
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

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleInputChange = (e) => {
		const { name, value, department_id, subdepartment_id } = e.target;
		console.log(department_id);
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
		} else {
			setNewItem({ ...newItem, [name]: value });
		}
	};

	const handleAddRow = async () => {
		const {
			department_id,
			subdepartment_id,
			role_name,
			level,
			designation,
			salary_min,
			salary_max,
			employment_type,
			work_arrangement,
			total_rounds,
		} = newItem;
		console.log(newItem, "newItem");
		const raw = {
			department_id: department_id,
			subdepartment_id: subdepartment_id,
			role_name: role_name,
			level: level,
			designation: designation,
			salary_min: salary_min,
			salary_max: salary_max,
			employment_type: employment_type,
			work_arrangement: work_arrangement,
			total_rounds: total_rounds,
			city_id: "60d5ecb24b24a0b88e5c5e1d",
		};
		await postData(raw);
		await fetchData();
		setNewItem(resetItemState());
	};

	const handleEditRow = (id) => {
		setEditingIndex(id);
		const itemToEdit = rows.find((row) => row.id === id);
		setNewItem(itemToEdit);
		dispatch(
			setOpenModal({
				modalVisible: true,
				modalType: "EDIT_ROLE",
			})
		);
	};

	const handleSaveRow = async () => {
		await putData(newItem);
		await fetchData();
		setEditingIndex(null); // Stop editing mode
		setNewItem(resetItemState());
	};

	const handleDeleteRow = async (id) => {
		await deleteData(id);
		await fetchData();
	};

	const handleAddRole = (id) => {
		const itemToEdit = rows.find((row) => row.id === id);
		setEditingIndex(id);
		setNewItem(itemToEdit);
		dispatch(
			setOpenModal({
				modalVisible: true,
				modalType: "ADD_ROLE",
			})
		);
	};

	const handleSelectChange = (e, index) => {
		const updatedRows = [...rows];
		updatedRows[index].status = e.target.value;
		setRows(updatedRows);
	};

	const handleOpenCreateModal = () => {
		setEditingIndex(null);
		setNewItem(resetItemState());
		dispatch(
			setOpenModal({
				modalVisible: true,
				modalType: "EDIT_ROLE",
			})
		);
	};

	const roleDetails = (id) => {
		navigate(`/round-management/${id}`);
	};

	const handleRemoveQuestion = (roundIndex, questionKey) => {
		const updatedRounds = [...newItem.rounds];
		const updatedQuestionBank = { ...updatedRounds[roundIndex].question_bank };

		delete updatedQuestionBank[questionKey]; // Remove the question by its key

		if (Object.keys(updatedQuestionBank).length === 0) {
			updatedQuestionBank.q1 = { question: "", answer: "" }; // Add a default question if empty
		}

		updatedRounds[roundIndex].question_bank = updatedQuestionBank;
		setNewItem({ ...newItem, rounds: updatedRounds });
	};

	const handleAddQuestion = (roundIndex) => {
		const updatedRounds = [...newItem.rounds];
		const questionBankLength = Object.keys(
			updatedRounds[roundIndex].question_bank
		).length;
		const newQuestionKey = `q${questionBankLength + 1}`; // Dynamically generate new question key

		updatedRounds[roundIndex].question_bank[newQuestionKey] = {
			question: "",
			answer: "",
		};
		setNewItem({ ...newItem, rounds: updatedRounds });
	};

	const handleQuestionChange = (roundIndex, questionKey, field, value) => {
		const updatedRounds = [...newItem.rounds];
		updatedRounds[roundIndex].question_bank[questionKey][field] = value;
		setNewItem({ ...newItem, rounds: updatedRounds });
	};

	const handleRemoveRound = (index) => {
		const updatedRounds = newItem.rounds.filter((_, i) => i !== index);

		if (updatedRounds.length === 0) {
			updatedRounds.push({
				round_name: "",
				question_bank: { q1: { question: "", answer: "" } },
				type: "AI",
				objective: "",
			});
		}

		setNewItem({ ...newItem, rounds: updatedRounds });
	};

	const handleRoundChange = (index, field, value) => {
		const updatedRounds = [...newItem.rounds];
		updatedRounds[index] = { ...updatedRounds[index], [field]: value };
		setNewItem({ ...newItem, rounds: updatedRounds });
	};

	const handleAddRound = () => {
		setNewItem({
			...newItem,
			rounds: [
				...newItem.rounds,
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

	// Handle department filter change
	const handleFilterDepartmentChange = (event) => {
		const newDepartmentId = event.target.value;
		setFilterDepartment(newDepartmentId);
		setFilterSubDepartment(""); // Reset sub-department when department changes
		applyFilter(newDepartmentId, "");
	};

	// Handle sub-department filter change
	const handleFilterSubDepartmentChange = (event) => {
		const newSubDepartmentId = event.target.value;
		setFilterSubDepartment(newSubDepartmentId);
		applyFilter(filterDepartment, newSubDepartmentId);
	};

	// Apply filter logic based on department and sub-department
	const applyFilter = (departmentId, subDepartmentId, rowsToFilter = rows) => {
		let filtered = [...rowsToFilter];
		if (departmentId) {
			filtered = filtered.filter((row) => row.department_id === departmentId);
		}
		if (subDepartmentId) {
			filtered = filtered.filter(
				(row) => row.subdepartment_id === subDepartmentId
			);
		}
		setFilteredRows(filtered);

		// Check if there's no data after filtering
		if (filtered.length === 0) {
			setNoDataModalOpen(true);
		}
	};

	const handleClearFilters = () => {
		setFilterDepartment("");
		setFilterSubDepartment("");
		setFilteredRows(rows);
	};

	const handleCloseNoDataModal = () => {
		setNoDataModalOpen(false);
	};

	const addRoleComponent = () => {
		return (
			<ModalManager>
				<AddRoleTableForm
					item={newItem}
					onChange={handleInputChange}
					onSave={editingIndex !== null ? handleSaveRow : handleAddRow}
					onClear={() =>
						setNewItem({
							id: "",
							department_name: "",
							subDepartment_name: "",
							role_name: "",
							rounds: [
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
						})
					}
					onRoundChange={handleRoundChange}
					onAddRound={handleAddRound}
					onAddQuestion={handleAddQuestion}
					onQuestionChange={handleQuestionChange}
					onRemoveRound={handleRemoveRound}
					onRemoveQuestion={handleRemoveQuestion}
				/>
			</ModalManager>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.filterContainer}>
				<select
					value={filterDepartment}
					onChange={handleFilterDepartmentChange}
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
					value={filterSubDepartment}
					onChange={handleFilterSubDepartmentChange}
					className={styles.filter}
					disabled={!filterDepartment}
				>
					<option value="">All Sub-Departments</option>
					{subDepartments
						.filter(
							(sub) => sub.department_id === filterDepartment
						)
						.map((subdepartment) => (
							<option key={subdepartment.id} value={subdepartment.id}>
								{subdepartment.name}
							</option>
						))}
				</select>

				{(filterDepartment || filterSubDepartment) && <Button
					variant="outlined"
					color="primary"
					onClick={handleClearFilters}
					style={{ marginLeft: 10 }}
				>
					Clear Filters
				</Button>}
			</div>

			<div className={styles.buttonContainer} style={{ textAlign: "right" }}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleOpenCreateModal}
					style={{ marginBottom: 6 }}
				>
					Create Role
				</Button>
			</div>

			{modalVisible && modalType === "ADD_ROLE" ? (
				addRoleComponent()
			) : modalVisible && modalType === "EDIT_ROLE" ? (
				<ModalManager>
					<TableForm
						item={newItem}
						departments={departments}
						isEdit={editingIndex ? true : false}
						subDepartments={subDepartments}
						onChange={handleInputChange}
						onSave={editingIndex !== null ? handleSaveRow : handleAddRow}
						onClear={() =>
							setNewItem({
								id: "",
								department_name: "",
								subdepartment_name: "",
								role_id: "",
								role_name: "",
								salary_min: "",
								salary_max: "",
								level: "",
								designation: "",
								employment_type: "",
								work_arrangement: "",
								total_rounds: "",
								city: "",
							})
						}
					/>
				</ModalManager>
			) : null}
			<DataTable
				rows={filteredRows} // Use filteredRows instead of rows
				page={page}
				rowsPerPage={rowsPerPage}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				handleEditRow={handleEditRow}
				handleDeleteRow={handleDeleteRow}
				handleSelectChange={handleSelectChange}
				onViewDetails={roleDetails}
				onAddRole={handleAddRole}
			/>

			<Dialog open={noDataModalOpen} onClose={handleCloseNoDataModal}>
				<DialogTitle>No Data Available</DialogTitle>
				<DialogContent>
					<p>There is no data available for the selected filters.</p>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseNoDataModal} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default RoleManagement;
