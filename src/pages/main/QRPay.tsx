import { useLocation, useNavigate } from 'react-router-dom';
import { Topbar } from '../../components/common/Topbar';
import { qrUserInfo } from '../../components/molecules/QRScanner';
import { Button } from '../../components/common/Button';

export const QRPay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo: qrUserInfo = location.state;

  return (
    <>
      <Topbar title='QR결제' onClick={() => navigate('/')} />
      <div>유저 아이디: {userInfo.userId}</div>
      <div>유저 계좌 아이디: {userInfo.accountId}</div>
      <div>유저 계좌번호: {userInfo.accountNumber}</div>
      <Button message='결제' onClick={() => console.log('결제')} />
    </>
  );
};
