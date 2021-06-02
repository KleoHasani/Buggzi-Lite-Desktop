import { Button } from "@material-ui/core";

function SubmitButton(props) {
	return (
		<Button type="submit" color="primary" variant="contained" style={{ minWidth: "100px" }} onClick={props.handleClick}>
			{props.name}
		</Button>
	);
}

export { SubmitButton };
