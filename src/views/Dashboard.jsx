import React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { AppBar, Button, Typography, IconButton, Grid } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import { TicketList } from "../components/TicketList/TicketList";

function Dashboard() {
	const history = useHistory();

	const { projectKey } = useParams();

	const [project, setProject] = useState({
		key: null,
		value: { name: null, path: null, exists: null },
	});

	const [tickets, setTickets] = useState([]);
	const [inProgress, setInProgress] = useState([]);
	const [completed, setCompleted] = useState([]);

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

		tickets.forEach((ticket) => {
			switch (ticket.value.status) {
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
			console.log("Here");
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
		history.replace("/", null);
	};

	const createTicket = () => {
		history.push(`/dashboard/${projectKey}/ticket/new`, null);
	};

	return (
		<Grid container direction="column" justify="center" alignItems="center">
			<AppBar position="relative" style={{ padding: "0.5em 1em" }}>
				<Grid container direction="row" justify="space-between" alignItems="center">
					<IconButton onClick={closeProject} data-testid="back-button">
						<ArrowBack />
					</IconButton>
					<Typography variant="h6" align="left">
						Dashboard
					</Typography>
					<p data-testid="project-path">{project.value.path}</p>
					<Button color="inherit" variant="outlined" onClick={createTicket}>
						Create Ticket
					</Button>
				</Grid>
			</AppBar>
			<div className="dashboard-body">
				<TicketList title="Tickets" tickets={tickets} projectKey={projectKey} />
				<TicketList title="In-Progress" tickets={inProgress} projectKey={projectKey} />
				<TicketList title="Completed" tickets={completed} projectKey={projectKey} />
			</div>
		</Grid>
	);
}

export { Dashboard };
