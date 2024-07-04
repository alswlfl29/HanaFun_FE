interface LessonType {
  lessonId: number;
  title: string;
}

interface LessonDateCommonType {
  date: Date;
  startTime: Date;
  endTime: Date;
}

interface LessonDateType extends LessonDateCommonType {
  lessondateId: number;
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

interface CreateLessonReqType {
  categoryId: number;
  title: string;
  location: string;
  price: number;
  capacity: number;
  image: string;
  description: string;
  materials: string;
  lessonDate: LessonDateCommonType[];
}
