// export interface usersApi {
//   postLogin(): Promise<>;
// }

export interface userApi {
  getPoint(): Promise<BaseResponseType<PointType>>;
}
