import { Box, Button, CircularProgress, Typography } from "@mui/material";
import AnimateButton from "ui-component/extended/AnimateButton";
import PropTypes from "prop-types";
// import { Settings } from "@mui/icons-material";

const StyledButton = (props) => {
  const { name, label, loading, handleClick, variant, type, width, disabled, sx, icon, height } =
    props;

  const getWidth = (width) => {
    if (width === "fullWidth") return "100%";
    else return width;

  }
  const getHeight = (width) => {
    if (width === "fullWidth") return "100%";
    else return width;
  };

  return (
    <Box width={getWidth(width)} height={getHeight(height)} sx={sx} id={`${name}-button-container`}>
      <AnimateButton>
        <Button
          // id={`${name}-${type}-button`}
          disableRipple
          disableElevation
          fullWidth
          disabled={disabled || loading}
          aria-label={name}
          size="large"
          type={type}
          variant={variant === "primary" ? "contained" : "outlined"}
          color={variant === "danger" ? 'error' : 'primary'}
          onClick={handleClick}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', columnGap: 1 }}>
            {icon ? icon : ''}
            {loading ? <CircularProgress size={17} /> : (typeof (label) === 'string' ?
              <Typography sx={{ fontSize: '16px', fontWeight: '600',
              color: `${variant !== "danger" && variant !== "secondary" ? '#000' : `inherit`}` }}>{label}</Typography> : label)
            }
          </Box>
        </Button>
      </AnimateButton>
    </Box>
  );

};

StyledButton.defaultProps = {
  label: "",
  loading: false,
  handleClick: () => undefined,
  variant: "primary",
  type: "submit",
  width: "fullWidth",
  height: "fullHeight",
  sx: {},
  name: ''

};

StyledButton.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]).isRequired,
  handleClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  type: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sx: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.object]),
};

export default StyledButton;
