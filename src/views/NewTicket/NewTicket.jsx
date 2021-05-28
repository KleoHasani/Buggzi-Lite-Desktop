import { useHistory } from "react-router-dom";
import { Grid, TextField, Button } from "@material-ui/core";

function NewTicket(props) {
	const history = useHistory();

	const handleCancel = () => {
		history.goBack();
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const { name, status, type, priority, notes } = e.target;

		window.electron.ipcSend("ticket:create", {
			name: name.value,
			status: status.value,
			type: type.value,
			priority: priority.value,
			notes: notes.value,
		});

		window.electron.ipcOnce("ticket:created", () => {
			history.goBack();
		});
	};

	return (
		<Grid container direction="column" alignItems="center">
			<form autoComplete="off" style={{ maxWidth: "400px", margin: "1em" }} onSubmit={(e) => handleSubmit(e)}>
				<Grid container direction="column" style={{ minWidth: "400px" }}>
					<TextField id="name" label="Name" inputProps={{ maxLength: "50em" }} />
					<TextField
						id="status"
						select
						label="Status"
						helperText="Select ticket status."
						SelectProps={{
							native: true,
						}}
					>
						<option key="ticket" value="ticket">
							Ticket
						</option>
						<option key="inprogress" value="inprogress">
							In-Progress
						</option>
						<option key="completed" value="completed">
							Completed
						</option>
					</TextField>
					<TextField
						id="type"
						select
						label="Type"
						helperText="Select ticket type."
						SelectProps={{
							native: true,
						}}
					>
						<option key="todo" value="todo">
							To-Do
						</option>
						<option key="bug" value="bug">
							Bug
						</option>
					</TextField>
					<TextField
						id="priority"
						select
						label="Priority"
						helperText="Select ticket priority."
						SelectProps={{
							native: true,
						}}
					>
						<option key="low" value="low">
							Low
						</option>
						<option key="medium" value="medium">
							Medium
						</option>
						<option key="high" value="high">
							High
						</option>
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
					/>
				</Grid>
				<Grid container direction="row" justify="space-evenly" style={{ marginTop: "2em" }}>
					<Button type="submit" color="primary" variant="contained" style={{ minWidth: "160px" }}>
						Add
					</Button>
					<Button color="secondary" variant="outlined" style={{ minWidth: "160px" }} onClick={handleCancel}>
						Cancel
					</Button>
				</Grid>
			</form>
		</Grid>
	);
}

export { NewTicket };
