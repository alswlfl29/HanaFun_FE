import { useEffect, useState } from 'react';
import { PasswordKeypad } from '../../components/molecules/PasswordKeypad';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { setCookie } from '../../utils/cookie';
import { useModal } from '../../context/ModalContext';

type PasswordType = {
  [number: number]: number;
};

export const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<PasswordType>({
    1: -1,
    2: -1,
    3: -1,
    4: -1,
    5: -1,
    6: -1,
  });
  const [current, setCurrent] = useState<number>(1);
  const [isFalse, setIsFalse] = useState<boolean>(false);

  const { mutate: login } = useMutation({
    mutationFn: (password: string) => {
      const res = ApiClient.getInstance().postLogin(password);
      return res;
    },
    onSuccess: (data) => {
      if (data.isSuccess) {
        if (data.data?.jwt && data.data.userName) {
          setCookie('token', data.data.jwt);
          setCookie('username', data.data.userName);
          navigate('/');
        }
      }
    },
    onError: (error: ErrorType) => {
      if (!error.isSuccess) {
        setIsFalse(true);
        setPassword({
          1: -1,
          2: -1,
          3: -1,
          4: -1,
          5: -1,
          6: -1,
        });
        setCurrent(1);
      }
    },
  });

  const onChangePassword = (number: number) => {
    if (current > 6) return;
    setPassword({ ...password, [current]: number });
    setCurrent((prev) => (prev += 1));
  };

  const canclePassword = () => {
    if (current < 2) return;
    setPassword({ ...password, [current - 1]: -1 });
    setCurrent((prev) => (prev -= 1));
  };

  const sendLogin = () => {
    let resultPw = '';
    [1, 2, 3, 4, 5, 6].map((num) => (resultPw += password[num]));
    login(resultPw);
  };

  useEffect(() => {
    if (password[6] !== -1) sendLogin();
  }, [password]);

  return (
    <div className='bg-[#373A4D] h-screen pt-40 flex flex-col items-center'>
      <h3 className='text-white font-hanaMedium text-xl'>간편비밀번호 입력</h3>
      {isFalse && (
        <p className='font-hanaLight text-white/50 text-sm mt-1'>
          비밀번호를 다시 입력하세요.
        </p>
      )}
      <div
        className={`flex justify-center items-center gap-5 ${isFalse ? 'mt-4' : 'mt-10'}`}
      >
        {[1, 2, 3, 4, 5, 6].map((num: number, index) => (
          <div
            key={index}
            className={`w-4 h-4 border-[1px] border-white/50 rounded-full ${password[num] !== -1 && 'bg-white'}`}
          ></div>
        ))}
      </div>
      <div className='w-full absolute bottom-0 left-0 pb-16'>
        <PasswordKeypad
          isLogin={false}
          handleChangePw={onChangePassword}
          handleCancle={canclePassword}
        />
      </div>
    </div>
  );
};
