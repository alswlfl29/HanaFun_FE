interface AccountType {
  accountId: number;
  accountName: string;
  accountNumber: string;
  balance: number;
}

interface CheckPwReqType {
  accountId: number;
  password: string;
}

interface CheckPwResType {
  check: boolean;
}
