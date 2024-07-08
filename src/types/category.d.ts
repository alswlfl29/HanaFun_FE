interface SearchLessonReqType {
  query: string;
  sort: string;
}

interface SearchLessonResType {
  lessonId: number;
  image: string;
  title: string;
  price: number;
  hostName: string;
  applicantSum: number;
}

interface CategoryType {
  categoryId: number;
  categoryName: string;
}
