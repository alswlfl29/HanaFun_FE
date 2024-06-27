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

  // 임의 데이터. 마이페이지 홈 화면 호출
  public static async getMyLesson(): Promise<MyLessonType> {
    const apiUrl = '/data/myLesson.json';
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  // 임의 데이터. 신청 클래스 목록 페이지 호출
  public static async getMyLessonAll(): Promise<LessonType[]> {
    const apiUrl = '/data/myLesson_all.json';
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  // 임의 데이터. 클래스 상세 정보 호출
  public static async getLessonDetail(
    lesson_id: number
  ): Promise<LessonDetailType> {
    const apiUrl = '/data/lessonDetail.json';
    const response = await fetch(apiUrl);
    const data = await response.json();
    const lesssonDetail = data.find(
      (lesson: LessonDetailType) => lesson.lesson_id === lesson_id
    );
    return lesssonDetail;
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
