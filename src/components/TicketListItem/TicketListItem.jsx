import { ListItem, ListItemText } from "@material-ui/core";

function TicketListItem(props) {
	return (
		<ListItem
			button={true}
			onClick={() => {
				console.log(props.ticket);
			}}
		>
			<ListItemText primary={props.ticket.value.name} />
		</ListItem>
	);
}

export { TicketListItem };
