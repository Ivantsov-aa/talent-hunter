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

import ProfileCastings from "./components/auth-users/profile/castings";
import ProfilePhotos from "./components/auth-users/profile/photos";
import ProfileVideo from "./components/auth-users/profile/videos";
import ProfileAudio from "./components/auth-users/profile/audio";
import SettingsAccount from "./components/auth-users/settings/settings-account";
import SettingsBasic from "./components/auth-users/settings/settings-basic";
import AddCasting from "./components/auth-users/castings/add-casting";
import RegistrationContainer from "./components/authorization/registration-container";
import AuthorizationPopUp from "./components/authorization/authorization-pop-up";
import RegistrationCustomer from "./components/authorization/registration-customer";
import RegistrationPerformer from "./components/authorization/registration-performer";

const url = 'https://imperia.redportal.ru/api';
const token = 'wjLEnK5TcIAfrBhLEn';

const App = ({ store }) => {
  const [themeMode, setThemeMode] = useState('light');
  const [stylesBeforeOpenPopUp, setChangesStyle] = useState('');
  const [stateAsideFilter, setStateAsideFilter] = useState(false);
  const [stateSearchFilter, setStateSearchFilter] = useState(false);

  const [isLogged, setStateLogged] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [galleryLoading, setGalleryLoading] = useState({ value: 0, state: false });

  const navigate = useNavigate();
  const urlLocation = useLocation();
  const location = useGeoLocation();

  useEffect(() => {
    let user = localStorage.getItem('phone');
    if (!isLogged && user) {
      authorizationSubmit(user);
    }

    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
    return () => window.removeEventListener('resize', () => setInnerWidth(window.innerWidth));
  }, [isLogged])

  const authorizationSubmit = async (phone) => {
    await fetch(`${url}/getUsersInfo/${token}/${phone}`)
      .then(response => response.json())
      .then(result => {
        setAuthUser(result);
        setStateLogged(true);
        localStorage.setItem('phone', phone);
        navigate('/');
      })
  }

  const handleLogOut = () => {
    setStateLogged(false);
    localStorage.removeItem('phone');
    setAuthUser(null);
    navigate('/');
  }

  return (
    <div className={`wrapper ${isLogged ? 'logged_wrapper' : ''} ${stylesBeforeOpenPopUp} ${stateAsideFilter || stateSearchFilter ? 'open_filter' : ''}`}>
      <Routes>
        <Route
          path='/'
          element={authUser ?
            <WrapperForUsers
              urlLocation={urlLocation}
              authUser={authUser}
              url={url}
              token={token}
              isLogged={isLogged}
              themeMode={themeMode}
              innerWidth={innerWidth}
              setThemeMode={setThemeMode}
              setStateLogged={setStateLogged}
              handleLogOut={handleLogOut}
              stateAsideFilter={stateAsideFilter}
              setStateAsideFilter={setStateAsideFilter}
              castingsLength={store.castings.length}
              setAuthUser={setAuthUser}
              galleryLoading={galleryLoading}
            />
            :
            <WrapperForGuests
              store={store}
              location={location}
              stylesBeforeOpenPopUp={stylesBeforeOpenPopUp}
              navigate={navigate}
              setChangesStyle={setChangesStyle}
              authorizationSubmit={authorizationSubmit}
              setStateAsideFilter={setStateAsideFilter}
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
            role={authUser && authUser.role}
            url={url}
            token={token}
            innerWidth={innerWidth}
          />} />
          <Route path='/profile/' element={<Profile authUser={authUser} themeMode={themeMode} innerWidth={innerWidth} urlLocation={urlLocation.pathname} setStateAsideFilter={setStateAsideFilter} />}>
            {authUser && authUser.role === 'Заказчик' && <Route path='/profile/' element={<ProfileCastings url={url} token={token} authUser={authUser} />} />}
            <Route path={authUser && authUser.role === 'Исполнитель' ? '/profile/' : 'photo'} element={<ProfilePhotos gallery={authUser && authUser.gallery_photos} />} />
            <Route path='video' element={<ProfileVideo gallery={authUser && authUser.gallery_video} />} />
            <Route path='audio' element={<ProfileAudio />} />
          </Route>
          <Route path='/news' element={
            <News
              authUser={authUser}
              stateSearchFilter={stateSearchFilter}
              setStateSearchFilter={setStateSearchFilter}
              setStateAsideFilter={setStateAsideFilter}
            />}
          />
          <Route path='/direct' element={<Direct innerWidth={innerWidth} setStateAsideFilter={setStateAsideFilter} />} />
          <Route path='/friends' element={<Friends setStateAsideFilter={setStateAsideFilter} />} />
          <Route path='/gallery' element={<Gallery url={url} token={token} authUser={authUser} setAuthUser={setAuthUser} galleryLoading={galleryLoading} setGalleryLoading={setGalleryLoading} urlLocation={urlLocation.pathname} setStateAsideFilter={setStateAsideFilter} />}>
            <Route path='photo' element={<GalleryPhoto
              gallery={authUser && authUser.gallery_photos}
            />} />
            <Route path='video' element={<GalleryVideo
              gallery={authUser && authUser.gallery_video}
            />} />
            <Route path='audio' element={<GalleryMusic
            />} />
          </Route>
          <Route path='/favorites' element={<Favorites users={store.users} setStateAsideFilter={setStateAsideFilter} />} />
          <Route path='/settings' element={<Settings urlLocation={urlLocation.pathname} authUser={authUser} setStateAsideFilter={setStateAsideFilter} />}>
            <Route path='account' element={<SettingsAccount innerWidth={innerWidth} />} />
            <Route path='basic' element={<SettingsBasic url={url} token={token} authUser={authUser} setAuthUser={setAuthUser} />} />
          </Route>
          <Route path='/castings' element={<Castings url={url} token={token} authUser={authUser} setStateAsideFilter={setStateAsideFilter} />} />
          <Route path='/castings/:id' element={<CastingBlock authUser={authUser} setStateAsideFilter={setStateAsideFilter} url={url} token={token} />} />
          <Route path='/castings/add' element={<AddCasting url={url} token={token} navigate={navigate} userId={authUser && authUser.id} location={location} setStateAsideFilter={setStateAsideFilter} />} />
        </Route>
        <Route path='/registration' element={
          <RegistrationContainer
            location={location}
            navigate={navigate}
            stylesBeforeOpenPopUp={stylesBeforeOpenPopUp}
            setChangesStyle={setChangesStyle}
            url={url}
            token={token}
          />
        } />
        <Route path='/registration/customer' element={<RegistrationCustomer authorizationSubmit={authorizationSubmit} navigate={navigate} />} />
        <Route path='/registration/executor' element={<RegistrationPerformer authorizationSubmit={authorizationSubmit} navigate={navigate} />} />
        <Route path='auth' element={
          <AuthorizationPopUp
            authorizationSubmit={authorizationSubmit}
            location={location}
            url={url}
            token={token}
          />
        } />
      </Routes>
    </div >
  );
}

export default App;
