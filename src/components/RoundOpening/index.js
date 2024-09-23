import * as React from "react";
import {
	Button,
	TextField,
	Select,
	MenuItem,
	Box,
	Typography,
	Divider,
} from "@mui/material";

const AddRoleTableForm = ({
	item,
	onSave,
	onClear,
	onRoundChange,
	onAddRound,
	onAddQuestion,
	onQuestionChange,
	onRemoveRound,
	onRemoveQuestion,
}) => {
	return (
		<Box sx={{ padding: 3, display: "flex", flexDirection: "column", gap: 3 }}>
			<Typography variant="h5" gutterBottom>
				Add Round Form
			</Typography>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
					gap: 2,
				}}
			>
				<TextField
					label="Department Name"
					value={item.department_name}
					disabled
					fullWidth
					sx={{ mb: 2 }}
				/>

				<TextField
					label="SubDepartment Name"
					value={item.subdepartment_name}
					disabled
					fullWidth
					sx={{ mb: 2 }}
				/>
				<TextField
					label="Role Name"
					value={item.role_name}
					disabled
					fullWidth
					sx={{ mb: 2 }}
				/>
			</Box>

			<Divider sx={{ my: 3 }} />

			{item?.rounds?.map((round, roundIndex) => (
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
						{item.rounds.length > 1 && (
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
				<Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
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

export default AddRoleTableForm;
