import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Button, CircularProgress
} from "@mui/material";
import PropTypes from "prop-types";

const ConfirmDialog = (props) => {
    
    const { name, open, title, content, loading, handleClose, handleSubmit } = props;

    return (
        <Dialog
            id={`${name}-confirm-dialog`}
            open={open}
            onClose={handleClose}
            aria-labelledby={`${name}-confirm-dialog-title`}
            aria-describedby={`${name}-confirm-dialog-description`}
        >
            <DialogTitle sx={{padding: 3, paddingBottom: 2}} fontSize={18} id={`${name}-confirm-dialog-title`}>
                {title}
            </DialogTitle>
            {content && <DialogContent sx={{padding: 3}}>
                <DialogContentText fontSize={16} id={`${name}-confirm-dialog-description`}>
                    {content}
                </DialogContentText>
            </DialogContent>}
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleSubmit} autoFocus>
                    {loading ? <CircularProgress size={16}/> : 'Yes'}
                </Button>
            </DialogActions>
        </Dialog>   
    )
}

ConfirmDialog.defaultProps = {
    open: false,
    title: '',
    content: '',
    loading: false,
    handleClose: () => undefined,
    handleSubmit: () => undefined,
}

ConfirmDialog.propTypes = {
    name: PropTypes.string.isRequired,
    open: PropTypes.bool,
    loading: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func
}

export default ConfirmDialog;