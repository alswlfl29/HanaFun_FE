import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from './url';
import { getCookie, removeCookie } from '../utils/cookie';
import { userApi } from './interfaces/userApi';
import { accountApi } from './interfaces/accountApi';
import { hostApi } from './interfaces/hostApi';
import { categoryApi } from './interfaces/categoryApi';
import { transactionApi } from './interfaces/transactionApi';
import { reservationApi } from './interfaces/reservationApi';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

export class ApiClient
  implements
    userApi,
    accountApi,
    hostApi,
    categoryApi,
    transactionApi,
    reservationApi
{
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  // ------- user -------
  async postLogin(password: string) {
    try {
      const response = await this.axiosInstance.request<
        BaseResponseType<LoginType>
      >({
        method: 'post',
        url: '/user/login',
        data: { password: password },
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) throw error.response?.data;
      else throw new Error('unexpected error');
    }
  }

  async getIsHost() {
    const response = await this.axiosInstance.request<
      BaseResponseType<{ isHost: boolean }>
    >({
      method: 'get',
      url: '/user/isHost',
    });
    return response.data;
  }

  async getPoint() {
    const response = await this.axiosInstance.request<
      BaseResponseType<PointType>
    >({
      method: 'get',
      url: '/user/point',
    });
    return response.data;
  }

  // ------- account -------
  async getAccountList() {
    const response = await this.axiosInstance.request<
      BaseResponseType<AccountType[]>
    >({
      method: 'get',
      url: '/account/list',
    });
    return response.data;
  }

  async postCheckPw(reqData: CheckPwReqType) {
    const response = await this.axiosInstance.request<
      BaseResponseType<CheckPwResType>
    >({
      method: 'post',
      url: '/account/pw',
      data: reqData,
    });
    return response.data;
  }

  // ------- host -------
  async postCreateHost(reqData: CreateHostReqType) {
    const response = await this.axiosInstance.request<
      BaseResponseType<CreateHostResType>
    >({
      method: 'post',
      url: '/host/create',
      data: reqData,
    });
    return response.data;
  }

  async getHostInfo() {
    try {
      const response = await this.axiosInstance.request<
        BaseResponseType<HostInfoType>
      >({
        method: 'get',
        url: '/host/info',
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) throw error.response?.data;
      else throw new Error('unexpected error');
    }
  }

  // ------- category -------
  async getSearchLessonAll(reqData: SearchLessonReqType) {
    const response = await this.axiosInstance.request<
      BaseResponseType<SearchLessonResType[]>
    >({
      method: 'get',
      url: `/category/all?query=${reqData.query}&sort=${reqData.sort}`,
    });
    return response.data;
  }

  async getSearchLessonCategory(
    categoryId: number,
    reqData: SearchLessonReqType
  ) {
    const response = await this.axiosInstance.request<
      BaseResponseType<SearchLessonResType[]>
    >({
      method: 'get',
      url: `/category/${categoryId}?query=${reqData.query}&sort=${reqData.sort}`,
    });
    return response.data;
  }

  async getCategoryList() {
    const response = await this.axiosInstance.request<
      BaseResponseType<CategoryType[]>
    >({
      method: 'get',
      url: '/category',
    });
    return response.data;
  }

  //---------transaction---------
  async postQrPay(reqData: QrPayReqType) {
    const response = await this.axiosInstance.request<
      BaseResponseType<PayResType>
    >({
      method: 'post',
      url: '/transaction/qr',
      data: reqData,
    });
    return response.data;
  }

  async postSimplePay(reqData: SimplePayReqType) {
    try {
      const response = await this.axiosInstance.request<
        BaseResponseType<PayResType>
      >({
        method: 'post',
        url: '/transaction/simple',
        data: reqData,
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) throw error.response?.data;
      else throw new Error('unexpected error');
    }
  }
  // 환불
  async postPayback(reqData: PaybackReqType) {
    const response = await this.axiosInstance.request<
      BaseResponseType<{
        transactionId: number;
      }>
    >({
      method: 'post',
      url: '/transaction/payback',
      data: reqData,
    });
    return response.data;
  }

  //---------lesson---------

  // 클래스 상세
  async getLessonDetail(lesson_id: number) {
    const response = await this.axiosInstance.request<
      BaseResponseType<LessonDetailType>
    >({
      method: 'get',
      url: `/lesson/${lesson_id}`,
    });
    return response.data;
  }

  async getLessonDate(lessonId: number) {
    const response = await this.axiosInstance.request<
      BaseResponseType<LessonDateType[]>
    >({
      method: 'get',
      url: `/lesson/date-select?lessonId=${lessonId}`,
    });
    return response.data;
  }

  async postCreateLesson(reqData: CreateLessonReqType) {
    const response = await this.axiosInstance.request<void>({
      method: 'post',
      url: '/lesson/create',
      data: reqData,
    });
    return response.data;
  }

  //---------reservation---------

  // 마이페이지 출력
  async getMyLesson() {
    const response = await this.axiosInstance.request<
      BaseResponseType<MyLessonType>
    >({
      method: 'get',
      url: '/reservation/my',
    });
    return response.data;
  }

  // 나의 신청 클래스 출력
  async getMyLessonAll() {
    const response = await this.axiosInstance.request<
      BaseResponseType<LessonType[]>
    >({
      method: 'get',
      url: '/reservation/my/lessons',
    });
    console.log('신청클래스 싹다', response.data);
    return response.data;
  }

  // 클래스 예약 취소
  async cancelLesson(reservationId: CancelLessonReqType) {
    const response = await this.axiosInstance.request<CancleLessonResType>({
      method: 'post',
      url: '/reservation/cancel',
      data: reservationId,
    });
    return response.data;
  }

  // 신청 클래스 일정
  async getMySchedule(reqData: MyScheduleReqType) {
    const response = await this.axiosInstance.request<
      BaseResponseType<MyScheduleType[]>
    >({
      method: 'get',
      url: `/reservation/my/schedule?year=${reqData.year}&month=${reqData.month}`,
    });
    return response.data;
  }

  // 개설 클래스 관리 (전체 목록)
  async getHostLessonList() {
    const response = await this.axiosInstance.request<
      BaseResponseType<HostLessonType[]>
    >({
      method: 'get',
      url: '/reservation/my/opened',
    });
    console.log(response);
    return response.data;
  }

  // 개설 클래스 상세
  async getHostLessonDetailList(lesson_id: number) {
    const response = await this.axiosInstance.request<
      BaseResponseType<HostLessonDetailType[]>
    >({
      method: 'get',
      url: `/reservation/my/opened/${lesson_id}`,
    });
    console.log(lesson_id);
    console.log(response);
    return response.data;
  }

  async postLessonReservation(reqData: ReservationReqType) {
    const response = await this.axiosInstance.request<
      BaseResponseType<{ message: string }>
    >({
      method: 'post',
      url: '/reservation/check',
      data: reqData,
    });
    return response.data;
  }

  // 예약자 정보
  async peopleList(lessondateId: PeopleListReqType) {
    console.log('전달된 lessondate_id: ', lessondateId);
    const response = await this.axiosInstance.request<
      BaseResponseType<PeopleListType>
    >({
      method: 'post',
      url: '/reservation/my/opened/people',
      data: lessondateId,
    });

    return response.data;
  }

  //---------revenue---------

  async getTotal() {
    const response = await this.axiosInstance.request<
      BaseResponseType<TotalType>
    >({
      method: 'get',
      url: '/revenue/total',
    });
    return response.data;
  }

  async getMonthRevenue(year: number, month: number) {
    const response = await this.axiosInstance.request<
      BaseResponseType<MonthRevenueType[]>
    >({
      method: 'get',
      url: `/revenue/${year}/${month}`,
    });
    return response.data;
  }

  async getLessonRevenue(year: number, lessonId: number) {
    const response = await this.axiosInstance.request<
      BaseResponseType<LessonRevenue[]>
    >({
      method: 'get',
      url: `/revenue/lesson/${year}/${lessonId}`,
    });
    return response.data;
  }

  async updatePrice(reqData: PriceReqType) {
    const response = await this.axiosInstance.request<
      BaseResponseType<PriceType>
    >({
      method: 'put',
      url: '/revenue/update',
      data: reqData,
    });
    return response.data;
  }

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

    newInstance.interceptors.response.use((response) => {
      if (response.status === 403) {
        removeCookie('token');
        removeCookie('username');
        location.href = '/';
      }

      if (response.status === 404) {
        location.href = '/error';
      }
      return response;
    });

    return newInstance;
  };
}
