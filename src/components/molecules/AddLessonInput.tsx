import { Ref, forwardRef } from 'react';
import { AddLessonInputLabel } from '../Atom/AddLessonInputLabel';

interface IProps {
  type: string;
  title: string;
  placeholder: string;
  onChange: () => void;
}

export const AddLessonInput = forwardRef(
  (props: IProps, ref: Ref<HTMLInputElement>) => {
    return (
      <AddLessonInputLabel title={props.title}>
        <input
          ref={ref}
          type={props.type}
          placeholder={props.placeholder}
          maxLength={props.type === 'text' ? 50 : undefined}
          min={props.type === 'number' ? 0 : undefined}
          onChange={props.onChange}
          className='w-full rounded border-[0.7px] border-hanaSilver text-xs placeholder:text-hanaSilver p-2 focus:outline-none'
        />
      </AddLessonInputLabel>
    );
  }
);
