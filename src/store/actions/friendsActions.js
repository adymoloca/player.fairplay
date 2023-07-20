import {
    getFriendsRequest, getFriendsSuccess, getFriendsFailure,
    sendFriendRequestRequest, sendFriendRequestSuccess, sendFriendRequestFailure,
    getFriendRequestRequest, getFriendRequestSuccess, getFriendRequestFailure,
    acceptFriendRequestRequest, acceptFriendRequestSuccess, acceptFriendRequestFailure,
    getSentRequestRequest, getSentRequestSuccess, getSentRequestFailure,
    removeFriendRequest, removeFriendSuccess,removeFriendFailure, 
    revoqueRequest, revoqueSuccess, revoqueFailure, 
    declineFriendRequest, declineFriendSuccess, declineFriendFailure,
    getFavoriteRequest, getFavoriteSuccess, getFavoriteFailure, 
    addFavoriteRequest, addFavoriteSuccess, addFavoriteFailure, 
    removeFavoriteRequest, removeFavoriteSuccess, removeFavoriteFailure, 
    getFriendIdRequest, getFriendIdSuccess, getFriendIdFailure, getFriendsMatchRequest, getFriendsMatchSuccess, getFriendsMatchFailure, 
} from 'store/types/friendsTypes';
import { requestAdmin } from 'utils/axios/axios-config';

export const getFriends = (onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getFriendsRequest());
        requestAdmin.get('get-friends').then((res) => {
            const data = res?.data;
            dispatch(getFriendsSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(getFriendsFailure(data))
        }).finally(()=>onFinish())
    }
}

export const sendFriendRequest = (playerId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(sendFriendRequestRequest());
        requestAdmin.post(`send-friend-request`, {playerId}).then((res) => {
            const data = res?.data;
            dispatch(sendFriendRequestSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(sendFriendRequestFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getReceivedFriendRequest = ( onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getFriendRequestRequest());
        requestAdmin.get(`get-friend-requests/received`).then((res) => {
            const data = res?.data;
            dispatch(getFriendRequestSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(getFriendRequestFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getSentFriendRequest = ( onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getSentRequestRequest());
        requestAdmin.get(`get-friend-requests/sent`).then((res) => {
            const data = res?.data;
            dispatch(getSentRequestSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(getSentRequestFailure(data))
        }).finally(()=>onFinish())
    }
}

export const acceptReceivedFriendRequest = (friendRequestId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(acceptFriendRequestRequest());
        requestAdmin.patch(`accept-friend-request `,{friendRequestId}).then((res) => {
            const data = res?.data;
            dispatch(acceptFriendRequestSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(acceptFriendRequestFailure(data))
        }).finally(()=>onFinish())
    }
}

export const removeFriend = (playerId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(removeFriendRequest());
        requestAdmin.patch(`remove-friend`,{playerId}).then((res) => {
            const data = res?.data;
            dispatch(removeFriendSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(removeFriendFailure(data))
        }).finally(()=>onFinish())
    }
}

export const revoque = (friendRequestId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(revoqueRequest());
        requestAdmin.delete(`revoke-friend-request/${friendRequestId}`).then((res) => {
            const data = res?.data;
            dispatch(revoqueSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(revoqueFailure(data))
        }).finally(()=>onFinish())
    }
}

export const declineFriend = (friendRequestId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(declineFriendRequest());
        requestAdmin.delete(`decline-friend-request/${friendRequestId}`).then((res) => {
            const data = res?.data;
            dispatch(declineFriendSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(declineFriendFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getFavorite = (onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getFavoriteRequest());
        requestAdmin.get('get-favourite-friends').then((res) => {
            const data = res?.data;
            dispatch(getFavoriteSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(getFavoriteFailure(data))
        }).finally(()=>onFinish())
    }
}

export const addFavorite = (playerId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(addFavoriteRequest());
        requestAdmin.patch('add-friend-to-favourite', {playerId}).then((res) => {
            const data = res?.data;
            dispatch(addFavoriteSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(addFavoriteFailure(data))
        }).finally(()=>onFinish())
    }
}

export const removeFavorite = (playerId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(removeFavoriteRequest());
        requestAdmin.patch(`remove-favourite-friend`,{playerId}).then((res) => {
            const data = res?.data;
            dispatch(removeFavoriteSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(removeFavoriteFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getProfile = (profileId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getFriendIdRequest());
        requestAdmin.get(`get-player/${profileId}`).then((res) => {
            const data = res?.data;
            dispatch(getFriendIdSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(getFriendIdFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getFriendsMatch = (matchId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getFriendsMatchRequest());
        requestAdmin.get(`get-friends/${matchId}`).then((res) => {
            const data = res?.data;
            dispatch(getFriendsMatchSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(getFriendsMatchFailure(data))
        }).finally(()=>onFinish())
    }
}