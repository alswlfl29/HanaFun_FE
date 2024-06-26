import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from './url';
import { getCookie } from '../utils/cookie';

export class ApiClient {
  // implements
  //   usersApi,
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  // ------- mypage -------

  // get lessonDetail

  // public async getLessonDetails(): Promise<
  //   ApiResponseType<LessonDetailType[]>
  // > {
  //   const response = await this.axiosInstance.request<
  //     ApiResponseType<LessonDetailType[]>
  //   >({
  //     method: 'get',
  //     url: '/lessonDetail.json',
  //   });
  //   return response.data;
  // }

  public static async getMyLesson(): Promise<MyLessonType> {
    const apiUrl = '/data/myLesson.json';
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  //---------users---------
  // async postLogin(user: LoginReqType) {
  //   const response = await this.axiosInstance.request<LoginType>({
  //     method: 'post',
  //     url: '/users/login',
  //     data: user,
  //   });
  //   return response.data;
  // }

  static getInstance(): ApiClient {
    return this.instance || (this.instance = new this());
  }

  // registerToken(newToken: string) {
  //   this.axiosInstance = this.createAxiosInstance(newToken);
  // }

  logout() {
    this.axiosInstance = this.createAxiosInstance();
  }

  private createAxiosInstance = () => {
    const headers: any = {
      'content-type': 'application/json',
    };

    const newInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 100000,
      headers,
    });

    newInstance.interceptors.request.use(
      (config) => {
        const TOKEN = getCookie('token');
        if (TOKEN) {
          config.headers['Authorization'] = `Bearer ${TOKEN}`;
        }

        config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    return newInstance;
  };
}
