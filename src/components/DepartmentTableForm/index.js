import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";

const TableForm = ({ item, onChange, onSave, onClear }) => {
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
			<TextField
				label="Name"
				name="name"
				value={item.name || ""} // Ensure fallback for undefined
				onChange={onChange}
				style={{ margin: "10px" }}
			/>
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
