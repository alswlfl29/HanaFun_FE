import { QrPayReqType } from '../../types/transaction';

export interface transactionApi {
  postQrPay(reqData: QrPayReqType): Promise<
    BaseResponseType<{
      transactionId: number;
    }>
  >;
}
