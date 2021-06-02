import { Typography } from "@material-ui/core";

import { TicketListItem } from "../TicketListItem/TicketListItem";

function TicketList(props) {
	return (
		<div>
			<Typography variant="h6" align="center" color="secondary">
				{props.title}
			</Typography>
			<div id="ticket-list" data-testid="ticket-list">
				{props.tickets.map((ticket, index) => (
					<TicketListItem key={index} ticket={ticket} />
				))}
			</div>
		</div>
	);
}

export { TicketList };
