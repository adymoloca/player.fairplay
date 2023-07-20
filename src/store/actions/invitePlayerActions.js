import { 
    invitePlayerRequest, invitePlayerSuccess, invitePlayerFailure,
    acceptInvitationFailure, acceptInvitationRequest, acceptInvitationSuccess, 
    declineInvitationRequest, declineInvitationSuccess, declineInvitationFailure, 
    getInvitationRequestRequest, getInvitationRequestSuccess, getSentInvitationFailure, 
    getSentInvitationRequest, getSentInvitationSuccess, getInvitationRequestFailure,
    revoqueInvitationFailure, revoqueInvitationRequest, revoqueInvitationSuccess,  
} from "store/types/invitePlayerTypes";
import { updateHoursRequest } from "store/types/userTypes";
import { requestAdmin } from "utils/axios/axios-config";

export const invitePlayer = (data, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(invitePlayerRequest());
        requestAdmin.post('send-match-invitation', {...data}).then((res) => {
            const data = res?.data;
            dispatch(invitePlayerSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(invitePlayerFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getInvitationRequest = ( onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getInvitationRequestRequest());
        requestAdmin.get(`get-match-invitations/received`).then((res) => {
            const data = res?.data;
            dispatch(getInvitationRequestSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(getInvitationRequestFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getSentInvitation = ( onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getSentInvitationRequest());
        requestAdmin.get(`get-match-invitations/sent`).then((res) => {
            const data = res?.data;
            dispatch(getSentInvitationSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(getSentInvitationFailure(data))
        }).finally(()=>onFinish())
    }
}

export const acceptInvitation = (matchInvitationId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(acceptInvitationRequest());
        requestAdmin.patch(`accept-match-invitation`,{matchInvitationId}).then((res) => {
            const data = res?.data;
            dispatch(acceptInvitationSuccess(data))
            dispatch(updateHoursRequest(data?.gameplayHours))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(acceptInvitationFailure(data))
        }).finally(()=>onFinish())
    }
}

export const revoqueInvitation = (matchInvitationId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(revoqueInvitationRequest());
        requestAdmin.delete(`revoke-match-invitation/${matchInvitationId}`).then((res) => {
            const data = res?.data;
            dispatch(revoqueInvitationSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(revoqueInvitationFailure(data))
        }).finally(()=>onFinish())
    }
}

export const declineInvitation = (matchInvitationId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(declineInvitationRequest());
        requestAdmin.delete(`decline-match-invitation/${matchInvitationId}`).then((res) => {
            const data = res?.data;
            dispatch(declineInvitationSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(declineInvitationFailure(data))
        }).finally(()=>onFinish())
    }
}
