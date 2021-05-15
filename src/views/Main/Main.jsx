import { Container, Typography, Button, Grid } from "@material-ui/core";
import { AddCircle, Folder } from "@material-ui/icons";
import { ProjectList } from "../../components/ProjectList/ProjectList";

function Main(props) {
	return (
		<Grid container direction="column" justify="center" alignItems="center" className="fullscreen">
			<Container maxWidth="sm">
				<Typography variant="h5">Projects</Typography>
				<ProjectList projects={props.projects}></ProjectList>
				<Grid container direction="row" justify="space-evenly" alignItems="center">
					<Button variant="contained" color="primary" startIcon={<AddCircle />}>
						New
					</Button>
					<Button variant="contained" color="primary" startIcon={<Folder />}>
						Load
					</Button>
				</Grid>
			</Container>
		</Grid>
	);
}

export { Main };
