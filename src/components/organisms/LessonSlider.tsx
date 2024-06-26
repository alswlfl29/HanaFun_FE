import { LessonCard } from '../molecules/LessonCard';

interface IProps {
  data: Array<LessonType> | undefined;
}

export const LessonSlider = ({ data }: IProps) => {
  return (
    <div className='mt-5 pb-1 overflow-x-scroll whitespace-nowrap scrollbar-hide'>
      {data?.map((myLesson) => (
        <div key={myLesson.lesson_id} className='inline-block'>
          <LessonCard
            image={myLesson.image}
            title={myLesson.title}
            category={myLesson.location}
            date={myLesson.date}
          />
        </div>
      ))}
    </div>
  );
};
