import React, { useCallback, useState } from "react";
import {
	Button,
	TextField,
	Box,
	Typography,
	Chip,
	Input,
	IconButton,
	Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const TableForm = ({
	item,
	onChange,
	onSave,
	onClear,
	isEdit,
	handleAddEducation,
	onArrayInputChange,
	handleRemoveEducation,
}) => {
	const [inputValues, setInputValues] = useState({
		skill: "",
		company: "",
	});

	const handleChange = useCallback(
		(event) => {
			const { name, value } = event.target;
			onChange({ target: { name, value } });
		},
		[onChange]
	);

	const handleArrayChange = useCallback(
		(type, itemToAdd, itemToRemove) => {
			if (itemToAdd) {
				const updatedArray = [...(item[type] || []), itemToAdd];
				onChange({ target: { name: type, value: updatedArray } });
				if (type === "skills") {
					setInputValues((prev) => ({ ...prev, skill: "" }));
				} else if (type === "notable_company") {
					setInputValues((prev) => ({ ...prev, company: "" }));
				}
			} else if (itemToRemove) {
				const updatedArray = item[type].filter((i) => i !== itemToRemove);
				onChange({ target: { name: type, value: updatedArray } });
			}
		},
		[item, onChange]
	);

	const handleSkillAdd = () => {
		if (inputValues.skill) {
			handleArrayChange("skills", inputValues.skill);
		}
	};

	const handleCompanyAdd = () => {
		if (inputValues.company) {
			handleArrayChange("notable_company", inputValues.company);
		}
	};

	const handleEducationChange = useCallback(
		(index, field, value) => {
			onArrayInputChange(index, field, value, "education_qualification");
		},
		[onArrayInputChange]
	);

	return (
		<Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
			<Typography variant="h6" gutterBottom>
				Candidate Details Form
			</Typography>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
					gap: 2,
				}}
			>
				<TextField
					name="candidate_name"
					label="Candidate Name"
					value={item?.candidate_name || ""}
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					name="candidate_email"
					label="Email"
					type="email"
					value={item?.candidate_email || ""}
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					name="candidate_phone"
					label="Phone"
					value={item?.candidate_phone || ""}
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					name="current_location"
					label="Current Location"
					value={item?.current_location || ""}
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					name="current_ctc"
					label="Current CTC"
					type="number"
					value={item?.current_ctc || ""}
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					name="expected_ctc"
					label="Expected CTC"
					type="number"
					value={item?.expected_ctc || ""}
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					name="notice_period"
					label="Notice Period"
					value={item?.notice_period || ""}
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					name="current_company"
					label="Current Company"
					value={item?.current_company || ""}
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					name="experience"
					label="Experience"
					value={item?.experience || ""}
					onChange={handleChange}
					fullWidth
				/>
			</Box>

			{/* Skills */}
			<Box>
				<Typography variant="subtitle1">Skills</Typography>
				<Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
					{item.skills?.map((skill, index) => (
						<Chip
							key={index}
							label={skill}
							onDelete={() => handleArrayChange("skills", null, skill)}
							color="primary"
						/>
					))}
				</Stack>
				<Stack direction="row" spacing={1} alignItems="center" mt={2}>
					<Input
						placeholder="Add skill"
						value={inputValues.skill}
						onChange={(e) =>
							setInputValues((prev) => ({ ...prev, skill: e.target.value }))
						}
					/>
					<IconButton color="primary" onClick={handleSkillAdd}>
						<AddCircleIcon />
					</IconButton>
				</Stack>
			</Box>

			{/* Notable Companies */}
			<Box>
				<Typography variant="subtitle1">Notable Companies</Typography>
				<Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
					{item.notable_company?.map((company, index) => (
						<Chip
							key={index}
							label={company}
							onDelete={() =>
								handleArrayChange("notable_company", null, company)
							}
							color="secondary"
						/>
					))}
				</Stack>
				<Stack direction="row" spacing={1} alignItems="center" mt={2}>
					<Input
						placeholder="Add notable company"
						value={inputValues.company}
						onChange={(e) =>
							setInputValues((prev) => ({ ...prev, company: e.target.value }))
						}
					/>
					<IconButton color="secondary" onClick={handleCompanyAdd}>
						<AddCircleIcon />
					</IconButton>
				</Stack>
			</Box>

			{/* Education Qualifications */}
			<Box>
				<Typography variant="subtitle1">Education Qualifications</Typography>
				{item?.education_qualification?.map((education, index) => (
					<Box
						key={index}
						sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}
					>
						<TextField
							name={`degree_name-${index}`}
							label="Degree Name"
							value={education.degree_name || ""}
							onChange={(e) =>
								handleEducationChange(index, "degree_name", e.target.value)
							}
							fullWidth
						/>
						<TextField
							name={`start_date-${index}`}
							label="Start Date"
							type="date"
							value={education.start_date || ""}
							onChange={(e) =>
								handleEducationChange(index, "start_date", e.target.value)
							}
							InputLabelProps={{ shrink: true }}
							fullWidth
						/>
						<TextField
							name={`end_date-${index}`}
							label="End Date"
							type="date"
							value={education.end_date || ""}
							onChange={(e) =>
								handleEducationChange(index, "end_date", e.target.value)
							}
							InputLabelProps={{ shrink: true }}
							fullWidth
						/>
						<IconButton
							onClick={() => handleRemoveEducation(index)}
							disabled={item.education_qualification.length === 1}
						>
							<DeleteIcon />
						</IconButton>
					</Box>
				))}
				<Button
					variant="contained"
					color="primary"
					onClick={handleAddEducation}
				>
					Add Education
				</Button>
			</Box>

			{/* Save and Clear Buttons */}
			<Box mt={3}>
				<Button
					variant="contained"
					color="primary"
					onClick={onSave}
					style={{ marginRight: "10px" }}
				>
					<SaveIcon /> Save
				</Button>
				<Button variant="contained" color="default" onClick={onClear}>
					<ClearAllIcon /> Clear
				</Button>
			</Box>
		</Box>
	);
};

export default TableForm;
