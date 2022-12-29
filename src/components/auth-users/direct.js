import React from "react";

class Direct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messagesTab: 'chats'
        }
    }

    render() {
        const { messagesTab } = this.state;
        const { setStateAsideFilter, innerWidth } = this.props;

        return (
            <section className='messages__wrapper'>
                <section className='messages__title'>
                    <div>
                        {innerWidth > 767 && <h1 onClick={() => this.setState({ messagesTab: 'chats' })}>Чаты</h1>}
                        <input type='text' placeholder='ПОИСК' />
                        {innerWidth < 768 && <button className='hamburger_btn' onClick={() => {
                            document.body.style.overflow = 'hidden'
                            setStateAsideFilter(true);
                        }}><span></span><span></span></button>}
                    </div>
                    <div>
                        {innerWidth < 768 && <button className={messagesTab === 'chats' ? 'active' : ''} onClick={() => this.setState({ messagesTab: 'chats' })}>Чаты</button>}
                        <button className={messagesTab === 'requests' ? 'active' : ''} onClick={() => this.setState({ messagesTab: 'requests' })}>Запросы (1)</button>
                        <button className={messagesTab === 'castings' ? 'active' : ''} onClick={() => this.setState({ messagesTab: 'castings' })}>Кастинги (1)</button>
                        {innerWidth > 767 && <button className='hamburger_btn' onClick={() => {
                            document.body.style.overflow = 'hidden'
                            setStateAsideFilter(true);
                        }}><span></span><span></span></button>}
                    </div>
                </section>
                {messagesTab === 'chats' &&
                    <section className='messages__content'>
                        <section className='messages_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                {innerWidth > 767 ?
                                    <h2>Мария Сергеевна</h2>
                                    :
                                    <div>
                                        <h2>Мария Сергеевна</h2>
                                        <p className='user_status'>
                                            Была недавно в сети
                                        </p>
                                    </div>
                                }
                            </div>
                            <p className='user_preview-message'>
                                Отправлено вчера
                            </p>
                            {innerWidth > 767 && <p className='user_status'>
                                Была недавно в сети
                            </p>}
                        </section>
                        <section className='messages_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                {innerWidth > 767 ?
                                    <h2>Мария Сергеевна</h2>
                                    :
                                    <div>
                                        <h2>Мария Сергеевна</h2>
                                        <p className='user_status online'>
                                            В сети
                                        </p>
                                    </div>
                                }
                            </div>
                            <p className='user_preview-message'>
                                Отправлено 3 дня назад
                            </p>
                            {innerWidth > 767 && <p className='user_status online'>
                                В сети
                            </p>}
                        </section>
                        <section className='messages_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                {innerWidth > 767 ?
                                    <h2>Мария Сергеевна</h2>
                                    :
                                    <div>
                                        <h2>Мария Сергеевна</h2>
                                        <p className='user_status'>
                                            3 часа назад была в сети
                                        </p>
                                    </div>
                                }
                            </div>
                            <p className='user_preview-message'>
                                Давай встретимся сегодня в...
                            </p>
                            {innerWidth > 767 && <p className='user_status'>
                                3 часа назад была в сети
                            </p>}
                        </section>
                        <section className='messages_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                {innerWidth > 767 ?
                                    <h2>Мария Сергеевна</h2>
                                    :
                                    <div>
                                        <h2>Мария Сергеевна</h2>
                                        <p className='user_status'>
                                            3 часа назад была в сети
                                        </p>
                                    </div>
                                }
                            </div>
                            <p className='user_preview-message'>
                                Давай встретимся сегодня в...
                            </p>
                            {innerWidth > 767 && <p className='user_status'>
                                3 часа назад была в сети
                            </p>}
                        </section>
                        <section className='messages_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                {innerWidth > 767 ?
                                    <h2>Мария Сергеевна</h2>
                                    :
                                    <div>
                                        <h2>Мария Сергеевна</h2>
                                        <p className='user_status'>
                                            Была недавно в сети
                                        </p>
                                    </div>
                                }
                            </div>
                            <p className='user_preview-message'>
                                Давай встретимся сегодня в...
                            </p>
                            {innerWidth > 767 && <p className='user_status'>
                                3 часа назад была в сети
                            </p>}
                        </section>
                    </section>
                }
                {messagesTab === 'requests' &&
                    <section className='messages__content'>
                        <section className='request_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                <h2>Мария Сергеевна</h2>
                            </div>
                            {innerWidth > 767 &&
                                <>
                                    <p>
                                        Нужна модель на подиум
                                    </p>
                                    <p>
                                        5500 ₽
                                    </p>
                                </>
                            }
                            <div>
                                <button>Посмотреть</button>
                                <button>Отклонить</button>
                            </div>
                        </section>
                        <section className='request_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                <h2>Мария Сергеевна</h2>
                            </div>
                            {innerWidth > 767 &&
                                <>
                                    <p>
                                        Нужна модель на подиум
                                    </p>
                                    <p>
                                        5500 ₽
                                    </p>
                                </>
                            }
                            <div>
                                <button>Посмотреть</button>
                                <button>Отклонить</button>
                            </div>
                        </section>
                    </section>
                }
                {messagesTab === 'castings' &&
                    <section className='messages__content'>
                        <section className='request_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                <h2>Мария Сергеевна</h2>
                            </div>
                            {innerWidth > 767 &&
                                <>
                                    <p>
                                        Нужна модель на подиум
                                    </p>
                                    <p>
                                        5500 ₽
                                    </p>
                                </>
                            }
                            <div>
                                <button>Посмотреть</button>
                                <button>Отклонить</button>
                            </div>
                        </section>
                        <section className='request_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                <h2>Мария Сергеевна</h2>
                            </div>
                            {innerWidth > 767 &&
                                <>
                                    <p>
                                        Нужна модель на подиум
                                    </p>
                                    <p>
                                        5500 ₽
                                    </p>
                                </>
                            }
                            <div>
                                <button>Посмотреть</button>
                                <button>Отклонить</button>
                            </div>
                        </section>
                    </section>
                }
            </section>
        )
    }
}

export default Direct;