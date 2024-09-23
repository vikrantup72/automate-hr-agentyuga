import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import MenuItem from "@mui/material/MenuItem"; // For dropdown

const TableForm = ({
	item,
	departments,
	onChange,
	onSave,
	onClear,
	editingIndex,
}) => {
	return (
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
			{/* Department dropdown */}
			<TextField
				select
				label="Department"
				disabled={editingIndex}
				name="department_name"
				value={item?.department_name || ""}
				onChange={(event) => {
					const selectedDept = departments.find(
						(dept) => dept.name === event.target.value
					);
					onChange({
						target: {
							name: "department_name",
							value: event.target.value,
							department_id: selectedDept ? selectedDept.id : null,
						},
					});
				}}
				style={{ margin: "10px" }}
			>
				{departments.map((dept) => (
					<MenuItem key={dept.id} value={dept.name}>
						{dept.name}
					</MenuItem>
				))}
			</TextField>

			{/* Name field */}
			<TextField
				label="Name"
				name="name"
				value={item.name || ""}
				onChange={onChange}
				style={{ margin: "10px" }}
			/>

			{/* Description field */}
			<TextField
				label="Description"
				name="description"
				value={item.description || ""}
				onChange={onChange}
				style={{ margin: "10px" }}
			/>

			<TextField
				label="Head"
				name="head"
				value={item.head || ""}
				onChange={onChange}
				style={{ margin: "10px" }}
			/>

			<Button
				variant="contained"
				color="primary"
				onClick={onSave}
				style={{ margin: "10px" }}
			>
				<SaveIcon /> Save
			</Button>
			<Button
				variant="contained"
				color="default"
				onClick={onClear}
				style={{ margin: "10px" }}
			>
				<ClearAllIcon /> Clear
			</Button>
		</div>
	);
};

export default TableForm;
