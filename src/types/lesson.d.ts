interface LessonType {
  lessonId: number;
  title: string;
}

interface LessonDateType {
  lessondateId: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  quantityLeft: number;
}

interface LessonDetailType {
  lesson_id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  location: string;
  materials: string;
  capacity: number;
  categoryName: string;
}
