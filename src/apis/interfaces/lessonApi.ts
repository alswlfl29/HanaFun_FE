export interface lessonApi {
  getLessonDetail(
    lesson_id: number
  ): Promise<BaseResponseType<LessonDetailType>>;
}
