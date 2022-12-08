import React from "react";
import { Link, Outlet } from "react-router-dom";

class Profile extends React.Component {
    componentDidMount() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    handleUploadPhotoToFeed = e => {
        const { authUser } = this.props;
        let arrayUsers = JSON.parse(localStorage.getItem('users'));
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onload = () => {
            const addPhotosToFeed = authUser.feedPhotos && Array.isArray(authUser.feedPhotos) ?
                arrayUsers.map(user => user.user_id === authUser.user_id ? { ...user, feedPhotos: authUser.feedPhotos.push(reader.result) } : { ...user })
                :
                arrayUsers.map(user => user.user_id === authUser.user_id ? { ...user, feedPhotos: [reader.result] } : { ...user })

            localStorage.setItem('users', JSON.stringify(addPhotosToFeed));
        }

        reader.readAsDataURL(file);
    }

    render() {
        const { authUser, urlLocation } = this.props;
        const location = urlLocation.split('/').pop();

        return (
            <section className='profile__wrapper'>
                <div className='user_title'>
                    <div>
                        <div className='profile_avatar'>
                            <p>Рейтинг<span>9,5</span></p>
                            <img src={authUser.user_photo} alt='profile-logo' />
                        </div>
                        <div className='profile_content'>
                            <div className='statistic'>
                                <p>ПОДПИСЧИКОВ<span>2564</span></p>
                                <p>ПОДПИСКИ<span>2564</span></p>
                                <p>ЛАЙКОВ<span>5К</span></p>
                            </div>
                            <h1>{authUser.brand_name}</h1>
                            <h3>{authUser.company_city}</h3>
                            <p>Первая профессиональная модельная школа в Севастополе и по Крымскому федеральному округу.</p>
                            <div className='social_network'>
                                <a href='#'><img src='/images/icons/instagram-icon.svg' alt='instagram-icon' /></a>
                                <a href='#'><img src='/images/icons/vk-icon.svg' alt='vk-icon' /></a>
                                <a href='#'><img src='/images/icons/facebook-icon.svg' alt='facebook-icon' /></a>
                            </div>
                            <div className='categories'>
                                <button>КАСТИНГИ</button>
                                <button>ОТКЛИКИ</button>
                                <button>ПРОФИЛЬ</button>
                            </div>
                        </div>
                    </div>
                    <button className='hamburger_btn'><span></span><span></span></button>
                </div>
                <div>
                    <label className='upload_post'>
                        <input type='file' onChange={this.handleUploadPhotoToFeed} />
                        Добавить
                    </label>
                </div>
                <nav>
                    <Link to='/profile' className={location === 'profile' ? 'active' : ''}>
                        <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h18v18H0zM22 0h18v18H22zM22 22h18v18H22zM0 22h18v18H0z" /></svg>
                    </Link>
                    <Link to='/profile/nearby' className={location === 'nearby' ? 'active' : ''}>
                        <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 21.6a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-1.42 13.82a2.002 2.002 0 0 0 2.84 0l8.18-8.2a13.58 13.58 0 1 0-19.2 0l8.18 8.2Zm-8.12-18.74a9.62 9.62 0 0 1 4.26-7.1 9.62 9.62 0 0 1 10.56 0 9.64 9.64 0 0 1 1.5 14.82L24 31.18l-6.78-6.78a9.54 9.54 0 0 1-2.76-7.72ZM38 40H10a2 2 0 1 0 0 4h28a2 2 0 0 0 0-4Z" /></svg>
                    </Link>
                    <Link to='/profile/activity'>
                        <svg width="51" height="51" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.84 9.796A13.324 13.324 0 0 0 25.5 8.5 13.324 13.324 0 0 0 8.16 28.645l15.831 15.831a2.125 2.125 0 0 0 3.018 0L42.84 28.645a13.327 13.327 0 0 0 2.89-14.525 13.326 13.326 0 0 0-2.89-4.324ZM39.844 25.65 25.5 39.97 11.156 25.65a9.095 9.095 0 0 1 6.375-15.513 9.031 9.031 0 0 1 6.375 2.657 2.127 2.127 0 0 0 3.018 0 9.074 9.074 0 0 1 12.75 12.856h.17Z" /></svg>
                    </Link>
                    <Link to='/profile/account'>
                        <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.62 24.56a7.46 7.46 0 0 0 2-5 7.56 7.56 0 1 0-15.12 0 7.46 7.46 0 0 0 2 5 11.88 11.88 0 0 0-6.5 9.22 2.013 2.013 0 0 0 4 .44 8 8 0 0 1 15.88 0A2 2 0 0 0 34 36h.22a2 2 0 0 0 1.76-2.2 11.88 11.88 0 0 0-6.36-9.24ZM24 23.12A3.56 3.56 0 1 1 24 16a3.56 3.56 0 0 1 0 7.12ZM38 4H10a6 6 0 0 0-6 6v28a6 6 0 0 0 6 6h28a6 6 0 0 0 6-6V10a6 6 0 0 0-6-6Zm2 34a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v28Z" /></svg>
                    </Link>
                </nav>
                <section>
                    <Outlet />
                </section>
            </section>
        )
    }
}

export default Profile;