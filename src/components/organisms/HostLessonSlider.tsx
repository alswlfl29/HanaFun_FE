import { HostLessonInfo } from '../molecules/HostLessonInfo';

interface IProps {
  data: HostLessonInfoType[] | undefined;
}

export const HostLessonSlider = ({ data }: IProps) => {
  return (
    <div className='h-80 mt-5 pt-20 pb-2 flex flex-col items-center justify-center overflow-y-scroll scrollbar-hide'>
      {data?.map((lesson) => (
        <HostLessonInfo
          key={lesson.lesson_id}
          lesson_id={lesson.lesson_id}
          image={lesson.image}
          title={lesson.title}
        />
      ))}
    </div>
  );
};
