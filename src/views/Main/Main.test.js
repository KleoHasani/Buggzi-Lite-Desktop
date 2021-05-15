import { render, screen } from "@testing-library/react";
import { Main } from "./Main";

test("Should render main view on screen.", () => {
	render(<Main projects={[]} />);
	const projectTitle = screen.getByText("Projects");
	const projectsList = screen.getByRole("list");
	const btnNew = screen.getByText("New");
	const btnLoad = screen.getByText("Load");
	expect(projectTitle).toBeInTheDocument();
	expect(projectsList).toBeInTheDocument();
	expect(btnNew).toBeInTheDocument();
	expect(btnLoad).toBeInTheDocument();
});
