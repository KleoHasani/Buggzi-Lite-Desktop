import React from "react";
import { useHistory } from "react-router-dom";

import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

function ProjectListItem(props) {
	const history = useHistory();

	const openProject = () => {
		history.push(`/dashboard/${props.project.key}`);
	};

	return (
		<ListItem button={true} disabled={!props.project.value.exists} onClick={openProject}>
			<ListItemText primary={props.project.value.name} secondary={props.project.value.path} />
			<ListItemSecondaryAction>
				<IconButton edge="end" aria-label="delete" onClick={() => props.removeProject(props.project.key)}>
					<Delete />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
}

export { ProjectListItem };
