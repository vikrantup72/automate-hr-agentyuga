import React, { useMemo, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import MenuItem from "@mui/material/MenuItem"; // For dropdown

const TableForm = ({
	item,
	departments,
	subDepartments,
	onChange,
	onSave,
	onClear,
	isEdit,
}) => {
	// Memoize the filtered subDepartments
	const filteredSubDepartments = useMemo(() => {
		if (item?.department_id) {
			return subDepartments.filter(
				(subDept) => subDept.department_id === item.department_id
			);
		}
		return [];
	}, [item?.department_id, subDepartments]);

	// Memoize onChange handler to prevent re-renders
	const handleChange = useCallback(
		(event) => {
			const { name, value } = event.target;

			if (name === "department_name") {
				const selectedDept = departments.find((dept) => dept.name === value);
				onChange({
					target: {
						name,
						value,
						department_id: selectedDept ? selectedDept.id : null,
					},
				});
			} else if (name === "subdepartment_name") {
				const selectedSubDept = filteredSubDepartments.find(
					(subDept) => subDept.name === value
				);
				onChange({
					target: {
						name,
						value,
						subdepartment_id: selectedSubDept ? selectedSubDept.id : null,
					},
				});
			} else {
				onChange(event);
			}
		},
		[departments, filteredSubDepartments, onChange]
	);

	// Control when fields should be enabled
	const isSubDepartmentDisabled = !item?.department_id;
	const areOtherFieldsDisabled = !item?.subdepartment_id;

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
				name="department_name"
				disabled={isEdit}
				value={item?.department_name || ""}
				onChange={handleChange} // Use memoized handleChange
				style={{ margin: "10px" }}
			>
				{departments.map((dept) => (
					<MenuItem key={dept.id} value={dept.name}>
						{dept.name}
					</MenuItem>
				))}
			</TextField>

			{/* Subdepartment dropdown */}
			<TextField
				select
				label="SubDepartment"
				name="subdepartment_name"
				value={item?.subdepartment_name?.toString() || ""}
				onChange={handleChange} // Use memoized handleChange
				style={{ margin: "10px" }}
				disabled={isSubDepartmentDisabled || isEdit}
			>
				{filteredSubDepartments.map((subDept) => (
					<MenuItem key={subDept.id} value={subDept.name}>
						{subDept.name}
					</MenuItem>
				))}
			</TextField>

			<TextField
				label="Role Name"
				name="role_name"
				value={item.role_name || ""}
				onChange={handleChange} // Use memoized handleChange
				style={{ margin: "10px" }}
				disabled={areOtherFieldsDisabled}
			/>

			{/* Salary Min field */}
			<TextField
				label="Salary Min"
				name="salary_min"
				type="number"
				value={item.salary_min || ""}
				onChange={handleChange} // Use memoized handleChange
				style={{ margin: "10px" }}
				disabled={areOtherFieldsDisabled}
			/>

			{/* Salary Max field */}
			<TextField
				label="Salary Max"
				name="salary_max"
				type="number"
				value={item.salary_max || ""}
				onChange={handleChange} // Use memoized handleChange
				style={{ margin: "10px" }}
				disabled={areOtherFieldsDisabled}
			/>

			{/* Level */}
			<TextField
				label="Level"
				name="level"
				value={item.level || ""}
				onChange={handleChange} // Use memoized handleChange
				style={{ margin: "10px" }}
				disabled={areOtherFieldsDisabled}
			/>
			{/* designation */}
			<TextField
				label="Designation"
				name="designation"
				value={item.designation || ""}
				onChange={handleChange} // Use memoized handleChange
				style={{ margin: "10px" }}
				disabled={areOtherFieldsDisabled}
			/>

			{/* FT/PT dropdown */}
			<TextField
				select
				label="FT/PT"
				name="employment_type"
				value={item.employment_type || ""}
				onChange={handleChange} // Use memoized handleChange
				style={{ margin: "10px" }}
				disabled={areOtherFieldsDisabled}
			>
				<MenuItem value="FT">FT</MenuItem>
				<MenuItem value="PT">PT</MenuItem>
			</TextField>

			{/* WFO/WFH/Hybrid dropdown */}
			<TextField
				select
				label="WFO/WFH/Hybrid"
				name="work_arrangement"
				value={item.work_arrangement || ""}
				onChange={handleChange} // Use memoized handleChange
				style={{ margin: "10px" }}
				disabled={areOtherFieldsDisabled}
			>
				<MenuItem value="WFO">Work From Office</MenuItem>
				<MenuItem value="WFH">Work From Home</MenuItem>
				<MenuItem value="Hybrid">Hybrid</MenuItem>
			</TextField>

			{/* Rounds */}
			<TextField
				label="Rounds"
				name="total_rounds"
				value={item.total_rounds || ""}
				onChange={handleChange} // Use memoized handleChange
				style={{ margin: "10px" }}
				disabled={areOtherFieldsDisabled}
			/>

			{/* City */}
			<TextField
				label="City"
				name="city"
				value={item.city || ""}
				onChange={handleChange} // Use memoized handleChange
				style={{ margin: "10px" }}
				disabled={areOtherFieldsDisabled}
			/>

			{/* Save and Clear Buttons */}
			<Button
				variant="contained"
				color="primary"
				onClick={onSave}
				style={{ margin: "10px" }}
				disabled={areOtherFieldsDisabled}
			>
				<SaveIcon /> Save
			</Button>
			<Button
				variant="contained"
				color="default"
				onClick={onClear}
				style={{ margin: "10px" }}
				disabled={areOtherFieldsDisabled}
			>
				<ClearAllIcon /> Clear
			</Button>
		</div>
	);
};

export default React.memo(TableForm);
