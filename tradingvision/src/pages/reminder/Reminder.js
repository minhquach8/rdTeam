import React, { useState, useEffect } from "react";
import ReminderInfo from "../../components/reminder/ReminderInfo";
import ReminderEmpty from "../../components/reminder/ReminderEmpty";
import axios from "axios";
import Login from "../login/Login";
import useStyles from "./style";
import {CircularProgress} from '@material-ui/core'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Reminder = ({ user }) => {
	const [reminders, setReminders] = useState([]);
	const [loading, setLoading] = useState(true);
	const classes = useStyles();

	useEffect(() => {
		// retrieveReminders();

		getReminders()

	}, []);

	const getReminders = () => {
		axios.get(`/api/reminders`).then((response) => {
			setReminders(response.data.reminder);
			setLoading(false)
		});
	}

	return (
		<div>
			{user ? (
				<>
				{loading ? (
					<div className={classes.loading_spinner}>
						<CircularProgress style={{ backgroundColor: "primary" }}/>
						</div>
				):(
					<>
						{reminders.length === 0 ? (
							<ReminderEmpty reminders={reminders} 
										setReminders ={setReminders}
										getReminders ={getReminders}/>
						) : (
							<ReminderInfo reminders={reminders} 
										setReminders ={setReminders}
										getReminders ={getReminders}
							/>
						)}

					</>
				)}
				</>
			) : (
				<Login />
			)}
		</div>
	);
};

export default Reminder;
