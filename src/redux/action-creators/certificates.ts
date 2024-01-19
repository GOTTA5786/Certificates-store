import { Dispatch } from "redux";
import { Certificate, CertificatesActionTypes, CertificatesActions } from "../../types/certificateReducer";

const mock1: Certificate = {
    DESCRIPTION: 'dsad',
    IMAGEURL: 'dasdw',
    DISCOUNT: 'dwada',
    ID: '213',
    NAME: 'Mock1',
    PRICE: '213',
    PRIMARYKEY: 's345',
    REC_NAME: 'dwad',
    REC_PAYMENT_METHOD: 'sdawd',
    REC_PAYMENT_OBJECT: 'dwadw',
    REC_QUANTITY: '123',
    REC_SNO: '2133',
    REC_SUM: '321321',
    REC_TAX: '12',
    SUMMA: '3213123',
    TABLENAME: 'dwadawd',
}
const mock2: Certificate = {
    DESCRIPTION: 'Mock',
    IMAGEURL: 'Mock',
    DISCOUNT: 'Mock',
    ID: '3333',
    NAME: 'Mock2',
    PRICE: '3333',
    PRIMARYKEY: 's3333',
    REC_NAME: 'Mock',
    REC_PAYMENT_METHOD: 'Mock',
    REC_PAYMENT_OBJECT: 'Mock',
    REC_QUANTITY: '333',
    REC_SNO: '3333',
    REC_SUM: '3333',
    REC_TAX: '3333',
    SUMMA: '323',
    TABLENAME: 'Mock',
}


const OSGetGoodList = {
    "ApiKey": process.env.REACT_APP_API_KEY || '',
    "MethodName": "OSGetGoodList",
    }

export function fetchCertificates(){
    return function(dispatch: Dispatch<CertificatesActions>):void{
        try{
            dispatch({type: CertificatesActionTypes.FETCH_SERTIFICATES})
            fetch('https://sycret.ru/service/api/api?' + new URLSearchParams(OSGetGoodList))
            .then( res => res.json())
            .then(data => {
                // if (data.result === 0){
                //     dispatch({type: CertificatesActionTypes.FETCH_SERTIFICATES_SUCCESS, payload: data.data})
                // }else{
                //     dispatch({type: CertificatesActionTypes.FETCH_SERTIFICATES_FAILED, payload: 'Fetching error'})
                // }
                dispatch({type: CertificatesActionTypes.FETCH_SERTIFICATES_SUCCESS, payload: [mock1, mock2]})
            })

        }catch (e){
            dispatch({type: CertificatesActionTypes.FETCH_SERTIFICATES_FAILED, payload: 'Fetching error'})
        }
    }
}