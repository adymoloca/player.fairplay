import { requestAdmin } from "utils/axios/axios-config";
import { recoverRequest, recoverSuccess, recoverFailure } from "../types/recoverTypes";

export const recover = (senderEmail, setClear = () => undefined) => {
    return (dispatch) => {
        dispatch(recoverRequest())
        requestAdmin.patch('password-recovery',senderEmail).then((res) => {
            const data = res?.data;
            dispatch(recoverSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(recoverFailure(data))
        }).finally(() => {
            setClear();
        })
    }
}