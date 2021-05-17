import { useMemo, useState, useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Main } from "./views/Main/Main";

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

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Route path="/" exact>
					<Main projects={projects} />
				</Route>
			</Router>
		</ThemeProvider>
	);
}

export { App };
