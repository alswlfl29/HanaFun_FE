interface HostLessonType {
  lessonId: number;
  image: string;
  title: string;
}

interface HostLessonDetailType extends MyScheduleType {
  lessondateId: number;
  date: string;
  lessonId: number;
  title: string;
}

interface ReservationReqType {
  lessondateId: number;
  applicant: number;
  accountId: number;
  password: string;
}

interface LessonType {
  reservationId: number;
  lessondate_id: number;
  lessonId: number;
  image: string;
  title: string;
  location: string;
  date: string;
  categoryName: string;
}

interface MyLessonType extends LessonType {
  point: number;
  lessons: LessonType[];
}

interface MyScheduleType {
  reservation_id: number;
  lessonId: number;
  date: string;
  title: string;
}

interface CancelLessonReqType {
  reservationId: number;
}

interface MyScheduleReqType {
  year: number;
  month: number;
}

interface PeopleType {
  startTime: string;
  userName: string;
  email: string;
  applicant: number;
}

interface PeopleListType extends PeopleType {
  applicant: number;
  capacity: number;
  people: PeopleType[];
}

interface PeopleListReqType {
  lessondateId: number;
}

interface CancleLessonResType {
  message: string;
  success: boolean;
}
