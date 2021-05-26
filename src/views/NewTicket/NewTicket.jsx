import { Grid, TextField, MenuItem, Button } from "@material-ui/core";

function NewTicket(props) {
	return (
		<Grid container direction="column" justify="center" alignItems="center" alignContent="center">
			<Grid container direction="column" style={{ maxWidth: "30em", margin: "1em" }}>
				<TextField id="name" label="Name" inputProps={{ maxLength: 30 }} />
				<TextField
					id="status"
					select
					label="Status"
					onChange={(e) => {
						console.log(e.target.value);
					}}
					helperText="Select ticket type."
				>
					<MenuItem value="ticket">Ticket</MenuItem>
					<MenuItem value="bug">Bug</MenuItem>
					<MenuItem value="todo">ToDo</MenuItem>
				</TextField>
				<TextField
					id="type"
					select
					label="Type"
					onChange={(e) => {
						console.log(e.target.value);
					}}
					helperText="Select ticket type."
				>
					<MenuItem value="ticket">Ticket</MenuItem>
					<MenuItem value="inprogress">In-Progress</MenuItem>
					<MenuItem value="completed">Completed</MenuItem>
				</TextField>
				<TextField
					id="priority"
					select
					label="Priority"
					onChange={(e) => {
						console.log(e.target.value);
					}}
					helperText="Select ticket type."
				>
					<MenuItem value="low">Low</MenuItem>
					<MenuItem value="medium">Medium</MenuItem>
					<MenuItem value="high">High</MenuItem>
				</TextField>
				<TextField
					id="outlined-multiline-static"
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
			<Grid
				container
				direction="row"
				justify="space-evenly"
				alignItems="center"
				style={{ maxWidth: "30em", marginTop: "2em" }}
			>
				<Button color="primary" variant="contained" style={{ minWidth: "10em" }}>
					Add
				</Button>
				<Button color="secondary" variant="outlined" style={{ minWidth: "10em" }}>
					Cancel
				</Button>
			</Grid>
		</Grid>
	);
}

export { NewTicket };
