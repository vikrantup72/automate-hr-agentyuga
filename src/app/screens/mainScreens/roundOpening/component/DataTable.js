import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
const DataTable = ({
	rows,
	page,
	rowsPerPage,
	handleEditRow,
	handleDeleteRow,
	handleChangePage,
	handleChangeRowsPerPage,
	handleSelectChange,
}) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [menuIndex, setMenuIndex] = React.useState(null);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [selectedRow, setSelectedRow] = React.useState(null);

	const handleMenuOpen = (event, index) => {
		setAnchorEl(event.currentTarget);
		setMenuIndex(index);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setMenuIndex(null);
	};

	const handleDialogOpen = (row) => {
		setSelectedRow(row);
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
		setSelectedRow(null);
	};

	const isMenuOpen = Boolean(anchorEl);

	return (
		<>
			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 650 }}
					size="small"
					aria-label="round opening table"
				>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#2c5da7" }}>
							<TableCell
								sx={{ fontWeight: "bold", color: "#fff", borderBottom: "none" }}
							>
								Department
							</TableCell>
							<TableCell
								sx={{ fontWeight: "bold", color: "#fff", borderBottom: "none" }}
								align="right"
							>
								Sub-Department
							</TableCell>
							<TableCell
								sx={{ fontWeight: "bold", color: "#fff", borderBottom: "none" }}
								align="right"
							>
								Role Name
							</TableCell>
							<TableCell
								sx={{ fontWeight: "bold", color: "#fff", borderBottom: "none" }}
								align="right"
							>
								Rounds
							</TableCell>
							<TableCell
								sx={{ fontWeight: "bold", color: "#fff", borderBottom: "none" }}
								align="right"
							>
								Status
							</TableCell>
							<TableCell
								sx={{ fontWeight: "bold", color: "#fff", borderBottom: "none" }}
								align="right"
							>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => (
								<TableRow
									key={row.id}
									sx={{
										backgroundColor: index % 2 === 0 ? "#f7f8fd" : "#fff",
										"&:hover": {
											backgroundColor: "#e9f1ff",
										},
									}}
								>
									<TableCell component="th" scope="row">
										{row.department}
									</TableCell>
									<TableCell align="right">{row.subDepartment}</TableCell>
									<TableCell align="right">{row.roleName}</TableCell>
									<TableCell align="right">
										{row.rounds.length} Rounds (
										{row.rounds.map((r) => r.type).join(", ")})
										<IconButton
											aria-label="details"
											onClick={() => handleDialogOpen(row)}
										>
											{/* Replace this with an appropriate icon */}
											<FullscreenIcon />
										</IconButton>
									</TableCell>
									<TableCell align="right">
										<select
											value={row.status}
											onChange={(e) => handleSelectChange(e, index)}
											style={{
												backgroundColor: "#fff",
												border: `1px solid #2c5da7`,
												borderRadius: "4px",
											}}
										>
											<option value="active">Active</option>
											<option value="deactive">Deactive</option>
										</select>
									</TableCell>
									<TableCell align="right">
										<IconButton
											aria-label="more"
											aria-controls={`menu-${index}`}
											aria-haspopup="true"
											onClick={(e) => handleMenuOpen(e, index)}
										>
											<MoreVertIcon />
										</IconButton>
										<Menu
											id={`menu-${index}`}
											anchorEl={anchorEl}
											open={isMenuOpen && menuIndex === index}
											onClose={handleMenuClose}
											anchorOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											transformOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
										>
											<MenuItem
												onClick={() => {
													handleEditRow(index);
													handleMenuClose();
												}}
											>
												Edit
											</MenuItem>
											<MenuItem
												onClick={() => {
													handleDeleteRow(index);
													handleMenuClose();
												}}
											>
												Delete
											</MenuItem>
										</Menu>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>

			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				sx={{
					backgroundColor: "#f7f8fd",
					color: "#2c5da7",
				}}
			/>

			<Dialog
				open={dialogOpen}
				onClose={handleDialogClose}
				fullWidth
				maxWidth="md"
			>
				<DialogTitle>
					Round Details
					<IconButton
						aria-label="close"
						onClick={handleDialogClose}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					{selectedRow && (
						<div>
							<h4>{selectedRow.roleName}</h4>
							<p>
								<strong>Department:</strong> {selectedRow.department}
							</p>
							<p>
								<strong>Sub-Department:</strong> {selectedRow.subDepartment}
							</p>
							<p>
								<strong>Status:</strong> {selectedRow.status}
							</p>
							<p>
								<strong>Rounds:</strong>
							</p>
							{selectedRow.rounds.map((round, roundIndex) => (
								<Accordion key={roundIndex} style={{ marginBottom: 10 }}>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls={`panel${roundIndex}-content`}
										id={`panel${roundIndex}-header`}
									>
										<strong>
											{round.round} ({round.type})
										</strong>
									</AccordionSummary>
									<AccordionDetails>
										{round.questions.map((q, qIndex) => (
											<div key={qIndex}>
												<p>
													<strong>Q:</strong> {q.question}
												</p>
												<p>
													<strong>A:</strong> {q.answer}
												</p>
											</div>
										))}
									</AccordionDetails>
								</Accordion>
							))}
						</div>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DataTable;
