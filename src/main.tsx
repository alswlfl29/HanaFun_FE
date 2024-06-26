import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/main/Home.tsx';
import { ModalProvider } from './context/ModalContext.tsx';
import Modal from './components/common/Modal.tsx';
import { Navbar } from './components/common/Navbar.tsx';
import { HanaMain } from './pages/main/HanaMain.tsx';
import { Login } from './pages/auth/Login.tsx';
import { HanaFunMain } from './pages/main/HanaFunMain.tsx';
import { QRPay } from './pages/main/QRPay.tsx';
import MyPage from './pages/mypage/MyPage.tsx';
import { LessonCalendar } from './pages/mypage/LessonCalendar.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/main', element: <HanaMain /> },
      { path: '/login', element: <Login /> },
      { path: '/qr-pay', element: <QRPay /> },
      {
        element: <Navbar />,
        children: [
          { index: true, element: <HanaFunMain /> },
          { path: '/mypage', element: <MyPage /> },
          { path: '/lessonCalendar', element: <LessonCalendar /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModalProvider>
      <Modal />
      <RouterProvider router={router} />
    </ModalProvider>
  </React.StrictMode>
);
