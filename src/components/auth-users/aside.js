import React from "react";
import { Link } from "react-router-dom";

const navBar = [
    {
        value: 'Моя страница',
        path: 'profile',
        icon: '/images/aside/profile-icon.svg'
    },
    {
        value: 'Новости',
        path: 'news',
        icon: '/images/aside/news-icon.svg'
    },
    {
        value: 'Direct',
        path: 'direct',
        icon: '/images/aside/direct-icon.svg'
    },
    {
        value: 'Друзья',
        path: 'friends',
        icon: '/images/aside/friends-icon.svg'
    },
    {
        value: 'Мои кастинги и отклики',
        path: 'castings',
        icon: '/images/aside/castings-icon.svg'
    },
    {
        value: 'Галерея',
        path: 'gallery/photo',
        icon: '/images/aside/gallery-icon.svg'
    },
    {
        value: 'Избранное',
        path: 'favorites',
        icon: '/images/aside/favorites-icon.svg'
    },
    {
        value: 'Настройки профиля',
        path: 'settings/basic',
        icon: '/images/aside/settings-icon.svg'
    }
];

class Aside extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateStatus: false,
            statusValue: '',
            scroll: 0
        }

        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.wrapperRefAside = React.createRef();
        this.setWrapperRefAside = this.setWrapperRefAside.bind(this);
        this.handleClickOutsideAside = this.handleClickOutsideAside.bind(this);
    }

    componentDidMount() {
        const { innerWidth } = this.props;
        document.addEventListener('mousedown', this.handleClickOutside);
        innerWidth <= 1024 && document.addEventListener('mousedown', this.handleClickOutsideAside);
    }

    componentWillUnmount() {
        const { innerWidth } = this.props;
        document.removeEventListener('mousedown', this.handleClickOutside);
        innerWidth <= 1024 && document.removeEventListener('mousedown', this.handleClickOutsideAside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    setWrapperRefAside(node) {
        this.wrapperRefAside = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
            this.setState({ stateStatus: false });
        }
    }

    handleClickOutsideAside(event) {
        const { stateMobileAside, setStateAsideFilter } = this.props;
        if (this.wrapperRefAside.current && !this.wrapperRefAside.current.contains(event.target)) {
            stateMobileAside(false);
            setStateAsideFilter(false);
            document.body.style.overflowY = 'scroll';
        }
    }

    handleStatusClick = () => {
        this.setState({ stateStatus: true })
    }

    render() {
        const { stateStatus, statusValue, scroll } = this.state;
        const { authUser, mobileAside, innerWidth, stateMobileAside, handleLogOut } = this.props;
        window.addEventListener('scroll', e => this.setState({ scroll: window.scrollY }))

        return (
            <aside className={mobileAside ? 'open' : ''} ref={this.wrapperRefAside}>
                <div className={scroll > 80 ? 'scroll' : ''}>
                    <section className='user_info'>
                        <div className='user_title'>
                            <div className='user_logo'>
                                <img src={authUser.user_photo} alt='customer-logo' />
                            </div>
                            <p>200</p>
                        </div>
                        <h2>{authUser.brand_name}</h2>
                        {stateStatus ?
                            <textarea className='user_status_area' type='text' value={statusValue} placeholder='Введите статус...' onChange={e => this.setState({ statusValue: e.target.value })} ref={this.wrapperRef} />
                            :
                            <p className='user_status' onClick={this.handleStatusClick}>{statusValue ? statusValue : 'Введите статус...'}</p>
                        }
                    </section>
                    <nav>
                        <ul>
                            {navBar.map((nav, i) => (
                                <li key={i}><Link to={`/${nav.path}`} onClick={() => innerWidth <= 1024 && stateMobileAside(false)}><img src={nav.icon} alt='nav-icon' /><span>{nav.value}</span></Link></li>
                            ))}
                        </ul>
                        <button className='log-out_btn' onClick={handleLogOut}><img src='/images/aside/log-out-icon.svg' alt='log-out-icon' /><span>Выйти из профиля</span></button>
                    </nav>
                    <footer>

                    </footer>
                </div>
            </aside >
        )
    }
}

export default Aside;