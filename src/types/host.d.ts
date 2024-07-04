interface CreateHostReqType {
  accountId: number;
  introduction: string;
}

interface CreateHostResType {
  hostId: number;
}

interface HostInfoType {
  account: AccountType;
  lessonList: LessonType[];
}
