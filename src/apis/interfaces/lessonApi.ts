export interface lessonApi {
  getLessonDetail(
    lesson_id: number
  ): Promise<BaseResponseType<LessonDetailType>>;
  getLessonDate(lessonId: number): Promise<BaseResponseType<LessonDateType[]>>;
}
