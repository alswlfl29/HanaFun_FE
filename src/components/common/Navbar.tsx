import { Link, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const navbarItems = [
  {
    id: 1,
    location: '/',
    inActive_icons: 'images/navbar/inactive_home.svg',
    active_icons: 'images/navbar/active_home.svg',
    name: '홈',
  },
  {
    id: 2,
    location: '/search',
    inActive_icons: 'images/navbar/inactive_search.svg',
    active_icons: 'images/navbar/active_search.svg',
    name: '클래스탐색',
  },
  {
    id: 3,
    location: '/2',
    inActive_icons: 'images/navbar/inactive_add.svg',
    active_icons: 'images/navbar/active_add.svg',
    name: '클래스개설',
  },
  {
    id: 4,
    location: '/3',
    inActive_icons: 'images/navbar/inactive_mypage.svg',
    active_icons: 'images/navbar/active_mypage.svg',
    name: '마이페이지',
  },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <Outlet />
      <div className='fixed max-w-[390px] bottom-0 bg-white w-full px-10 py-4 flex justify-between items-center rounded-t-[30px] drop-shadow-[0px_-1px_10px_rgba(0,0,0,0.25)]'>
        {navbarItems.map((item) => (
          <Link
            to={item.location}
            key={item.id}
            className='flex flex-col justify-center items-center cursor-pointer hover:text-hanaGreen'
          >
            <img
              src={
                location.pathname === item.location
                  ? item.active_icons
                  : item.inActive_icons
              }
              alt={item.name}
              className='mb-1'
            />
            <span
              className={`text-sm font-hanaMedium mt-1 ${location.pathname === item.location ? 'text-hanaNavGreen' : 'text-hanaNavGray'}`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};
