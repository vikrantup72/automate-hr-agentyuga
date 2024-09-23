import React, { useMemo, useCallback } from "react";
import {
	Button,
	TextField,
	Select,
	MenuItem,
	Box,
	Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";

const TableForm = ({
	item,
	departments,
	subDepartments,
	roles,
	onChange,
	onSave,
	onClear,
	isEdit,
	onRoundChange,
	onAddRound,
	onAddQuestion,
	onQuestionChange,
	onRemoveRound,
	onRemoveQuestion,
}) => {
	console.log(item, "newItem");
	// Filter subDepartments based on selected department
	const filteredSubDepartments = useMemo(() => {
		if (item?.department_id) {
			return subDepartments.filter(
				(subDept) => subDept.department_id === item.department_id
			);
		}
		return [];
	}, [item?.department_id, subDepartments]);

	// Filter roles based on selected sub-department
	const filteredRoles = useMemo(() => {
		if (item?.subdepartment_id) {
			console.log(item, "roles");
			return roles.filter(
				(role) => role.subdepartment_id === item.subdepartment_id
			);
		}
		return [];
	}, [item?.subdepartment_id, roles]);

	// Memoized onChange handler
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
			} else if (name === "role_name") {
				const selectedRole = filteredRoles.find((role) => role.name === value);
				onChange({
					target: {
						name,
						value,
						role_id: selectedRole ? selectedRole.id : null,
					},
				});
			} else {
				onChange(event);
			}
		},
		[departments, filteredSubDepartments, filteredRoles, onChange]
	);

	// Determine when fields should be enabled
	const isSubDepartmentDisabled = !item?.department_id;
	const isRoleDisabled = !item?.subdepartment_id;
	const areOtherFieldsDisabled = !item?.role_name;

	return (
		<Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
			<Typography variant="h6" gutterBottom>
				Open Position Form
			</Typography>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
					gap: 2,
				}}
			>
				{/* Department Dropdown */}
				<Select
					name="department_name"
					value={item?.department_name || ""}
					fullWidth
					disabled={isEdit} // Enable only if not in edit mode
					displayEmpty
					renderValue={(value) => (value ? value : "Select Department")}
					onChange={handleChange}
				>
					{departments.map((dept) => (
						<MenuItem key={dept.id} value={dept.name}>
							{dept.name}
						</MenuItem>
					))}
				</Select>

				{/* Subdepartment Dropdown */}
				<Select
					name="subdepartment_name"
					value={item?.subdepartment_name || ""}
					fullWidth
					disabled={isEdit || isSubDepartmentDisabled} // Enable only if department is selected
					displayEmpty
					renderValue={(value) => (value ? value : "Select Sub-Department")}
					onChange={handleChange}
				>
					{filteredSubDepartments.map((subDept) => (
						<MenuItem key={subDept.id} value={subDept.name}>
							{subDept.name}
						</MenuItem>
					))}
				</Select>

				{/* Role Dropdown */}
				<Select
					name="role_name"
					value={item?.role_name || ""}
					fullWidth
					disabled={isEdit || isRoleDisabled} // Enable only if subdepartment is selected
					displayEmpty
					renderValue={(value) => (value ? value : "Select Role")}
					onChange={handleChange}
				>
					{filteredRoles.map((role) => (
						<MenuItem key={role.id} value={role.name}>
							{role.name}
						</MenuItem>
					))}
				</Select>
				<TextField
					name="no_open_positions"
					label="No of Positions"
					type="number"
					value={item?.no_open_positions || ""}
					onChange={handleChange}
					fullWidth
					disabled={areOtherFieldsDisabled && !isEdit}
				/>
				<TextField
					name="salary_min"
					label="Salary Min"
					type="number"
					value={item?.salary_min || ""}
					onChange={handleChange}
					fullWidth
					disabled={areOtherFieldsDisabled && !isEdit} // Enable only if role is selected
				/>
				<TextField
					name="salary_max"
					label="Salary Max"
					type="number"
					value={item?.salary_max || ""}
					onChange={handleChange}
					fullWidth
					disabled={areOtherFieldsDisabled && !isEdit}
				/>
				<TextField
					name="employment_type"
					label="FT/PT"
					value={item?.employment_type || ""}
					onChange={handleChange}
					fullWidth
					disabled={areOtherFieldsDisabled && !isEdit}
				/>
				<TextField
					name="work_arrangement"
					label="Work Type"
					value={item?.work_arrangement || ""}
					onChange={handleChange}
					fullWidth
					disabled={areOtherFieldsDisabled && !isEdit}
				/>
				<TextField
					name="city"
					label="City"
					value={item?.city || ""}
					onChange={handleChange}
					fullWidth
					disabled={areOtherFieldsDisabled && !isEdit}
				/>
			</Box>
			{item?.opening_rounds?.map((round, roundIndex) => (
				<Box
					key={roundIndex}
					sx={{ mb: 3, border: "1px solid #ddd", borderRadius: 2, p: 2 }}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							mb: 2,
						}}
					>
						<Typography variant="h6">Round {roundIndex + 1}</Typography>
						{item.opening_rounds.length > 1 && (
							<Button
								onClick={() => onRemoveRound(roundIndex)}
								color="error"
								variant="outlined"
								size="small"
							>
								Delete Round
							</Button>
						)}
					</Box>
					<TextField
						name={`rounds[${roundIndex}].round_name`}
						label="Round Name"
						value={round.round_name}
						onChange={(e) =>
							onRoundChange(roundIndex, "round_name", e.target.value)
						}
						required
						fullWidth
						sx={{ mb: 2 }}
					/>
					<Select
						name={`rounds[${roundIndex}].type`}
						value={round.type}
						onChange={(e) => onRoundChange(roundIndex, "type", e.target.value)}
						fullWidth
						displayEmpty
						required
						sx={{ mb: 2 }}
					>
						<MenuItem value="" disabled>
							Select Type
						</MenuItem>
						<MenuItem value="AI">AI</MenuItem>
						<MenuItem value="Human">Human</MenuItem>
					</Select>

					<TextField
						name={`rounds[${roundIndex}].prompt`}
						label="Prompt"
						disabled={round.type !== "AI"}
						value={round.prompt}
						onChange={(e) =>
							onRoundChange(roundIndex, "prompt", e.target.value)
						}
						required
						fullWidth
						sx={{ mb: 2 }}
					/>

					<TextField
						name={`rounds[${roundIndex}].objective`}
						label="Objective"
						value={round.objective}
						onChange={(e) =>
							onRoundChange(roundIndex, "objective", e.target.value)
						}
						required
						fullWidth
						sx={{ mb: 2 }}
					/>

					{Object.keys(round.question_bank).map(
						(questionKey, questionIndex) => (
							<Box key={questionKey} sx={{ mb: 2 }}>
								<TextField
									name={`rounds[${roundIndex}].question_bank[${questionKey}].question`}
									label={`Question ${questionIndex + 1}`}
									value={round.question_bank[questionKey].question}
									onChange={(e) =>
										onQuestionChange(
											roundIndex,
											questionKey,
											"question",
											e.target.value
										)
									}
									required
									fullWidth
									sx={{ mb: 1 }}
								/>
								<TextField
									name={`rounds[${roundIndex}].question_bank[${questionKey}].answer`}
									label={`Answer ${questionIndex + 1}`}
									value={round.question_bank[questionKey].answer}
									onChange={(e) =>
										onQuestionChange(
											roundIndex,
											questionKey,
											"answer",
											e.target.value
										)
									}
									required
									fullWidth
								/>
								<Box sx={{ display: "flex", gap: 1, mt: 1 }}>
									<Button
										onClick={() => onRemoveQuestion(roundIndex, questionKey)}
										color="error"
										variant="outlined"
										size="small"
									>
										Remove Question
									</Button>
								</Box>
							</Box>
						)
					)}
					<Box sx={{ display: "flex", gap: 1, mt: 1 }}>
						<Button
							onClick={() => onAddQuestion(roundIndex)}
							color="primary"
							variant="contained"
							size="small"
						>
							Add Question
						</Button>
					</Box>
				</Box>
			))}

			<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
				<Button variant="contained" color="primary" onClick={onAddRound}>
					Add Round
				</Button>
				<Box
					disabled={areOtherFieldsDisabled && !isEdit}
					sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}
				>
					<Button variant="contained" color="success" onClick={onSave}>
						Save
					</Button>
					<Button variant="outlined" color="error" onClick={onClear}>
						Clear
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default TableForm;
