import { requestAdmin } from "utils/axios/axios-config";
import { addTicketFailure, addTicketRequest, addTicketSuccess } from "store/types/ticketTypes";

export const addTicket = (data, onFinish = () => undefined) => {
    return (dispatch) => {
        dispatch(addTicketRequest());
        requestAdmin.post('create-ticket', {...data}).then((res) => {
            const data = res?.data;
            dispatch(addTicketSuccess(data))
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(addTicketFailure(data))
        }).finally(() => onFinish())
    }
}