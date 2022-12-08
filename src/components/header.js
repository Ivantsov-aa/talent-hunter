import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateHamburgerMenu: false,
            scrollTop: 0,
            vhState: 1
        }

        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        const { isLogged } = this.props;
        !isLogged && document.addEventListener('mousedown', this.handleClickOutside);
        let vh = window.innerHeight * 0.01;
        this.setState({ vhState: vh });
        document.addEventListener('mousedown', this.updateDimensions);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('mousedown', this.updateDimensions);
    }

    updateDimensions = () => {
        let vh = window.innerHeight * 0.01;
        this.setState({ vhState: vh });
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        const { innerWidth, setStateAsideFilter } = this.props;

        if (innerWidth <= 1024 && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ stateHamburgerMenu: false })
            setStateAsideFilter(false);
            document.body.style.overflowY = 'scroll';
        }
    }

    handleHamburgerClick = (bool) => {
        if (bool) {
            document.body.style.overflowY = 'hidden';
            this.setState({ stateHamburgerMenu: true });
        } else {
            document.body.style.overflowY = 'scroll';
            this.setState({ stateHamburgerMenu: false });
        }
    }

    render() {
        const { stateHamburgerMenu, scrollTop, vhState } = this.state;
        const { isLogged, setThemeMode, mobileAside, stateMobileAside, innerWidth } = this.props;
        document.addEventListener('mousedown', this.updateDimensions);

        return (
            <header className={`${isLogged ? 'auth_user' : ''}`}>
                <div className='sticky__wrapper'>
                    <div className='header__wrapper'>
                        {isLogged && innerWidth <= 1024 &&
                            <button className={`hamburger-button ${stateHamburgerMenu ? (!isLogged ? 'open' : (mobileAside ? 'open' : '')) : ''}`} onClick={() => {
                                this.handleHamburgerClick(!stateHamburgerMenu)
                                stateMobileAside(true);
                            }}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        }
                        <div className='header__logo'>
                            <Link to='/'><img src='/images/logo.svg' alt='logo' /></Link>
                        </div>
                        {!isLogged ?
                            innerWidth > 1024 &&
                            <nav>
                                <ul>
                                    <li>О проекте</li>
                                    <li>О нас</li>
                                    <li>Отзывы</li>
                                    <li>Контакты</li>
                                </ul>
                                <div className='header_buttons'>
                                    <Link to='/registration'>Регистрация</Link>
                                    <Link to='/auth'>Войти</Link>
                                </div>
                            </nav>
                            :
                            (innerWidth > 1024 ?
                                <section className='auth-user_btn flex__wrapper'>
                                    <input type='text' name='user_search' placeholder='ПОИСК' />
                                    <div className='toggle-switch'>
                                        <input type='checkbox' id='toggle_mode' onChange={e => e.target.checked ? setThemeMode('dark') : setThemeMode('light')} />
                                        <label htmlFor='toggle_mode'>
                                            <span className='slider'></span>
                                        </label>
                                    </div>
                                </section>
                                :
                                <Link to='/settings/basic' className='settings'>
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.8154 10.2196L20.7929 9.54538L21.7453 7.64057C21.8418 7.44119 21.8741 7.21676 21.8377 6.99825C21.8013 6.77974 21.6979 6.57792 21.5419 6.42063L19.2626 4.14127C19.1045 3.98298 18.9007 3.87824 18.6799 3.84177C18.4592 3.8053 18.2326 3.83893 18.0319 3.93795L16.1271 4.89035L15.4529 2.86782C15.3817 2.657 15.2466 2.47362 15.0663 2.34319C14.886 2.21277 14.6695 2.14179 14.447 2.14014H11.2367C11.0123 2.13956 10.7935 2.2095 10.611 2.34008C10.4286 2.47066 10.2918 2.65527 10.22 2.86782L9.54587 4.89035L7.64106 3.93795C7.44168 3.8414 7.21725 3.80911 6.99874 3.84552C6.78023 3.88194 6.5784 3.98528 6.42112 4.14127L4.14176 6.42063C3.98347 6.57875 3.87873 6.78252 3.84226 7.00326C3.80579 7.22401 3.83942 7.45063 3.93843 7.65127L4.89084 9.55609L2.86831 10.2303C2.65749 10.3015 2.47411 10.4366 2.34368 10.6169C2.21326 10.7972 2.14228 11.0137 2.14063 11.2362V14.4465C2.14005 14.6709 2.20999 14.8897 2.34057 15.0722C2.47115 15.2546 2.65576 15.3914 2.86831 15.4632L4.89084 16.1373L3.93843 18.0422C3.84189 18.2415 3.80959 18.466 3.84601 18.6845C3.88243 18.903 3.98577 19.1048 4.14176 19.2621L6.42112 21.5415C6.57924 21.6997 6.783 21.8045 7.00375 21.841C7.22449 21.8774 7.45112 21.8438 7.65176 21.7448L9.55657 20.7924L10.2308 22.8149C10.3025 23.0274 10.4393 23.2121 10.6217 23.3426C10.8042 23.4732 11.023 23.5432 11.2474 23.5426H14.4577C14.6821 23.5432 14.9009 23.4732 15.0834 23.3426C15.2658 23.2121 15.4026 23.0274 15.4743 22.8149L16.1485 20.7924L18.0533 21.7448C18.2514 21.8389 18.4737 21.8699 18.69 21.8335C18.9063 21.7971 19.1061 21.6952 19.2626 21.5415L21.5419 19.2621C21.7002 19.104 21.805 18.9002 21.8414 18.6795C21.8779 18.4587 21.8443 18.2321 21.7453 18.0315L20.7929 16.1266L22.8154 15.4525C23.0262 15.3813 23.2096 15.2461 23.34 15.0658C23.4704 14.8855 23.5414 14.6691 23.5431 14.4465V11.2362C23.5436 11.0118 23.4737 10.793 23.3431 10.6106C23.2125 10.4281 23.0279 10.2914 22.8154 10.2196ZM21.4028 13.6761L20.1187 14.1041C19.8234 14.1999 19.5525 14.3588 19.3247 14.5697C19.0969 14.7807 18.9178 15.0386 18.7997 15.3257C18.6816 15.6128 18.6274 15.9222 18.6408 16.2323C18.6542 16.5425 18.7349 16.846 18.8773 17.1218L19.4873 18.3418L18.3102 19.5189L17.1223 18.8768C16.8479 18.7401 16.5473 18.664 16.2409 18.6535C15.9345 18.6431 15.6294 18.6986 15.3463 18.8163C15.0632 18.934 14.8087 19.1111 14.6 19.3358C14.3913 19.5604 14.2333 19.8272 14.1367 20.1182L13.7086 21.4023H12.0072L11.5791 20.1182C11.4833 19.8229 11.3244 19.552 11.1135 19.3242C10.9025 19.0965 10.6446 18.9173 10.3575 18.7992C10.0704 18.6811 9.76102 18.6269 9.45087 18.6403C9.14072 18.6537 8.8372 18.7344 8.56136 18.8768L7.34142 19.4868L6.16429 18.3097L6.80636 17.1218C6.94879 16.846 7.0295 16.5425 7.04291 16.2323C7.05631 15.9222 7.00208 15.6128 6.88399 15.3257C6.76589 15.0386 6.58675 14.7807 6.35899 14.5697C6.13123 14.3588 5.86031 14.1999 5.56502 14.1041L4.28087 13.6761V12.0067L5.56502 11.5786C5.86031 11.4828 6.13123 11.324 6.35899 11.113C6.58675 10.9021 6.76589 10.6441 6.88399 10.357C7.00208 10.0699 7.05631 9.76053 7.04291 9.45038C7.0295 9.14023 6.94879 8.83671 6.80636 8.56087L6.19639 7.37304L7.37352 6.1959L8.56136 6.80587C8.8372 6.9483 9.14072 7.02901 9.45087 7.04242C9.76102 7.05582 10.0704 7.00159 10.3575 6.8835C10.6446 6.7654 10.9025 6.58626 11.1135 6.3585C11.3244 6.13074 11.4833 5.85982 11.5791 5.56453L12.0072 4.28038H13.6765L14.1046 5.56453C14.2004 5.85982 14.3593 6.13074 14.5702 6.3585C14.7812 6.58626 15.0391 6.7654 15.3262 6.8835C15.6133 7.00159 15.9227 7.05582 16.2328 7.04242C16.543 7.02901 16.8465 6.9483 17.1223 6.80587L18.3423 6.1959L19.5194 7.37304L18.8773 8.56087C18.7406 8.8353 18.6644 9.1359 18.654 9.44232C18.6435 9.74874 18.6991 10.0538 18.8168 10.3369C18.9345 10.62 19.1116 10.8745 19.3362 11.0832C19.5609 11.2919 19.8277 11.4499 20.1187 11.5465L21.4028 11.9746V13.6761ZM12.8418 8.56087C11.9952 8.56087 11.1677 8.81192 10.4637 9.28226C9.75981 9.75261 9.21117 10.4211 8.88719 11.2033C8.56321 11.9854 8.47844 12.8461 8.64361 13.6764C8.80877 14.5068 9.21645 15.2695 9.81509 15.8681C10.4137 16.4668 11.1764 16.8744 12.0068 17.0396C12.8371 17.2048 13.6978 17.12 14.4799 16.796C15.2621 16.472 15.9306 15.9234 16.4009 15.2195C16.8713 14.5155 17.1223 13.688 17.1223 12.8414C17.1223 11.7061 16.6714 10.6173 15.8686 9.8146C15.0659 9.01185 13.9771 8.56087 12.8418 8.56087ZM12.8418 14.9816C12.4185 14.9816 12.0048 14.8561 11.6528 14.6209C11.3008 14.3857 11.0265 14.0515 10.8645 13.6604C10.7025 13.2693 10.6601 12.839 10.7427 12.4238C10.8253 12.0087 11.0291 11.6273 11.3285 11.328C11.6278 11.0287 12.0091 10.8248 12.4243 10.7422C12.8395 10.6597 13.2698 10.702 13.6609 10.864C14.052 11.026 14.3862 11.3003 14.6214 11.6523C14.8566 12.0043 14.9821 12.4181 14.9821 12.8414C14.9821 13.409 14.7566 13.9534 14.3552 14.3547C13.9539 14.7561 13.4095 14.9816 12.8418 14.9816Z" fill="white" />
                                    </svg>
                                </Link>
                            )
                        }
                    </div>
                </div>
                {
                    !isLogged && innerWidth <= 1024 &&
                    <div className={`navigation_mobile ${stateHamburgerMenu ? 'open' : ''}`}>
                        <button className={`hamburger-button ${stateHamburgerMenu ? 'open' : ''}`} onClick={() => this.handleHamburgerClick(!stateHamburgerMenu)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <nav className='navigation' style={{ '--vh': `${vhState}px` }} ref={this.setWrapperRef}>
                            <h2 className={`${scrollTop > 25 ? 'sticky' : ''}`}>Навигация</h2>
                            <div className='nav_list__wrapper'>
                                <ul>
                                    <li>О проекте</li>
                                    <li>О нас</li>
                                    <li>Отзывы</li>
                                    <li>Контакты</li>
                                </ul>
                                <ul>
                                    <li>Личный кабинет</li>
                                    <li>Платные услуги</li>
                                    <li>О сайте</li>
                                    <li>Соискатели</li>
                                </ul>
                                <ul>
                                    <li>Наниматели</li>
                                    <li>Все кастинги</li>
                                    <li>Календарь кастингов</li>
                                    <li>Вопрос - ответ</li>
                                </ul>
                                <ul>
                                    <li>Реклама на сайте</li>
                                    <li>Новости</li>
                                    <li>Соглашение пользователя</li>
                                    <li>Правила пользования</li>
                                    <li>Конфиденциальность</li>
                                    <li>Обратная связь</li>
                                </ul>
                            </div>
                            <div className='header_buttons'>
                                <Link to='/registration'>Регистрация</Link>
                                <Link to='/registration'>Войти</Link>
                            </div>
                        </nav>
                    </div>
                }
                {!isLogged ?
                    (stateHamburgerMenu && <div className='header-style__overlay'></div>)
                    :
                    (mobileAside && <div className='header-style__overlay'></div>)
                }
            </header >
        )
    }
}

export default Header;