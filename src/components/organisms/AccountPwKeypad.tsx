import { FC, useEffect, useState } from 'react';
import { PasswordKeypad } from '../molecules/PasswordKeypad';
import { ModalBottomContainer } from './ModalBottomContainer';

type AccountasswordType = {
  [number: number]: number;
};

interface IProps {
  handleClickedPassword: (pw: string) => void;
  onClose: () => void;
}

export const AccountPwKeypad: FC<IProps> = ({
  handleClickedPassword,
  onClose,
}) => {
  const [password, setPassword] = useState<AccountasswordType>({
    1: -1,
    2: -1,
    3: -1,
    4: -1,
  });
  const [current, setCurrent] = useState<number>(1);

  const onChangePassword = (number: number) => {
    if (current > 4) return;
    setPassword({ ...password, [current]: number });
    setCurrent((prev) => (prev += 1));
  };

  const canclePassword = () => {
    if (current < 2) return;
    setPassword({ ...password, [current - 1]: -1 });
    setCurrent((prev) => (prev -= 1));
  };

  useEffect(() => {
    if (password[4] !== -1) {
      let resultPw: string = '';
      [1, 2, 3, 4].map((num) => (resultPw += password[num]));
      handleClickedPassword(resultPw);
      setPassword({ 1: -1, 2: -1, 3: -1, 4: -1 });
      setCurrent(1);
    }
  }, [password]);

  return (
    <ModalBottomContainer onClose={onClose} color='#373A4D'>
      <h3 className='flex text-white font-hanaRegular text-base mb-2'>
        계좌비밀번호
      </h3>
      <div className='flex justify-center items-center gap-5'>
        {[1, 2, 3, 4].map((num: number, index) => (
          <div
            key={index}
            className={`w-4 h-4 border-[1px] border-white/50 rounded-full ${password[num] !== -1 && 'bg-white'}`}
          ></div>
        ))}
      </div>
      <PasswordKeypad
        isLogin={false}
        handleChangePw={onChangePassword}
        handleCancle={canclePassword}
      />
    </ModalBottomContainer>
  );
};
