import { SearchLessonReqType, SearchLessonResType } from '../../types/category';

export interface categoryApi {
  getSearchLessonAll(
    reqData: SearchLessonReqType
  ): Promise<BaseResponseType<SearchLessonResType[]>>;
}
