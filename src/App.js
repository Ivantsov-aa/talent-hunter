import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import useGeoLocation from "react-ipgeolocation";

import WrapperForGuests from "./components/wrapper-guests";
import WrapperForUsers from "./components/wrapper-users";

import MainPage from './components/auth-users/main-page';
import Profile from './components/auth-users/profile';
import News from './components/auth-users/news';
import Direct from './components/auth-users/direct';
import Friends from './components/auth-users/friends';
import Castings from './components/auth-users/castings';
import CastingBlock from "./components/auth-users/castings/casting-block";
import Gallery from './components/auth-users/gallery';
import GalleryPhoto from "./components/auth-users/gallery/gallery-photo";
import GalleryVideo from "./components/auth-users/gallery/gallery-video";
import GalleryMusic from "./components/auth-users/gallery/gallery-music";
import Settings from './components/auth-users/settings';
import Favorites from './components/auth-users/favorites';

import ProfileFeed from "./components/auth-users/profile/feed";
import ProfileNearby from "./components/auth-users/profile/nearby";
import SettingsAccount from "./components/auth-users/settings/settings-account";
import SettingsBasic from "./components/auth-users/settings/settings-basic";
import AddCasting from "./components/auth-users/castings/add-casting";
import RegistrationContainer from "./components/authorization/registration-container";
import AuthorizationPopUp from "./components/authorization/authorization-pop-up";
import RegistrationCustomer from "./components/authorization/registration-customer";

