interface PayCommonReqType {
  withdrawId: number;
  lessondateId: number;
  payment: number;
}

interface QrPayReqType extends PayCommonReqType {
  depositId: number;
  lessonId: number;
}

interface SimplePayReqType extends PayCommonReqType {
  reservationId: number;
  point: number;
}

interface PayResType {
  transactionId: number;
};

interface PaybackReqType {
  reservationId: number;
}
