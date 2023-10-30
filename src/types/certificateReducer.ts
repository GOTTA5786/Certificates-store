export interface Certificate {
    DESCRIPTION?: string
    IMAGEURL?: string
    DISCOUNT: string
    ID: string
    NAME: string
    PRICE: string
    PRIMARYKEY: string
    REC_NAME: string
    REC_PAYMENT_METHOD: string
    REC_PAYMENT_OBJECT: string
    REC_QUANTITY: string
    REC_SNO: string
    REC_SUM: string
    REC_TAX: string
    SUMMA: string
    TABLENAME: string
}

export enum CertificatesActionTypes{
    FETCH_SERTIFICATES = 'FETCH_SERTIFICATES',
    FETCH_SERTIFICATES_SUCCESS = "FETCH_SERTIFICATES_SUCCESS",
    FETCH_SERTIFICATES_FAILED = 'FETCH_SERTIFICATES_FAILED',
}

type MappedCertificates = Map<string, Certificate>

export interface CertificatesState{
    items: MappedCertificates
    error: string | null
    isLoading: boolean
}

interface FetchSertificatesAction {
    type: CertificatesActionTypes.FETCH_SERTIFICATES,
}

interface FetchSertificatesSuccessAction{
    type: CertificatesActionTypes.FETCH_SERTIFICATES_SUCCESS
    payload: Certificate[]
}

interface FetchSertificatesFailedAction{
    type: CertificatesActionTypes.FETCH_SERTIFICATES_FAILED
    payload: string
}

export type CertificatesActions = FetchSertificatesAction | FetchSertificatesSuccessAction | FetchSertificatesFailedAction