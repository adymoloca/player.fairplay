import { 
    getProductsRequest, getProductsSuccess, getProductsFailure, 
    addCardRequest, addCardSuccess, addCardFailure, 
    getCardsRequest, getCardsSuccess, getCardsFailure, 
    purchaseProductRequest, purchaseProductSuccess, purchaseProductFailure, getProductIdRequest, getProductIdSuccess, getProductIdFailure,
} from "store/types/paymentTypes";
import { updateHoursRequest } from "store/types/userTypes";
import { setCard } from "store/types/utilsTypes";
import { requestAdmin } from "utils/axios/axios-config";

export const getProducts = ( onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getProductsRequest());
        requestAdmin.get(`get-products/all`).then((res) => {
            const data = res?.data;
            dispatch(getProductsSuccess(data));
        }).catch((err) => {
            const data = err?.data;
            dispatch(getProductsFailure(data))
        }).finally(()=>onFinish())
    }
}

export const addCard = (data, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(addCardRequest());
        requestAdmin.post(`add-card`, {...data}).then((res) => {
            const data = res?.data;
            dispatch(addCardSuccess(data));
            dispatch(setCard(data?.cardId));
        }).catch((err) => {
            const data = err?.response?.data;
            dispatch(addCardFailure(data));
        }).finally(()=>onFinish())
    }
}

export const getCards = ( onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getCardsRequest());
        requestAdmin.get(`get-cards`).then((res) => {
            const data = res?.data;
            dispatch(getCardsSuccess(data));
        }).catch((err) => {
            const data = err?.data;
            dispatch(getCardsFailure(data))
        }).finally(()=>onFinish())
    }
}

export const purchaseProduct = (data, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(purchaseProductRequest());
        requestAdmin.patch(`purchase-product`,{...data}).then((res) => {
            const data = res?.data;
            dispatch(purchaseProductSuccess(data));
            dispatch(updateHoursRequest(data?.myProfile?.gameplayHours))
        }).catch((err) => {
            const data = err?.data;
            dispatch(purchaseProductFailure(data))
        }).finally(()=>onFinish())
    }
}

export const getProductId = (productId, onFinish = ()=> undefined) => {
    return (dispatch) => {
        dispatch(getProductIdRequest());
        requestAdmin.get(`get-products/${productId}`).then((res) => {
            const data = res?.data;
            dispatch(getProductIdSuccess(data));
        }).catch((err) => {
            const data = err?.data;
            dispatch(getProductIdFailure(data))
        }).finally(()=>onFinish())
    }
}