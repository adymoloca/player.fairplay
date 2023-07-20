import { 
    getMatchesFailure, getMatchesRequest, getMatchesSuccess, 
    getMatchFailure, getMatchRequest, getMatchSuccess, 
    getNearMatchesFailure, getNearMatchesRequest, getNearMatchesSuccess, 
    updateMatchRequest, updateMatchSuccess, updateMatchFailure, 
    exitMatchRequest, exitMatchSuccess, exitMatchFailure, 
    chooseTeamRequest, chooseTeamSuccess, chooseTeamFailure, 
    acceptMatchRequestRequest, acceptMatchRequestSuccess, acceptMatchRequestFailure, 
    declineMatchRequestRequest, declineMatchRequestSuccess, declineMatchRequestFailure, 
    deleteMatchRequest, deleteMatchSuccess, deleteMatchFailure, 
    cancelJoinRequest, cancelJoinSuccess, cancelJoinFailure, 
    getUpcomingMatchesRequest, getUpcomingMatchesSuccess, getUpcomingMatchesFailure 
} from "store/types/matchesTypes";
import { updateHoursRequest } from "store/types/userTypes";
import { clearMatchId, setMatchId } from "store/types/utilsTypes";
import { requestAdmin } from "utils/axios/axios-config";

export const getMatches = (onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getMatchesRequest());
        requestAdmin.get('get-matches/all').then((res) => {
            const data = res?.data;
            dispatch(getMatchesSuccess(data))
        }).catch((err) => {
            const data = err?.data;
            dispatch(getMatchesFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getMatch = (id, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getMatchRequest());
        requestAdmin.get(`get-matches/${id}`).then((res) => {
            const data = res?.data;
            dispatch(getMatchSuccess(data))
        }).catch((err) => {
            const data = err?.data;
            dispatch(getMatchFailure(data))
        }).finally(()=>onFinish())
    }
}

export const updateMatch = (matchId, privateMatch, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(updateMatchRequest());
        requestAdmin.patch(`join-match`, { matchId }).then((res) => {
            const data = res?.data;
            dispatch(updateMatchSuccess(data))
            const matchId = res?.data?.matchId;
            dispatch(setMatchId(matchId));
            !privateMatch && dispatch(updateHoursRequest(data?.gameplayHours))
        }).catch((err) => {
            const data = err?.data;
            dispatch(updateMatchFailure(data))
        }).finally(()=>onFinish())
    }
}

export const chooseTeam = (data, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(chooseTeamRequest());
        requestAdmin.patch(`choose-team`, {...data }).then((res) => {
            const data = res?.data;
            dispatch(chooseTeamSuccess(data))
        }).catch((err) => {
            const data = err?.data;
            dispatch(chooseTeamFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getNearMatches = (playerLocation, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getNearMatchesRequest());
        requestAdmin.get(`get-matches/nearby`, playerLocation).then((res) => {
            const data = res?.data;
            dispatch(getNearMatchesSuccess(data))
        }).catch((err) => {
            const data = err?.data;
            dispatch(getNearMatchesFailure(data))
        }).finally(()=>onFinish())
    }
}

export const exitMatch = (matchId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(exitMatchRequest());
        requestAdmin.patch(`exit-match`, { matchId }).then((res) => {
            const data = res?.data;
            dispatch(exitMatchSuccess(data));
            dispatch(clearMatchId());
            dispatch(updateHoursRequest(data?.gameplayHours))
        }).catch((err) => {
            const data = err?.data;
            dispatch(exitMatchFailure(data))
        }).finally(()=>onFinish())
    }
}

export const acceptMatchRequest = (data, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(acceptMatchRequestRequest());
        requestAdmin.patch(`accept-player`, {...data }).then((res) => {
            const data = res?.data;
            dispatch(acceptMatchRequestSuccess(data))
        }).catch((err) => {
            const data = err?.data;
            dispatch(acceptMatchRequestFailure(data))
        }).finally(()=>onFinish())
    }
}

export const kickPlayer = (data, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(declineMatchRequestRequest());
        requestAdmin.patch(`kick-player`, {...data }).then((res) => {
            const data = res?.data;
            dispatch(declineMatchRequestSuccess(data))
        }).catch((err) => {
            const data = err?.data;
            dispatch(declineMatchRequestFailure(data))
        }).finally(()=>onFinish())
    }
}

export const deleteMatch = (matchId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(deleteMatchRequest());
        requestAdmin.delete(`delete-match/${matchId}`).then((res) => {
            const data = res?.data;
            dispatch(deleteMatchSuccess(data));
            dispatch(clearMatchId());
        }).catch((err) => {
            const data = err?.data;
            dispatch(deleteMatchFailure(data))
        }).finally(()=>onFinish())
    }
}

export const cancelJoin = (matchId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(cancelJoinRequest());
        requestAdmin.patch(`cancel-request-to-join`, { matchId }).then((res) => {
            const data = res?.data;
            dispatch(cancelJoinSuccess(data));
            dispatch(clearMatchId());
            dispatch(updateHoursRequest(data?.gameplayHours))
        }).catch((err) => {
            const data = err?.data;
            dispatch(cancelJoinFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getUpcomingMatches = (onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getUpcomingMatchesRequest());
        requestAdmin.get('get-matches/upcoming').then((res) => {
            const data = res?.data;
            dispatch(getUpcomingMatchesSuccess(data))
        }).catch((err) => {
            const data = err?.data;
            dispatch(getUpcomingMatchesFailure(data))
        }).finally(()=>onFinish())
    }
}