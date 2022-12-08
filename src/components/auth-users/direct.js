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

        return (
            <section className='messages__wrapper'>
                <section className='messages__title'>
                    <div>
                        <h1 onClick={() => this.setState({ messagesTab: 'chats' })}>Чаты</h1>
                        <input type='text' placeholder='ПОИСК' />
                    </div>
                    <div>
                        <button className={messagesTab === 'requests' ? 'active' : ''} onClick={() => this.setState({ messagesTab: 'requests' })}>Запросы (1)</button>
                        <button className={messagesTab === 'castings' ? 'active' : ''} onClick={() => this.setState({ messagesTab: 'castings' })}>Кастинги (1)</button>
                        <button className='hamburger_btn'><span></span><span></span></button>
                    </div>
                </section>
                {messagesTab === 'chats' &&
                    <section className='messages__content'>
                        <section className='messages_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                <h2>Мария Сергеевна</h2>
                            </div>
                            <p className='user_preview-message'>
                                Отправлено вчера
                            </p>
                            <p className='user_status'>
                                Была недавно в сети
                            </p>
                        </section>
                        <section className='messages_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                <h2>Мария Сергеевна</h2>
                            </div>
                            <p className='user_preview-message'>
                                Отправлено 3 дня назад
                            </p>
                            <p className='user_status online'>
                                В сети
                            </p>
                        </section>
                        <section className='messages_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                <h2>Мария Сергеевна</h2>
                            </div>
                            <p className='user_preview-message'>
                                Давай встретимся сегодня в...
                            </p>
                            <p className='user_status'>
                                3 часа назад была в сети
                            </p>
                        </section>
                        <section className='messages_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                <h2>Мария Сергеевна</h2>
                            </div>
                            <p className='user_preview-message'>
                                Давай встретимся сегодня в...
                            </p>
                            <p className='user_status'>
                                3 часа назад была в сети
                            </p>
                        </section>
                        <section className='messages_block'>
                            <div>
                                <div className='stories_block'>
                                    <img src='/images/users/jiao.png' alt='stories-logo' />
                                </div>
                                <h2>Мария Сергеевна</h2>
                            </div>
                            <p className='user_preview-message'>
                                Давай встретимся сегодня в...
                            </p>
                            <p className='user_status'>
                                3 часа назад была в сети
                            </p>
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
                            <p>
                                Нужна модель на подиум
                            </p>
                            <p>
                                5500 ₽
                            </p>
                            <div>
                                <button>ПОСМОТРЕТЬ</button>
                                <button>ОТКЛОНИТЬ</button>
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
                            <p>
                                Нужна модель на подиум
                            </p>
                            <p>
                                5500 ₽
                            </p>
                            <div>
                                <button>ПОСМОТРЕТЬ</button>
                                <button>ОТКЛОНИТЬ</button>
                            </div>
                        </section>
                    </section>
                }
            </section>
        )
    }
}

export default Direct;