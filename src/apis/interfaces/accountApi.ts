import {
  AccountType,
  CheckPwReqType,
  CheckPwResType,
} from '../../types/account';

export interface accountApi {
  getAccountList(): Promise<BaseResponseType<AccountType[]>>;
  postCheckPw(
    reqData: CheckPwReqType
  ): Promise<BaseResponseType<CheckPwResType>>;
}
