import { CertificatesActionTypes, CertificatesActions, CertificatesState } from "../../types/certificateReducer"


const initialState: CertificatesState = {
    items: new Map([]),
    error: null,
    isLoading: false
}

export function certificatesReducer (state: CertificatesState = initialState, action: CertificatesActions): CertificatesState{
    switch (action.type){
        case CertificatesActionTypes.FETCH_SERTIFICATES:
            return { ...state, error:null, isLoading: true }

        case CertificatesActionTypes.FETCH_SERTIFICATES_FAILED:
            return { ...state, error: action.payload, isLoading: false }

        case CertificatesActionTypes.FETCH_SERTIFICATES_SUCCESS:
            return { error: null, isLoading: false, items: new Map (action.payload.map(item => [item.ID, item])) }

        default:
            return state
    }
}



