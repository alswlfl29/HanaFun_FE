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
}

interface CategoryType {
  categoryId: number;
  categoryName: string;
}
