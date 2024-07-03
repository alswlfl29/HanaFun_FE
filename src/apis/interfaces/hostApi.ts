import {
  CreateHostReqType,
  CreateHostResType,
  HostInfoType,
} from '../../types/host';

export interface hostApi {
  postCreateHost(
    reqType: CreateHostReqType
  ): Promise<BaseResponseType<CreateHostResType>>;

  getHostInfo(): Promise<BaseResponseType<HostInfoType>>;
}
