import { requestAdmin, requestToken } from "utils/axios/axios-config";
import { loginRequest, loginSuccess, loginFailure, registerRequest, registerSuccess, registerFailure, 
        updatePlayerRequest, updatePlayerSuccess, updatePlayerFailure, 
        activateRequest, activateSuccess, activateFailure, 
        refreshTokenRequest, refreshTokenSuccess, refreshTokenFailure 
} from "store/types/userTypes";

export const login = (data) => {
    return (dispatch) => {
        dispatch(loginRequest())
        requestAdmin.post('login', data).then((res) => {
            const data = res?.data;
            dispatch(loginSuccess(data));
        }).catch((err) => {
            const error = err?.response?.data;
            dispatch(loginFailure(error));
        })
    }
}

export const register = (data, setClear = () => undefined) => {
    const { submit, ...others } = data;
    return (dispatch) => {
        dispatch(registerRequest())
        requestAdmin.post('register', others).then((res) => {
            const data = res?.data;
            dispatch(registerSuccess(data))
        }).catch((err) => {
            const error = err?.response?.data;
            dispatch(registerFailure(error))
        }).finally(() => {
            setClear();
        })
    }
} 

export const updatePlayer = (data, onFinish = () => undefined) => {
    const { _id, __v, updatedAt, createdAt, location, activationCode, cards, favouriteFriends, gameplayHours,
        isBlocked, isActivated, matchInvitation, matchInvitationReceivedFrom, matchInvitationSentTo, matches, 
        recoveryAccess, recoveryCode, coins, friends, friendRequests, receivedFrom, sentTo, ...payload } = data;
    return (dispatch) => {
        dispatch(updatePlayerRequest());
        requestAdmin.patch(`update-info`, {...payload}).then((res) => {
            const data = res?.data;
            dispatch(updatePlayerSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(updatePlayerFailure(data))
        }).finally(()=> onFinish())
    }
}

export const activate = (activationCode, setClear = () => undefined) => {
    return (dispatch) => {
        dispatch(activateRequest())
        requestAdmin.patch('activate', {activationCode}).then((res) => {
            const data = res?.data;
            dispatch(activateSuccess(data))
        }).catch((err) => {
            const error = err?.response?.data;
            dispatch(activateFailure(error))
        }).finally(() => {
            setClear();
        })
    }
} 

export const resetActivate = (email, setClear = () => undefined) => {
    return (dispatch) => {
        dispatch(activateRequest())
        requestAdmin.patch('resend-activation-code', {email}).then((res) => {
            const data = res?.data;
            dispatch(activateSuccess(data))
        }).catch((err) => {
            const error = err?.response?.data;
            dispatch(activateFailure(error))
        }).finally(() => {
            setClear();
        })
    }
} 

export const refresh = (data) => {
    return (dispatch) => {
        dispatch(refreshTokenRequest());
        requestToken.post('refresh-token', data).then((res) => {
            const data = res?.data;
            dispatch(refreshTokenSuccess(data))
        }).catch((error) => {
            const data = error?.response?.data;
            dispatch(refreshTokenFailure(data))
        })
    }
}