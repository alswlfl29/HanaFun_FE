export type AccountType = {
  accountId: number;
  accountName: string;
  accountNumber: string;
  balance: number;
};

export type CheckPwReqType = {
  accountId: number;
  password: string;
};

export type CheckPwResType = {
  check: boolean;
};
