export type LessonType = {
  lessonId: number;
  title: string;
};

interface LessonDetailType {
  lesson_id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  location: string;
  materials: string;
  capacity: number;
  category_name: string;
}
