import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { AppBar, Button, Typography, IconButton, Grid } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import { TicketList } from "../../components/TicketList/TicketList";

function Dashboard() {
	const history = useHistory();

	const { projectKey } = useParams();

	const [project, setProject] = useState({
		key: null,
		value: { name: null, path: null, exists: null },
	});

	const [tickets, setTickets] = useState([{ name: null, type: null, priority: null, notes: null }]);
	const [inProgress, setInProgress] = useState([{ name: null, type: null, priority: null, notes: null }]);
	const [completed, setCompleted] = useState([{ name: null, type: null, priority: null, notes: null }]);

	/**
	 * Separate tickets by type to prepare for rendering.
	 * @param {[object]} tickets
	 * @param {string} tickets.name
	 * @param {string} tickets.type
	 * @param {string} tickets.priority
	 * @param {string} tickets.notes
	 */
	const manageTicketsByType = (tickets) => {
		const _tickets = [];
		const _inProgress = [];
		const _completed = [];

		tickets.map((ticket) => {
			switch (ticket.type) {
				case "ticket":
					_tickets.push(ticket);
					break;
				case "inprogress":
					_inProgress.push(ticket);
					break;
				default:
					_completed.push(ticket);
					break;
			}
		});

		setTickets(_tickets);
		setInProgress(_inProgress);
		setCompleted(_completed);
	};

	// load data from main process when project open
	useEffect(() => {
		const _load = () => {
			window.electron.ipcSend("project:open", { key: projectKey });
			window.electron.ipcOnce("project:opened", (e, data) => {
				setProject(data.project);
				manageTicketsByType(data.tickets);
			});
		};
		_load();
	}, [projectKey]);

	const closeProject = () => {
		window.electron.ipcSend("project:close");
		window.electron.ipcOnce("project:closed", () => {
			history.goBack();
		});
	};

	const newTicket = () => {
		history.push("/ticket/new");
	};

	return (
		<Grid container direction="column" justify="center" alignItems="center">
			<AppBar position="relative" style={{ padding: "0.5em 1em" }}>
				<Grid container direction="row" justify="space-between" alignItems="center">
					<IconButton onClick={closeProject}>
						<ArrowBack />
					</IconButton>
					<Typography variant="h6" align="left">
						Dashboard
					</Typography>
					<p>{project.value.path}</p>
					<Button color="inherit" variant="outlined" onClick={newTicket}>
						New Ticket
					</Button>
				</Grid>
			</AppBar>
			<div className="dashboard-body">
				<TicketList title="Tickets" tickets={tickets} />
				<TicketList title="In-Progress" tickets={inProgress} />
				<TicketList title="Completed" tickets={completed} />
			</div>
		</Grid>
	);
}

export { Dashboard };
