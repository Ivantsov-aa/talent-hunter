import React from "react";
import { Link, Outlet } from "react-router-dom";

class Settings extends React.Component {
    componentDidMount() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    render() {
        const { urlLocation, authUser } = this.props;
        const currentUrl = urlLocation.split('/').pop();

        return (
            <section className='settings__wrapper'>
                <div className='user_title'>
                    <h1>Настройки</h1>
                    <button className='hamburger_btn'><span></span><span></span></button>
                </div>
                <nav>
                    <Link to='/settings/basic' className={`nav_btn ${currentUrl === 'basic' ? 'active' : ''}`}>Основное</Link>
                    <Link to='/settings/account' className={`nav_btn ${currentUrl === 'account' ? 'active' : ''}`}>Аккаунт</Link>
                </nav>
                <Outlet />
            </section>
        )
    }
}

export default Settings;