interface BaseResponseType<T> {
  isSuccess: boolean;
  message: string;
  data?: T;
}
