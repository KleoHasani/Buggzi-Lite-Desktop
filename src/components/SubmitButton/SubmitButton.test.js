import { render, screen } from "@testing-library/react";
import { SubmitButton } from "./SubmitButton";

test("Should render a submit button.", () => {
	render(<SubmitButton name="Button" />);
	const button = screen.getByRole("button");
	expect(button).toBeInTheDocument();
	expect(button.textContent).toBe("Button");
	expect(button.attributes.getNamedItem("type").value).toBe("submit");
});
