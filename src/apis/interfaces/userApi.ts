import { LoginType } from '../../types/user';

export interface userApi {
  postLogin(password: string): Promise<BaseResponseType<LoginType>>;
  getIsHost(): Promise<BaseResponseType<{ isHost: boolean }>>;
}
