import { Dispatch } from "redux";
import { CertificatesActionTypes, CertificatesActions } from "../../types/certificateReducer";



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
                if (data.result === 0){
                    dispatch({type: CertificatesActionTypes.FETCH_SERTIFICATES_SUCCESS, payload: data.data})
                }else{
                    dispatch({type: CertificatesActionTypes.FETCH_SERTIFICATES_FAILED, payload: 'Fetching error'})
                }
            })

        }catch (e){
            dispatch({type: CertificatesActionTypes.FETCH_SERTIFICATES_FAILED, payload: 'Fetching error'})
        }
    }
}