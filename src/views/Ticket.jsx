import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, TextField, Button } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";

import { SubmitButton } from "../components/SubmitButton/SubmitButton";

const statusOptions = [
	{ name: "Ticket", value: "ticket" },
	{ name: "In-Progress", value: "inprogress" },
	{ name: "Completed", value: "completed" },
];

const typeOptions = [
	{ name: "To-Do", value: "todo" },
	{ name: "Bug", value: "bug" },
];

const priorityOptions = [
	{ name: "Low", value: "low" },
	{ name: "Medium", value: "medium" },
	{ name: "High", value: "high" },
];

function Ticket(props) {
	const history = useHistory();
	const { ticketKey } = useParams();

	// Field state
	const [name, setName] = useState("");
	const [status, setStatus] = useState(statusOptions[0].value);
	const [type, setType] = useState(typeOptions[0].value);
	const [priority, setPriority] = useState(priorityOptions[0].value);
	const [notes, setNotes] = useState("");

	useEffect(() => {
		const _load = () => {
			window.electron.ipcSend("ticket:view", { key: ticketKey });
			window.electron.ipcOnce("ticket:data", (e, data) => {
				setName(data.ticket.value.name);
				setStatus(data.ticket.value.status);
				setType(data.ticket.value.type);
				setPriority(data.ticket.value.priority);
				setNotes(data.ticket.value.notes);
			});
		};

		if (ticketKey) _load();
	}, [ticketKey]);

	/**
	 * Handle Cancle button click
	 */
	const handleCancel = () => {
		history.goBack();
	};

	/**
	 * Handle updates to form fields
	 * @param {object} e
	 * @param {SetStateAction} stateModifier
	 */
	const handleChange = (e, stateModifier) => {
		stateModifier(e.target.value);
	};

	/**
	 * Handle Add
	 */
	const handleAdd = () => {
		window.electron.ipcSend("ticket:create", {
			name,
			status,
			type,
			priority,
			notes,
		});
		history.goBack();
	};

	/**
	 * Handle Update
	 */
	const handleUpdate = () => {
		window.electron.ipcSend("ticket:update", { key: ticketKey, name, status, type, priority, notes });
		history.goBack();
	};

	const handleDelete = () => {
		window.electron.ipcSend("ticket:delete", { key: ticketKey });
		history.goBack();
	};

	return (
		<Grid container direction="column" alignItems="center">
			<form autoComplete="off" style={{ maxWidth: "400px", margin: "1em" }}>
				<Grid container direction="column" style={{ minWidth: "400px" }}>
					<TextField
						id="name"
						label="Name"
						inputProps={{ maxLength: "50em" }}
						value={name}
						onChange={(e) => handleChange(e, setName)}
					/>
					<TextField
						id="status"
						select
						label="Status"
						helperText="Select ticket status."
						SelectProps={{
							native: true,
						}}
						value={status}
						onChange={(e) => handleChange(e, setStatus)}
					>
						{statusOptions.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.name}
							</option>
						))}
					</TextField>
					<TextField
						id="type"
						select
						label="Type"
						helperText="Select ticket type."
						SelectProps={{
							native: true,
						}}
						value={type}
						onChange={(e) => handleChange(e, setType)}
					>
						{typeOptions.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.name}
							</option>
						))}
					</TextField>
					<TextField
						id="priority"
						select
						label="Priority"
						helperText="Select ticket priority."
						SelectProps={{
							native: true,
						}}
						value={priority}
						onChange={(e) => handleChange(e, setPriority)}
					>
						{priorityOptions.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.name}
							</option>
						))}
					</TextField>
					<TextField
						id="notes"
						label="Notes"
						multiline
						rows={8}
						spellCheck
						placeholder="Write your notes here..."
						inputProps={{ maxLength: 500 }}
						variant="outlined"
						style={{ marginTop: "1em" }}
						value={notes}
						onChange={(e) => handleChange(e, setNotes)}
					/>
				</Grid>
				<Grid container direction="row" justify="space-evenly" style={{ marginTop: "2em" }}>
					{ticketKey ? (
						<div>
							<Button
								type="submit"
								color="primary"
								variant="contained"
								style={{ minWidth: "100px" }}
								onClick={handleUpdate}
							>
								Update
							</Button>
							<Button color="secondary" variant="outlined" style={{ margin: "0em 1em" }} onClick={handleDelete}>
								<DeleteOutline />
							</Button>
						</div>
					) : (
						<Button type="submit" color="primary" variant="contained" style={{ minWidth: "100px" }} onClick={handleAdd}>
							Add
						</Button>
					)}
					<Button variant="outlined" style={{ minWidth: "100px" }} onClick={handleCancel}>
						Cancel
					</Button>
				</Grid>
			</form>
		</Grid>
	);
}

export { Ticket };
