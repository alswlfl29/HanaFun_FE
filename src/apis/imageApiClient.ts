import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from './url';
import { getCookie } from '../utils/cookie';

export class ImageApiClient {
  private static instance: ImageApiClient;
  private axiosImgInstance: AxiosInstance;

  constructor() {
    this.axiosImgInstance = this.createImageAxiosInstance();
  }

  // 이미지 업로드
  async postLessonImg(formData: FormData) {
    console.log('ddddfsdjf>>', formData);
    const response = await this.axiosImgInstance.request<string>({
      method: 'post',
      url: '/lesson/image-upload',
      data: formData,
    });
    return response.data;
  }

  static getImageInstance(): ImageApiClient {
    return this.instance || (this.instance = new this());
  }

  // registerToken(newToken: string) {
  //   this.axiosInstance = this.createAxiosInstance(newToken);
  // }

  logout() {
    this.axiosImgInstance = this.createImageAxiosInstance();
  }

  private createImageAxiosInstance = () => {
    const headers: any = {
      'content-type': 'multipart/form-data',
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

        config.headers['Content-Type'] = 'multipart/form-data';
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
