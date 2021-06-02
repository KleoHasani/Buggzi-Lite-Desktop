import { render, screen } from "@testing-library/react";
import { TicketListItem } from "./TicketListItem";

test("Should render list item on screen.", () => {
	render(
		<TicketListItem
			ticket={{ key: "000", value: { name: "Ticket", type: "ticket", priority: "low", notes: "Notes" } }}
		/>
	);
	const listitem = screen.getByTestId("ticket-list-item");
	expect(listitem).toBeInTheDocument();
	expect(listitem.textContent).toBe("lowTicket");
});
