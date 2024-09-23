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
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
const DataTable = ({
	rows,
	page,
	rowsPerPage,
	handleSelectChange,
	handleEditRow,
	handleDeleteRow,
	handleChangePage,
	handleChangeRowsPerPage,
	onViewDetails,
	onAddRole,
}) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [menuIndex, setMenuIndex] = React.useState(null);
	const navigate = useNavigate();
	const handleMenuOpen = (event, index) => {
		setAnchorEl(event.currentTarget);
		setMenuIndex(index);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setMenuIndex(null);
	};

	const isMenuOpen = Boolean(anchorEl);

	return (
		<>
			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 650 }}
					size="small"
					aria-label="role management table"
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
								Salary Range
							</TableCell>
							<TableCell
								sx={{ fontWeight: "bold", color: "#fff", borderBottom: "none" }}
								align="right"
							>
								Level
							</TableCell>
							<TableCell
								sx={{ fontWeight: "bold", color: "#fff", borderBottom: "none" }}
								align="right"
							>
								Work Type
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
										{row.department_name}
									</TableCell>
									<TableCell align="right">{row.subdepartment_name}</TableCell>
									<TableCell align="right">{row.role_name}</TableCell>
									<TableCell align="right">
										{row.salary_min} - {row.salary_max}
									</TableCell>
									<TableCell align="right">{row.level}</TableCell>
									<TableCell align="right">{row.employment_type}</TableCell>
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
											onClick={() => onViewDetails(row?.id)}
										>
											<FullscreenIcon />
										</IconButton>
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
													handleEditRow(row?.id);
													handleMenuClose();
												}}
											>
												Edit
											</MenuItem>
											<MenuItem
												onClick={() => {
													handleDeleteRow(row?.id);
													handleMenuClose();
												}}
											>
												Delete
											</MenuItem>
											<MenuItem
												onClick={() => {
													onAddRole(row?.id);
													handleMenuClose();
												}}
											>
												Add Round
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
				count={rows?.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				sx={{
					backgroundColor: "#f7f8fd",
					color: "#2c5da7",
				}}
			/>
		</>
	);
};

export default DataTable;
