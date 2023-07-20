import { setMatchId } from 'store/types/utilsTypes';
import { requestAdmin } from '../../utils/axios/axios-config';
import { postCreateRequest, postCreateSuccess, postCreateFailure} from "../types/createMatchTypes";

export const postCreate = (data, setClear = () => undefined) => {
    return (dispatch) => {
        dispatch(postCreateRequest())
        requestAdmin.post('add-match', data).then((res) => { 
            const data = res?.data;
            dispatch(postCreateSuccess(data));
            const matchId = res?.data?.match?._id;
            dispatch(setMatchId(matchId));
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(postCreateFailure(data))
        }).finally(()=>{
            setClear();
        })
    }
}