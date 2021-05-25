import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AppBar, Button, Typography, IconButton, Grid } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import { TicketList } from "../../components/TicketList/TicketList";

function Dashboard() {
	const { projectKey } = useParams();

	const [projectData, setProjectData] = useState({
		key: null,
		value: { name: null, path: null, exists: null },
	});

	const [tickets, setTickets] = useState([]);

	const [inProgress, setInProgress] = useState([]);

	const [completed, setCompleted] = useState([]);

	// load data from main process when project open
	useEffect(() => {
		const _load = () => {
			window.electron.ipcSend("project:open", { key: projectKey });
			window.electron.ipcOnce("project:opened", (e, data) => {
				setProjectData(data.project);
			});
		};
		_load();
	}, []);

	return (
		<Grid container direction="column" justify="center" alignItems="center">
			<AppBar position="relative" style={{ padding: "0.5em 1em" }}>
				<Grid container direction="row" justify="space-between" alignItems="center">
					<IconButton>
						<ArrowBack />
					</IconButton>
					<Typography variant="h6" align="left">
						Dashboard
					</Typography>
					<p>{projectData.value.path}</p>
					<Button color="inherit" variant="outlined">
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
