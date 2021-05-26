import { useMemo, useState, useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Main } from "./views/Main/Main";
import { Dashboard } from "./views/Dashboard/Dashboard";
import { NewTicket } from "./views/NewTicket/NewTicket";

function App() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? "dark" : "light",
				},
			}),
		[prefersDarkMode]
	);

	const [projects, setProjects] = useState([]);

	// load data from main process
	useEffect(() => {
		const _load = () => {
			window.electron.ipcSend("render:ready");
			window.electron.ipcOnce("data:load", (e, data) => {
				setProjects(data.projects);
			});
		};
		_load();
	}, []);

	const newProject = () => {
		window.electron.ipcSend("project:new");
		window.electron.ipcOnce("project:created", (e, data) => {
			setProjects(data.projects);
		});
	};

	const loadProject = () => {
		window.electron.ipcSend("project:load");
		window.electron.ipcOnce("project:loaded", (e, data) => {
			setProjects(data.projects);
		});
	};

	const removeProject = (key) => {
		window.electron.ipcSend("project:remove", { key });
		window.electron.ipcOnce("project:removed", (e, data) => {
			setProjects(data.projects);
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Route path="/" exact>
					<Main
						projects={projects}
						newProject={newProject}
						loadProject={loadProject}
						removeProject={removeProject}
					/>
				</Route>
				<Route path="/dashboard/:projectKey" exact>
					<Dashboard />
				</Route>
				<Route path="/ticket/new" exact>
					<NewTicket />
				</Route>
				<Route path="/ticket/view/:ticketKey" exact>
					<p>Hello</p>
				</Route>
			</Router>
		</ThemeProvider>
	);
}

export { App };
