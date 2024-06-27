interface LessonListProps {
  selectedLesson: CommonLessonType[];
  handleLessonDetail: (lesson_id: number) => void;
}

export const LessonList = ({
  selectedLesson,
  handleLessonDetail,
}: LessonListProps) => {
  return (
    <div className='mt-3 px-5 py-4 w-[351px] h-[122px] bg-white rounded-2xl border-[1px] border-hanaSilver overflow-y-auto'>
      {selectedLesson.length > 0 ? (
        selectedLesson.map((lesson) => (
          <p
            key={lesson.lesson_id}
            className='font-hanaRegular text-base cursor-pointer'
            onClick={() => handleLessonDetail(lesson.lesson_id)}
          >
            {lesson.title}
          </p>
        ))
      ) : (
        <p className='flex font-hanaRegular text-center items-center justify-center text-s text-hanaSilver'>
          일정이 없습니다.
        </p>
      )}
    </div>
  );
};
