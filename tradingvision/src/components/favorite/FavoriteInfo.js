import React, { useState, useEffect } from "react";
import {
	createTheme,
	ThemeProvider,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	Container,
	TablePagination,
} from "@material-ui/core";
import useStyles from "./style";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteDelete from "./FavoriteDelete";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



const darkTheme = createTheme({
	palette: {
		primary: {
			main: "#fff",
		},
		type: "dark",
		fontFamily: "Montserrat",
	},
});

const FavoriteInfo = (props) => {
	const classes = useStyles();
	const history = useNavigate();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	// Delete modal
	const [selectedRow, setSelectedRow] = useState();
	const [openDelete, setOpenDelete] = useState(false);
	const [loading, setLoading] = useState(true)
	const handleOpenDelete = (row) => {
		setSelectedRow(row);
		setOpenDelete(true);
	};
	const handleCloseDelete = () => {
		setOpenDelete(false);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};



	const navigatePage = (row_ticker) => {
		history(`/stocks/${row_ticker}`);
	};
	// const [favorites, setFavorite] = useState([])

	// useEffect(() =>{
	// 	// getFavorite();
	 
	// 	axios.get(`/api/favorites`)
	// 		.then((response) =>{
	// 		  setFavorite(response.data.favorites)
	// 		  setLoading(false)
	// 		});
	//   },[])


	//toast + del fav 
	const [status, setStatus] = useState([])

	const deleteFavoriteStock = async(row) => {
		axios.delete(`/api/favorites/`+ row)
		.then((res) => setStatus(res.data))
	
		await toast.success("Successfully deleted from your favorites!", 
		{autoClose: 2000, 
		  transition: Slide,
		  position:"bottom-left",
		  });

		  axios.get(`/api/favorites/`)
		  .then((res) => props.setFavorite(res.data.favorites))
	  }


	  const rows = props.favorites.map((favorite) => {
		return {
			companyId: favorite.CompanyId,
			ticker: favorite.Ticker,
			stockTicker: favorite.Ticker[0].Ticker,
		};
	});
	  
	return (
		
		<Container>
			<ThemeProvider theme={darkTheme}>
				<TableContainer
					className={classes.tableContainer}
					component={Paper}
				>
					<Table stickyHeader aria-label="sticky table">
						<TableHead
							className={classes.tablehead}
							rowCount={rows.length}
						>
							<TableRow>
								{[
									"TICKER",
									"CEILING",
									"FLOOR",
									"HIGHEST",
									"LOWEST",
									"MATCH",
									"VOLUME",
									"ACTION",
								].map((head) => (
									<TableCell
										className={classes.tablecell}
										key={head}
										align={
											head === "TICKER" ? "" : "center"
										}
									>
										{head}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{rows
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row) => (
									<TableRow
										className={classes.row}
										key={row.ticker[0].Ticker}
									>
										<TableCell
											component="th"
											scope="row"
											style={{
												fontWeight: "bold",
											}}
											className={classes.cell}
											onClick={() => {
												navigatePage(row.stockTicker);
											}}
										>
											{row.ticker[0].Ticker}
										</TableCell>

										<TableCell
											align="center"
											className={classes.cell}
											onClick={() => {
												navigatePage(row.stockTicker);
											}}
										>
											{row.ticker[0].Ceiling}
										</TableCell>
										<TableCell
											align="center"
											className={classes.cell}
											onClick={() => {
												navigatePage(row.stockTicker);
											}}
										>
											{row.ticker[0].Floor}
										</TableCell>
										<TableCell
											align="center"
											className={classes.cell}
											onClick={() => {
												navigatePage(row.stockTicker);
											}}
										>
											{row.ticker[0].Highest}
										</TableCell>
										<TableCell
											align="center"
											className={classes.cell}
											onClick={() => {
												navigatePage(row.stockTicker);
											}}
										>
											{row.ticker[0].Lowest}
										</TableCell>
										<TableCell
											align="center"
											className={classes.cell}
											onClick={() => {
												navigatePage(row.stockTicker);
											}}
										>
											{row.ticker[0].Volume}
										</TableCell>
										<TableCell
											align="center"
											className={classes.cell}
											onClick={() => {
												navigatePage(row.stockTicker);
											}}
										>
											{row.ticker[0].Match}
										</TableCell>
										<TableCell
											align="center"
											className={classes.cell}
										>
											<DeleteIcon
												style={{ marginLeft: "10%" }}
												onClick={() =>
													handleOpenDelete(row)
												}
											/>
										</TableCell>
										<FavoriteDelete
											open={openDelete}
											onClose={handleCloseDelete}
											rowID={
												(selectedRow || {}).companyId
											}
											ticker={
												(selectedRow || {}).stockTicker
											}
											deleteFavoriteStock = {deleteFavoriteStock}
										/>
										<ToastContainer className={classes.toast} 
											toastStyle={{ color:"#000" }}
											pauseOnVisibilityChange={false}
											/>
									</TableRow>
								))}
						</TableBody>
					</Table>

					<TablePagination
						className={classes.pagination}
						rowsPerPageOptions={[5, 10, 25, 100]}
						component="div"
						count={rows.length}
						page={page}
						onPageChange={handleChangePage}
						rowsPerPage={rowsPerPage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</TableContainer>
			</ThemeProvider>
		</Container>
	);
};

export default FavoriteInfo;
