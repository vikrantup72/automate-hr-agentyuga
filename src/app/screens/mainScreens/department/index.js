import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import DataTable from "../../../../components/customTable";
import TableForm from "../../../../components/DepartmentTableForm";
import ModalManager from "../../../../components/modalManager";
import { setOpenModal } from "../../../../redux/Actions/UserAction";
import styles from "./department.module.css";
import Button from "@mui/material/Button"; // Assuming you're using Material UI for the button
import apiCall from "../../../API/apiService";
import apiEndpoints from "../../../API/apiEndpoints";

const Department = () => {
	const [rows, setRows] = React.useState([]);
	const dispatch = useDispatch();
	const [newItem, setNewItem] = React.useState({
		id: "",
		name: "",
		description: "",
		head: "",
		no_subdepartments: "",
	});
	const [editingIndex, setEditingIndex] = React.useState(null);
	useEffect(() => {
		fetchData();
	}, []);
	const fetchData = async () => {
		try {
			const data = await apiCall("get", apiEndpoints.DEPARTMENT);
			console.log(data);
			setRows(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const postData = async (obj) => {
		try {
			const data = await apiCall("post", apiEndpoints.DEPARTMENT, obj);
			console.log(data);
			alert("Department Created successfully");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const putData = async (obj) => {
		try {
			const data = await apiCall("put", apiEndpoints.DEPARTMENT, obj);
			console.log(data);
			alert("Department Updated successfully");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const deleteData = async (id) => {
		try {
			const data = await apiCall("delete", `${apiEndpoints.DEPARTMENT}/${id}`);
			console.log(data);
			alert("Department Deleted successfully");
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewItem({ ...newItem, [name]: value });
	};

	const handleAddRow = async () => {
		const raw = {
			name: newItem.name,
			description: newItem.description,
			head: newItem.head,
		};
		// Send data to API
		await postData(raw);
		await fetchData();
		setNewItem({
			id: "",
			name: "",
			description: "",
			head: "",
			no_subdepartments: "",
		});
	};

	const handleSaveRow = async () => {
		const raw = {
			id: newItem.id,
			name: newItem.name,
			description: newItem.description,
			head: newItem.head,
		};
		await putData(raw);
		await fetchData();
		setEditingIndex(null);
		setNewItem({
			id: "",
			name: "",
			description: "",
			head: "",
			no_subdepartments: "",
		});
	};

	const handleEditRow = (id) => {
		dispatch(setOpenModal({ modalVisible: true }));
		setEditingIndex(id);
		const itemToEdit = rows.find((row) => row.id === id);
		setNewItem(itemToEdit);
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

	// Open the modal for creating a new department
	const handleOpenCreateModal = () => {
		setNewItem({
			id: "",
			name: "",
			description: "",
			head: "",
			no_subdepartments: "",
		});
		setEditingIndex(null);
		dispatch(setOpenModal({ modalVisible: true }));
	};

	return (
		<div className={styles.container}>
			{/* Create Department Button */}
			<div className={styles.buttonContainer} style={{ textAlign: "right" }}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleOpenCreateModal}
					style={{ marginBottom: 6 }}
				>
					Create Department
				</Button>
			</div>

			<ModalManager>
				<TableForm
					item={newItem}
					onChange={handleInputChange}
					onSave={editingIndex !== null ? handleSaveRow : handleAddRow}
					onClear={() =>
						setNewItem({
							id: "",
							name: "",
							description: "",
							head: "",
							rolesOpen: "",
							people: "",
							no_subdepartments: "",
						})
					}
				/>
			</ModalManager>

			{/* DataTable for displaying departments */}
			<DataTable
				rows={rows}
				handleSelectChange={handleSelectChange}
				handleEditRow={handleEditRow}
				handleDeleteRow={handleDeleteRow}
			/>
		</div>
	);
};

export default Department;
