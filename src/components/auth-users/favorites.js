import React from "react";

class Profile extends React.Component {
    render() {
        const { setStateAsideFilter } = this.props;
        
        return (
            <section className='favorites__wrapper auth_user__main-page'>
                <h1>Избранное</h1>
                <div className='filter_bar'>
                    <div className='filter'>
                        <div className='categories'>
                            <button className='active'>ЛЮДИ</button>
                            <button>КАСТИНГИ</button>
                        </div>
                        <div className='gender'>
                            <button>ДЕВУШКИ</button>
                            <button>МУЖЧИНЫ</button>
                            <button className='active'>ВСЕ</button>
                        </div>
                    </div>
                    <div className='search_field'>
                        <label>
                            <input type='text' placeholder='ПОИСК' />
                            <button><img src='/images/icons/search-filter-icon.svg' alt='search-filter' /></button>
                        </label>
                        <button className='hamburger_btn' onClick={() => {
                            document.body.style.overflow = 'hidden'
                            setStateAsideFilter(true);
                        }}><span></span><span></span></button>
                    </div>
                </div>
                <section className='favorites__content'>
                    <div className='favorite_block'>
                        <div>
                            <img src='/images/users/marcus.png' alt='favorite-logo' />
                            <p>
                                Снежаная Ковалева
                                <span>
                                    В Москве на 2 месяца, живу без принципов
                                </span>
                            </p>
                        </div>
                        <div>
                            <button>Удалить</button>
                            <button>Написать</button>
                        </div>
                    </div>
                    <div className='favorite_block'>
                        <div>
                            <img src='/images/users/marcus.png' alt='favorite-logo' />
                            <p>
                                Снежаная Ковалева
                                <span>
                                    В Москве на 2 месяца, живу без принципов
                                </span>
                            </p>
                        </div>
                        <div>
                            <button>Удалить</button>
                            <button>Написать</button>
                        </div>
                    </div>
                    <div className='favorite_block'>
                        <div>
                            <img src='/images/users/marcus.png' alt='favorite-logo' />
                            <p>
                                Снежаная Ковалева
                                <span>
                                    В Москве на 2 месяца, живу без принципов
                                </span>
                            </p>
                        </div>
                        <div>
                            <button>Удалить</button>
                            <button>Написать</button>
                        </div>
                    </div>
                    <div className='favorite_block'>
                        <div>
                            <img src='/images/users/marcus.png' alt='favorite-logo' />
                            <p>
                                Снежаная Ковалева
                                <span>
                                    В Москве на 2 месяца, живу без принципов
                                </span>
                            </p>
                        </div>
                        <div>
                            <button>Удалить</button>
                            <button>Написать</button>
                        </div>
                    </div>
                    <div className='favorite_block'>
                        <div>
                            <img src='/images/users/marcus.png' alt='favorite-logo' />
                            <p>
                                Снежаная Ковалева
                                <span>
                                    В Москве на 2 месяца, живу без принципов
                                </span>
                            </p>
                        </div>
                        <div>
                            <button className='friends'>Добавить в друзья</button>
                            <button>Написать</button>
                        </div>
                    </div>
                    <div className='favorite_block'>
                        <div>
                            <img src='/images/users/marcus.png' alt='favorite-logo' />
                            <p>
                                Снежаная Ковалева
                                <span>
                                    В Москве на 2 месяца, живу без принципов
                                </span>
                            </p>
                        </div>
                        <div>
                            <button className='friends'>Добавить в друзья</button>
                            <button>Написать</button>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}

export default Profile;