import { render, screen } from "@testing-library/react";
import { ProjectList } from "./ProjectList";

test("Should render list on screen.", () => {
	render(<ProjectList projects={[]} />);
	const list = screen.getByRole("list");
	expect(list).toBeInTheDocument();
	expect(list.children.length).toEqual(0);
});
