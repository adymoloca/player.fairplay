import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { Divider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: "10px",
	boxShadow: 24,
	p: 4,
};

const BasicModal = (props) => {
	const { open, setOpen, title, content } = props;

	const theme = useTheme();
	const matchDown = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<div>
			<Modal
				open={open}
				onClose={setOpen}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={[style, matchDown && {width: '100%'}]}>
					<Typography fontSize={"20px"} fontWeight={"500"}>
						{title}
					</Typography>
					<Divider/>
					{content}
				</Box>
			</Modal>
		</div>
	);
};
BasicModal.defaultProps = {
	open: false,
	title: "",
	content: <div></div>,
	loading: false,
	handleClose: () => undefined,
	handleSubmit: () => undefined,
};

BasicModal.propTypes = {
	name: PropTypes.string,
	open: PropTypes.bool,
	loading: PropTypes.bool,
	title: PropTypes.string,
	content: PropTypes.object,
	handleClose: PropTypes.func,
	handleSubmit: PropTypes.func,
};

export default BasicModal;
