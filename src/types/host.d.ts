import { AccountType } from './account';
import { LessonType } from './lesson';

type CreateHostReqType = {
  accountId: number;
  introduction: string;
};

type CreateHostResType = {
  hostId: number;
};

type HostInfoType = {
  account: AccountType;
  lessonList: LessonType[];
};
