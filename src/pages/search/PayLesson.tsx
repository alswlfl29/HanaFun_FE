import { Button } from '../../components/common/Button';
import { Topbar } from '../../components/common/Topbar';

export const PayLesson = () => {
  return (
    <>
      <Topbar title='결제' onClick={() => console.log('dd')} />
      <Button
        message='다음'
        isActive={false}
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};
