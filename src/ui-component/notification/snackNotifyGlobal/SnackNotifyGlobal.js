import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// **********************| IMPORT CLEAR ERROR |*****************************

import { clearErrorChange } from 'store/types/changePasswordTypes';
import { clearErrorFields } from 'store/types/fieldsTypes';
import { clearErrorFriends } from 'store/types/friendsTypes';
import { clearErrorRecover } from 'store/types/recoverTypes';
import { clearErrorReset } from 'store/types/resetTypes';
import { clearErrorSearch } from 'store/types/searchTypes';
import { clearErrorUser } from 'store/types/userTypes';
import { clearErrorMatches } from 'store/types/matchesTypes';
import { clearErrorTicket } from 'store/types/ticketTypes';
import { clearErrorCreateMatch } from 'store/types/createMatchTypes';
import { clearPaymentError } from 'store/types/paymentTypes';

// **********************| IMPORT ASSETS |*****************************

import SnackNotify from '../snackNotify';
import { Stack } from '@mui/material';
import { clearErrorInvite } from 'store/types/invitePlayerTypes';

const SnackNotifyGlobal = () => {

    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const handleErrors = (obj) => {
        const temp = [];
        const keys = Object.keys(obj);
        for (let i = 0; i<keys.length; i++){
            const stateObj = obj[keys[i]];
            stateObj?.error?.message?.length && temp.push(keys[i]);
        }
        setErrors(temp)
    }

    const state = useSelector(state => state);

    const handleClear = (location) => {
        switch (location) {
            case 'playerState':
                dispatch(clearErrorUser());
                break;
            case 'resetState':
                dispatch(clearErrorReset());
                break;
            case 'recoverState':
                dispatch(clearErrorRecover());
                break;
            case 'changeState':
                dispatch(clearErrorChange());
                break;
            case 'fieldsState':
                dispatch(clearErrorFields());
                break;
            case 'matchesState':
                dispatch(clearErrorMatches());
                break;
            case 'friendsState':
                dispatch(clearErrorFriends());
                break;
            case 'searchState':
                dispatch(clearErrorSearch());
                break;
            case 'ticketState':
                dispatch(clearErrorTicket());
                break;
            case 'createState':
                dispatch(clearErrorCreateMatch());
                break;
            case 'paymentState':
                dispatch(clearPaymentError());
                break;
            case 'invitationState':
                dispatch(clearErrorInvite());
                break;
            default:
                console.log('invalid case');
        }
    }

    useEffect(() => {
        handleErrors(state)
    }, [state])

    return (
        <>
            <Stack>
            {errors?.map((key, index)=>{
                const stateObj = state[key]?.error;
                return <SnackNotify
                    key={key}
                    open={Boolean(stateObj?.message?.length)}
                    message={stateObj?.message}
                    isError={stateObj?.status}
                    onClose={() => handleClear(key)}
                    autoHide={stateObj?.status ? 4000 : 2500}
                />})}
            </Stack>
        </>
    )
}

export default SnackNotifyGlobal;