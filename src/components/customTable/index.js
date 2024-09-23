import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

const DataTable = ({
	rows,
	handleSelectChange,
	handleEditRow,
	handleDeleteRow,
}) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [menuIndex, setMenuIndex] = React.useState(null);

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
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow sx={{ backgroundColor: "#2c5da7" }}>
							<TableCell
								sx={{ fontWeight: "bold", color: "#fff", borderBottom: "none" }}
							>
								Name
							</TableCell>
							<TableCell
								sx={{ fontWeight: "bold", color: "#fff", borderBottom: "none" }}
								align="right"
							>
								Description
							</TableCell>
							<TableCell
								sx={{ fontWeight: "bold", color: "#fff", borderBottom: "none" }}
								align="right"
							>
								Head
							</TableCell>
							<TableCell
								sx={{ fontWeight: "bold", color: "#fff", borderBottom: "none" }}
								align="right"
							>
								No of SubDepartments
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
						{rows.map((row, index) => (
							<TableRow
								key={row.name}
								sx={{
									backgroundColor: index % 2 === 0 ? "#f7f8fd" : "#fff",
									"&:hover": {
										backgroundColor: "#e9f1ff",
									},
								}}
							>
								<TableCell component="th" scope="row">
									{row.name}
								</TableCell>

								{/* Description with Tooltip */}
								<TableCell align="right">
									<Tooltip title={row.description} placement="top">
										<span>
											{row?.description?.length > 36
												? `${row?.description.slice(0, 36)}...`
												: row?.description}
										</span>
									</Tooltip>
								</TableCell>

								<TableCell align="right">{row.head}</TableCell>
								<TableCell align="right">{row.no_subdepartments}</TableCell>
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
									</Menu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default DataTable;
