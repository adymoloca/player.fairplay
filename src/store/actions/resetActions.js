import { requestAdmin } from "utils/axios/axios-config";
import { resetRequest, resetSuccess, resetFailure } from "../types/resetTypes";

export const reset = (values, setClear = () => undefined) => {
    const { confirmPassword, ...others } = values;
    return (dispatch) => {
        dispatch(resetRequest())
        requestAdmin.patch('set-new-password',others).then((res) => {
            const data = res?.data;
            dispatch(resetSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(resetFailure(data))
        }).finally(() => {
            setClear();
        })
    }
}