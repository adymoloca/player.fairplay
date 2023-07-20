import { requestAdmin } from "utils/axios/axios-config";
import { changeRequest, changeSuccess, changeFailure } from "../types/changePasswordTypes";

export const change = (values, setClear = () => undefined) => {
    const { confirmPassword, ...others } = values;
    return (dispatch) => {
        dispatch(changeRequest())
        requestAdmin.patch('change-password',others).then((res) => {
            const data = res?.data;
            dispatch(changeSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(changeFailure(data))
        }).finally(() => {
            setClear();
        })
    }
}