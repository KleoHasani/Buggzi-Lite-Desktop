import { List } from "@material-ui/core";
import { ProjectListItem } from "../ProjectListItem/ProjectListItem";

function ProjectList(props) {
	return (
		<List id="project-list">
			{props.projects.map((project, index) => (
				<ProjectListItem key={index} project={project}></ProjectListItem>
			))}
		</List>
	);
}

export { ProjectList };