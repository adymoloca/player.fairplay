import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import PropTypes from 'prop-types'

const CollapseComp = (props) => {
    const {title, collapsedContent} = props;
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Box >
			<Box flexDirection="row" display="flex">
				<Typography fontSize={"16px"} fontWeight={"700"} padding={"10px"}>
					{title}
				</Typography>
				<IconButton
					expand={`${expanded}`}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon sx={{ m: 0, p: 0 }} />
				</IconButton>
			</Box>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box maxWidth={"100%"}>
					{ typeof(collapsedContent) === 'string' ?
						<Typography fontSize={"14px"} padding={"10px"}>
							{collapsedContent}
						</Typography>
					:
						<>{collapsedContent}</>
					}
                </Box>
			</Collapse>
		</Box>
	);
}
CollapseComp.propTypes = {
	title: PropTypes.string,
	collapsedContent: PropTypes.oneOfType([PropTypes.func, PropTypes.object , PropTypes.string])
}
export default CollapseComp;
