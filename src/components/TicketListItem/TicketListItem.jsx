import { ListItem, ListItemAvatar } from "@material-ui/core";
import { FlagOutlined, BugReportOutlined, AssignmentLateOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

function TicketListItem(props) {
	const history = useHistory();

	const setFlagColor = () => {
		switch (props.ticket.value.priority.value) {
			case "high":
				return "error";
			case "medium":
				return "primary";
			default:
				return;
		}
	};

	const viewTicket = () => {
		history.push(`/ticket/view/${props.ticket.key}`);
	};

	return (
		<ListItem button={true} onClick={viewTicket} data-testid="ticket-list-item">
			<ListItemAvatar>
				<div className="priority">
					<FlagOutlined color={setFlagColor()} />
					<small>{props.ticket.value.priority.value}</small>
				</div>
			</ListItemAvatar>
			<p className="list-item-text">{props.ticket.value.name}</p>
			{props.ticket.value.type.value === "todo" ? (
				<AssignmentLateOutlined style={{ margin: "0em 1em" }} />
			) : (
				<BugReportOutlined style={{ margin: "0em 1em" }} />
			)}
		</ListItem>
	);
}

export { TicketListItem };
