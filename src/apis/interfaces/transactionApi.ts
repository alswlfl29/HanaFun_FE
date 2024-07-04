export interface transactionApi {
  postQrPay(reqData: QrPayReqType): Promise<BaseResponseType<PayResType>>;

  postSimplePay(
    reqData: SimplePayReqType
  ): Promise<BaseResponseType<PayResType>>;

  postPayback(
    reqData: PaybackReqType
  ): Promise<BaseResponseType<{ transactionId: number }>>;
}
