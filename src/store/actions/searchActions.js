import { getPlayerUsernameFailure, getPlayerUsernameRequest, getPlayerUsernameSuccess,
    getFieldsSearchFailure, getFieldsSearchRequest, getFieldsSearchSuccess, 
    getMatchesSearchRequest, getMatchesSearchSuccess, getMatchesSearchFailure, getPlayerMatchRequest, getPlayerMatchSuccess, getPlayerMatchFailure,
} from "store/types/searchTypes";
import { requestAdmin } from "utils/axios/axios-config";

export const getPlayerUsername = (data, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getPlayerUsernameRequest());
        requestAdmin.get(`search-player/${data}`).then((res) => {
            const data = res?.data;
            dispatch(getPlayerUsernameSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(getPlayerUsernameFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getFieldsBySearch = (searchParam, onFinish = () => undefined) => {
    return (dispatch) => {
        dispatch(getFieldsSearchRequest());
        requestAdmin.get(`search-field/${searchParam}`).then((res) => {
            const data = res?.data;
            dispatch(getFieldsSearchSuccess(data))
        }).catch((err) => {
            const data = err?.data;
            dispatch(getFieldsSearchFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getMatchBySearch = (searchParam, onFinish = () => undefined) => {
    return (dispatch) => {
        dispatch(getMatchesSearchRequest());
        requestAdmin.get(`search-match/${searchParam}`).then((res) => {
            const data = res?.data;
            dispatch(getMatchesSearchSuccess(data))
        }).catch((err) => {
            const data = err?.data;
            dispatch(getMatchesSearchFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getPlayerMatch = (matchId, search, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getPlayerMatchRequest());
        requestAdmin.get(`search-player/${matchId}/${search}`).then((res) => {
            const data = res?.data;
            dispatch(getPlayerMatchSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(getPlayerMatchFailure(data))
        }).finally(()=>onFinish())
    }
}