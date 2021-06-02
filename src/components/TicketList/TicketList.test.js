import { render, screen } from "@testing-library/react";
import { TicketList } from "./TicketList";

test("Should render list on screen.", () => {
	render(<TicketList tickets={[]} />);
	const list = screen.getByTestId("ticket-list");
	expect(list).toBeInTheDocument();
	expect(list.children.length).toEqual(0);
});
