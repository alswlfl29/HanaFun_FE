export interface reservationApi {
  getHostLessonList(): Promise<BaseResponseType<HostLessonType[]>>;

  getHostLessonDetailList(
    lesson_id: number
  ): Promise<BaseResponseType<HostLessonDetailType[]>>;

  postLessonReservation(reqData: ReservationReqType): Promise<
    BaseResponseType<{
      reservationId: number;
    }>
  >;
  getMyLesson(): Promise<BaseResponseType<MyLessonType>>;

  getMyLessonAll(): Promise<BaseResponseType<LessonType[]>>;

  getMyLessonCalendar(): Promise<BaseResponseType<MyScheduleType[]>>;

  cancelLesson(): Promise<BaseResponseType<CancelLessonReqType>>;

  peopleList(
    lessondate_id: PeopleListReqType
  ): Promise<BaseResponseType<PeopleListType>>;
}
