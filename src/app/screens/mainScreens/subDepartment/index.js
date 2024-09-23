import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import TableForm from "../../../../components/SubDepartmentTableForm";
import ModalManager from "../../../../components/modalManager";
import { setOpenModal } from "../../../../redux/Actions/UserAction";
import styles from "./subDepartment.module.css";
import Button from "@mui/material/Button"; // Assuming you're using Material UI for the button
import apiCall from "../../../API/apiService";
import apiEndpoints from "../../../API/apiEndpoints";
import DataTable from "../../../../components/subDepartmentData";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
const SubDepartment = () => {
	const dispatch = useDispatch();
	const [rows, setRows] = React.useState([]);
	const [departmentList, setDepartmetList] = React.useState([]);
	const [noDataModalOpen, setNoDataModalOpen] = React.useState(false);
	useEffect(() => {
		fetchData();
		getAllDepartmentData();
	}, []);
	const getAllDepartmentData = async () => {
		try {
			const response = await apiCall("get", apiEndpoints.DEPARTMENT);
			const departments = response?.map((department) => ({
				id: department.id,
				name: department.name,
			}));
			setDepartmetList(departments);
		} catch (error) {
			console.error("Error fetching departments:", error);
		}
	};

	const fetchData = async () => {
		try {
			const data = await apiCall("get", apiEndpoints.SUB_DEPARTMENT);
			setRows(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const postData = async (obj) => {
		try {
			const data = await apiCall("post", apiEndpoints.SUB_DEPARTMENT, obj);
			console.log(data);
			alert("SubDepartment Created successfully");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const putData = async (obj) => {
		try {
			const data = await apiCall("put", apiEndpoints.SUB_DEPARTMENT, obj);
			alert("SubDepartment Updated successfully");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const deleteData = async (id) => {
		try {
			const data = await apiCall(
				"delete",
				`${apiEndpoints.SUB_DEPARTMENT}/${id}`
			);
			alert("SubDepartment Deleted successfully");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const [newItem, setNewItem] = React.useState({
		department_id: "",
		department_name: "",
		name: "",
		description: "",
		head: "",
		no_roles_open: "",
	});
	const [editingIndex, setEditingIndex] = React.useState(null);
	const handleInputChange = (e) => {
		const { name, value, department_id } = e.target;
		if (department_id) {
			setNewItem({
				...newItem,
				["department_id"]: department_id,
				[name]: value,
			});
		} else {
			setNewItem({ ...newItem, [name]: value });
		}
	};

	const handleAddRow = async () => {
		const raw = {
			department_id: newItem.department_id,
			name: newItem.name,
			description: newItem.description,
			head: newItem.head,
		};
		await postData(raw);
		await fetchData();
		setNewItem({
			department_id: "",
			department_name: "",
			name: "",
			description: "",
			head: "",
			no_roles_open: "",
		});
	};

	const handleEditRow = (id) => {
		dispatch(setOpenModal({ modalVisible: true }));
		setEditingIndex(id);
		const itemToEdit = rows.find((row) => row.id === id);
		setNewItem(itemToEdit);
	};

	const handleSaveRow = async () => {
		const raw = {
			department_id: newItem.department_id,
			id: newItem.id,
			name: newItem.name,
			description: newItem.description,
			head: newItem.head,
		};
		await putData(raw);
		await fetchData();
		setEditingIndex(null); // Stop editing mode
		setNewItem({
			department_id: "",
			department_name: "",
			name: "",
			description: "",
			head: "",
			no_roles_open: "",
		});
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

	// Open the modal for creating a new sub-department
	const handleOpenCreateModal = () => {
		dispatch(setOpenModal({ modalVisible: true }));
	};
	const handleCloseNoDataModal = () => {
		setNoDataModalOpen(false);
	};
	return (
		<div className={styles.container}>
			<div className={styles.buttonContainer} style={{ textAlign: "right" }}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleOpenCreateModal}
					style={{ marginBottom: 6 }}
				>
					Create Sub-Department
				</Button>
			</div>

			<ModalManager>
				<TableForm
					item={newItem}
					editingIndex={editingIndex ? true : false}
					deparmentName={newItem?.department_name}
					departments={departmentList}
					onChange={handleInputChange}
					onSave={editingIndex !== null ? handleSaveRow : handleAddRow}
					onClear={() =>
						setNewItem({
							department_id: "",
							department_name: "",
							name: "",
							description: "",
							head: "",
							no_roles_open: "",
						})
					}
				/>
			</ModalManager>

			{/* DataTable for displaying sub-departments */}
			<DataTable
				rows={rows}
				handleSelectChange={handleSelectChange}
				handleEditRow={handleEditRow}
				handleDeleteRow={handleDeleteRow}
				editingIndex={editingIndex}
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

export default SubDepartment;
