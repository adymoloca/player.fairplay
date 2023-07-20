import {
    getFieldsFailure, getFieldsRequest, getFieldsSuccess,
    getFieldFailure, getFieldRequest, getFieldSuccess,
    getNearFieldsFailure, getNearFieldsRequest, getNearFieldsSuccess 
} from "store/types/fieldsTypes";
import { requestAdmin } from "utils/axios/axios-config";

export const getFields = (onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getFieldsRequest());
        requestAdmin.get('get-fields/all').then((res) => {
            const data = res?.data;
            dispatch(getFieldsSuccess(data))
        }).catch((err) => {
            const data = err?.data;
            dispatch(getFieldsFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getNearFields = (playerLocation, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getNearFieldsRequest());
        requestAdmin.get(`get-fields/nearby`, playerLocation).then((res) => {
            const data = res?.data;
            dispatch(getNearFieldsSuccess(data))
        }).catch((err) => {
            const data = err?.data;
            dispatch(getNearFieldsFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getFieldId = (fieldId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getFieldRequest());
        requestAdmin.get(`get-fields/${fieldId}`).then((res) => {
            const data = res?.data;
            dispatch(getFieldSuccess(data))
        }).catch((err) => {
            const data = err?.data;
            dispatch(getFieldFailure(data))
        }).finally(()=>onFinish())
    }
}
