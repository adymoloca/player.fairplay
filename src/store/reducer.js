import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import membersReducer from './reducers/membersReducer';
import playerReducer from './reducers/userReducer';
import newsReducer from './reducers/postsReducer';
import recoverReducer from './reducers/recoverReducer';
import resetReducer from './reducers/resetReducer';
import changeReducer from './reducers/changePasswordReducer';
import fieldsReducer from './reducers/fieldsReducer';
import utilsReducer from './reducers/utilsReducer';
import matchesReducer from './reducers/matchesReducer';
import friendsReducer from './reducers/friendsReducer';
import searchReducer from './reducers/searchReducer';
import ticketReducer from './reducers/ticketReducer';
import createReducer from './reducers/createMatchReducer';
import paymentReducer from './reducers/paymentReducer';
import invitationReducer from './reducers/invitePlayerReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    utilsState: utilsReducer,
    membersState: membersReducer,
    playerState: playerReducer,
    newsState: newsReducer,
    recoverState: recoverReducer,
    resetState : resetReducer,
    changeState: changeReducer,
    fieldsState: fieldsReducer,
    matchesState: matchesReducer,
    friendsState: friendsReducer,
    searchState: searchReducer,
    ticketState: ticketReducer,
    createState: createReducer,
    paymentState: paymentReducer,
    invitationState: invitationReducer,
});

export default reducer;
