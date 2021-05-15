import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { Delete, Refresh } from "@material-ui/icons";

function ProjectListItem(props) {
	return (
		<ListItem button={true} disabled={!props.project.value.exists}>
			<ListItemText primary={props.project.value.name} secondary={props.project.value.path} />
			<ListItemSecondaryAction>
				<IconButton edge="start" aria-label="reload">
					<Refresh />
				</IconButton>
				<IconButton edge="end" aria-label="delete">
					<Delete />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
}

export { ProjectListItem };
