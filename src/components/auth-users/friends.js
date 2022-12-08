import React from "react";

class Friends extends React.Component {
    render() {
        const { setStateAsideFilter } = this.props;

        return (
            <section className='friends__wrapper auth_user__main-page'>
                <div className='filter_bar'>
                    <h1>Друзья</h1>
                    <div className='filter'>
                        <div className='gender'>
                            <button>ДЕВУШКИ</button>
                            <button>МУЖЧИНЫ</button>
                            <button className='active'>ВСЕ</button>
                        </div>
                    </div>
                    <div className='search_field'>
                        <label>
                            <input type='text' placeholder='ПОИСК' />
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
                </section>
            </section>
        )
    }
}

export default Friends;