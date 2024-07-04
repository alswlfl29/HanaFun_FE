export interface lessonApi {
  getLessonDetail(
    lesson_id: number
  ): Promise<BaseResponseType<LessonDetailType>>;
  getLessonDate(lessonId: number): Promise<BaseResponseType<LessonDateType[]>>;
  postLessonImg(file: FormData): Promise<string>;
  postCreateLesson(reqData: CreateLessonReqType): Promise<void>;
}
