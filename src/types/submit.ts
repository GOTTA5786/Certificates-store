export interface OSSaleTypes {
    ApiKey: string
    MethodName: string
    Id: string
    TableName: string
    PrimaryKey: string
    Price: string
    Summa: string
    ClientName: string
    Phone: string
    Email: string
    PaymentTypeId: PaymentTypeId
    UseDelivery: boolean
    IsGift: boolean
    MsgText: string
  }

export enum PaymentTypeId {
    FIRST_PAYMENT_TYPE = 1,
    SECOND_PAYMENT_TYPE = 2
}