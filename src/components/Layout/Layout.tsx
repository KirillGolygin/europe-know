import { Outlet } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks/redux-hooks';
import {
  selectCurrentUser,
  selectSigninError,
  selectRegisterSuccessed,
  selectIsAlreadyRegistered
} from '../../redux/users-slice';
import { selectPopup } from '../../redux/popups-slice';

import Header from '../Header/Header';

import './Layout.scss';

const Layout = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const popup = useAppSelector(selectPopup);
  const signinError = useAppSelector(selectSigninError);
  const regStatus = useAppSelector(selectRegisterSuccessed);
  const isRegistered = useAppSelector(selectIsAlreadyRegistered);
  return (
    <>
      <Header
        currentUser={currentUser}
        popup={popup}
        signinError={signinError}
        regStatus={regStatus}
        isRegistered={isRegistered}
      />
      <main className="main">
        <div className="layout-wrapper">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
