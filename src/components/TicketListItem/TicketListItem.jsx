import { ListItem, ListItemText } from "@material-ui/core";

function TicketListItem(props) {
	return (
		<ListItem
			button={true}
			onClick={() => {
				console.log(props.ticket.title);
			}}
		>
			<ListItemText primary={props.ticket.title} />
		</ListItem>
	);
}

export { TicketListItem };
