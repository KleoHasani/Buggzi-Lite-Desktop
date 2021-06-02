import { render, screen } from "@testing-library/react";
import { ProjectListItem } from "./ProjectListItem";

test("Should render enabled list item on screen.", () => {
	render(<ProjectListItem project={{ key: "000", value: { name: "Item", path: "/path", exists: true } }} />);
	const listitem = screen.getByRole("listitem");
	expect(listitem).toBeInTheDocument();
	expect(listitem.children[0].classList.contains("Mui-disabled")).toBe(false);
	expect(listitem.textContent).toBe("Item/path");
	const btnDelete = screen.getByLabelText("delete");
	expect(btnDelete).toBeInTheDocument();
});

test("Should render disabled list item on screen.", () => {
	render(<ProjectListItem project={{ key: "000", value: { name: "Item", path: "/path", exists: false } }} />);
	const listitem = screen.getByRole("listitem");
	expect(listitem).toBeInTheDocument();
	expect(listitem.children[0].classList.contains("Mui-disabled")).toBe(true);
	expect(listitem.textContent).toBe("Item/path");
	const btnDelete = screen.getByLabelText("delete");
	expect(btnDelete).toBeInTheDocument();
});
