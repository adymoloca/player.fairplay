import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, CircularProgress, Slide, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import StyledButton from 'ui-component/button/button';
import { useTheme } from '@mui/styles';

// translation
import { useTranslation } from 'react-i18next';

const ConfirmDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const ConfirmDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose && (
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}>
                    <CloseIcon />
                </IconButton>
            )}
        </DialogTitle>
    );
};

ConfirmDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const CustomModal = (props) => {
    const { buttonTitle, buttonIcon, modalTitle, modalContent, handleSubmit, loading, confirmButtonTitle, buttonWidth, variant, fullWidth} = props;
    const [open, setOpen] = useState(false);
    const intervalRef = useRef(null);
    const [secondsToUnlock, setSecondsToUnlock] = useState(3);
    const theme = useTheme();
    const { t } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSecondsToUnlock(3);
    };

    useEffect(() => {
        if (open) {
            intervalRef.current = setInterval(() => setSecondsToUnlock((prev) => prev - 1), 1000);
        }
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [open]);

    return (
        <div style={{ width: fullWidth && '100%'}}>
            {buttonIcon ? <Tooltip title={buttonTitle}>
                <Button variant={variant || 'outlined'} onClick={handleClickOpen}>
                    {buttonIcon}
                </Button>
            </Tooltip> :
            <StyledButton
                handleClick={() => handleClickOpen()}
                width={buttonWidth}
                label={`${buttonTitle}`}
                name={"button-modal"}
                variant={variant || 'primary'}
            />}
            <ConfirmDialog
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={open}>
                <ConfirmDialogTitle id='customized-dialog-title' onClose={handleClose}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 700, color: `${theme.palette.secondary.dark}` }}> 
                        {modalTitle} 
                    </Typography>
                </ConfirmDialogTitle>
                <DialogContent dividers>
                    {loading === false ? (
                        <Box sx={{ minWidth:{ sm:'100%', md: '400px'}, display: 'flex', alignContent: 'center', p: '20px 0px' }}>
                            {modalContent}
                        </Box>
                    ) : (
                        <Box sx={{ minWidth:{ sm:'100%', md: '400px'}, display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' autoFocus onClick={handleClose}>
                        {t('cancelButton')}
                    </Button>
                    <Button variant='contained' sx={{ width: 'auto', minWidth: '100px', color: '#fff'}} autoFocus disabled={secondsToUnlock > 0} onClick={() => handleSubmit()}>
                        {secondsToUnlock > 0 ? `${secondsToUnlock}` :`${confirmButtonTitle}`}
                    </Button>
                </DialogActions>
            </ConfirmDialog>
        </div>
    );
};

CustomModal.propTypes = {
    buttonTitle: PropTypes.string.isRequired,
    modalTitle: PropTypes.string.isRequired,
    buttonIcon: PropTypes.node,
    modalContent: PropTypes.element.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    confirmButtonTitle: PropTypes.string,
    buttonWidth: PropTypes.string,
    variant: PropTypes.string,
    fullWidth: PropTypes.bool,
};
export default CustomModal;
