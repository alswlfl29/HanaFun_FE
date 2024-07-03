export type SearchLessonReqType = {
  query: string;
  sort: string;
};

export type SearchLessonResType = {
  lesson_id: number;
  image: string;
  title: string;
  price: number;
  host_name: string;
};
