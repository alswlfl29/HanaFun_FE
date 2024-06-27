interface LessonType extends CommonLessonType {
  reservation_id: number;
  lessondate_id: number;
  lesson_id: number;
  image: string;
  title: string;
  location: string;
  date: string;
}

interface MyLessonType extends LessonType {
  point: number;
  lessons: LessonType[];
}
