interface PayCommonReqType {
  withdrawId: number;
  payment: number;
}

interface QrPayReqType extends PayCommonReqType {
  depositId: number;
  lessonId: number;
}

interface SimplePayReqType extends PayCommonReqType {
  lessondateId: number;
  reservationId: number;
  point: number;
}

interface PayResType {
  transactionId: number;
}

interface PaybackReqType {
  reservationId: number;
}
