import { HostLessonInfo } from '../molecules/HostLessonInfo';

interface IProps {
  data: HostLessonType[] | undefined;
}

export const HostLessonSlider = ({ data }: IProps) => {
  console.log(data);
  return (
    <div className='h-80 mt-5 pb-2 flex flex-col items-center overflow-y-scroll scrollbar-hide'>
      {data?.map((lesson, idx) => (
        <HostLessonInfo
          key={lesson.lessonId || idx}
          lessonId={lesson.lessonId}
          image={lesson.image}
          title={lesson.title}
        />
      ))}
    </div>
  );
};