const App = ({ store }) => {
  const [themeMode, setThemeMode] = useState('light');
  const [stylesBeforeOpenPopUp, setChangesStyle] = useState('');
  const [stateAsideFilter, setStateAsideFilter] = useState(false);
  const [stateSearchFilter, setStateSearchFilter] = useState(false);

  const [userAuthData, setUserAuthData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLogged, setStateLogged] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const urlLocation = useLocation();
  const location = useGeoLocation();

  const userIdLS = localStorage.getItem('userId');

  let arrayUsers = JSON.parse(localStorage.getItem('users'));
  if (arrayUsers === null) arrayUsers = [];

  useEffect(() => {
    if (!isLogged) {
      arrayUsers.map(user => {
        if (user && user.is_logged) {
          setAuthUser(user);
          setStateLogged(true);
        }
        return user;
      })
    }

    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
    return () => window.removeEventListener('resize', () => setInnerWidth(window.innerWidth));
  }, [arrayUsers, isLogged])

  const authorizationSubmit = id => {
    arrayUsers.forEach(user => {
      if (user.user_id === id) {
        setAuthUser(user)
        setStateLogged(true)
      }
    });
    const loggedUser = arrayUsers.map(user => user.user_id === id ? { ...user, is_logged: true } : { ...user, is_logged: false });
    localStorage.setItem('users', JSON.stringify(loggedUser));
    setChangesStyle('');
  }

  const registrationSubmit = (data, success) => {
    if (success === 'verification') {
      setUserAuthData(data);

    } else if (success === 'quastionnaire') {
      localStorage.setItem('userId', userIdLS ? +userIdLS + 1 : 1);
      const userIdToArray = localStorage.getItem('userId');
      setUserId(userIdToArray);
      arrayUsers.push({ ...data, user_id: userIdToArray, ...userAuthData });
      localStorage.setItem('users', JSON.stringify(arrayUsers));

    } else {
      const addPhotoToUser = arrayUsers.map(user => user.user_id === userId ? { ...user, user_photo: data, is_logged: true } : { ...user })
      localStorage.setItem('users', JSON.stringify(addPhotoToUser));
      setAuthUser({ ...data, is_logged: true, user_photo: data });
      setStateLogged(true);
    }
  }

  const handleLogOut = () => {
    const logOutUser = arrayUsers.map(user => user.user_id === authUser.user_id ? { ...user, is_logged: false } : { ...user });
    localStorage.setItem('users', JSON.stringify(logOutUser));
    setStateLogged(false);
    setAuthUser(null);
    navigate('/');
  }

  return (
    <div className={`wrapper ${stylesBeforeOpenPopUp} ${stateAsideFilter || stateSearchFilter ? 'open_filter' : ''}`}>
      <Routes>
        <Route
          path='/'
          element={authUser ?
            <WrapperForUsers
              urlLocation={urlLocation}
              authUser={authUser}
              isLogged={isLogged}
              themeMode={themeMode}
              innerWidth={innerWidth}
              setThemeMode={setThemeMode}
              setStateLogged={setStateLogged}
              handleLogOut={handleLogOut}
              stateAsideFilter={stateAsideFilter}
              setStateAsideFilter={setStateAsideFilter}
              castingsLength={store.castings.length}
            />
            :
            <WrapperForGuests
              store={store}
              location={location}
              stylesBeforeOpenPopUp={stylesBeforeOpenPopUp}
              navigate={navigate}
              setChangesStyle={setChangesStyle}
              registrationSubmit={registrationSubmit}
              authorizationSubmit={authorizationSubmit}
              setStateAsideFilter={setStateAsideFilter}
              arrayUsers={arrayUsers}
              innerWidth={innerWidth}
            />
          }
        >
          <Route path='/' element={<MainPage
            stateSearchFilter={stateSearchFilter}
            setChangesStyle={setChangesStyle}
            setStateAsideFilter={setStateAsideFilter}
            setStateSearchFilter={setStateSearchFilter}
            users={store.users}
            castings={store.castings}
            innerWidth={innerWidth}
          />} />
          <Route path='/profile/' element={<Profile authUser={authUser} urlLocation={urlLocation.pathname} />}>
            <Route path='/profile/' element={<ProfileFeed authUser={authUser} />} />
            <Route path='nearby' element={<ProfileNearby />} />
            {/* <Route path='nearby' element={<ProfileNearby />} /> */}
            {/* <Route path='nearby' element={<ProfileNearby />} /> */}
          </Route>
          <Route path='/news' element={
            <News
              authUser={authUser}
              stateSearchFilter={stateSearchFilter}
              setStateSearchFilter={setStateSearchFilter}
              setStateAsideFilter={setStateAsideFilter}
            />}
          />
          <Route path='/direct' element={<Direct />} />
          <Route path='/friends' element={<Friends setStateAsideFilter={setStateAsideFilter} />} />
          <Route path='/gallery' element={<Gallery urlLocation={urlLocation.pathname} />}>
            <Route path='photo' element={<GalleryPhoto
              portfolioPhoto={authUser && authUser.portfolio_photo}
            />} />
            <Route path='video' element={<GalleryVideo
              portfolioVideo={authUser && authUser.portfolio_video}
            />} />
            <Route path='audio' element={<GalleryMusic
              portfolioMusic={authUser && authUser.portfolio_music}
            />} />
          </Route>
          <Route path='/favorites' element={<Favorites users={store.users} setStateAsideFilter={setStateAsideFilter} />} />
          <Route path='/settings' element={<Settings urlLocation={urlLocation.pathname} authUser={authUser} />}>
            <Route path='account' element={<SettingsAccount />} />
            <Route path='basic' element={<SettingsBasic authUser={authUser} setAuthUser={setAuthUser} arrayUsers={arrayUsers} />} />
          </Route>
          <Route path='/castings' element={<Castings setStateAsideFilter={setStateAsideFilter} />} />
          <Route path='/castings/:id' element={<CastingBlock setStateAsideFilter={setStateAsideFilter} urlLocation={urlLocation.pathname} castings={store.castings} />} />
          <Route path='/castings/add/:id' element={<AddCasting location={location} setStateAsideFilter={setStateAsideFilter} />} />
        </Route>
        <Route path='registration' element={
          <RegistrationContainer
            registrationSubmit={registrationSubmit}
            location={location}
            navigate={navigate}
            stylesBeforeOpenPopUp={stylesBeforeOpenPopUp}
            setChangesStyle={setChangesStyle}
          />
        } />
        <Route path='/registration/customer' element={<RegistrationCustomer registrationSubmit={registrationSubmit} navigate={navigate} />} />
        <Route path='auth' element={
          <AuthorizationPopUp
            authorizationSubmit={authorizationSubmit}
            location={location}
            arrayUsers={arrayUsers}
          />
        } />
      </Routes>
    </div >
  );
}

export default App;
