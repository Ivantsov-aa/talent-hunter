import React from "react";

class Footer extends React.Component {
    render() {
        const { innerWidth } = this.props;

        return (
            <footer>
                <div className='footer__content'>
                    <div className='footer__flex'>
                        <section>
                            <img src='/images/footer-logo.svg' alt='logo' />
                            {innerWidth >= 768 && <p>© 2010–2022, Онлайн-сервис кастингов Doberman Models</p>}
                        </section>
                        <section>
                            <ul>
                                <li>Личный кабинет</li>
                                <li>Платные услуги</li>
                                <li>О сайте</li>
                                <li>Соискатели</li>
                            </ul>
                        </section>
                        <section>
                            <ul>
                                <li>Наниматели</li>
                                <li>Все кастинги</li>
                                <li>Календарь кастингов</li>
                                <li>Вопрос - ответ</li>
                            </ul>
                        </section>
                        <section>
                            <ul>
                                <li>Реклама на сайте</li>
                                <li>Новости</li>
                                <li>Соглашение пользователя</li>
                                <li>Правила пользования</li>
                                <li>Конфиденциальность</li>
                                <li>Обратная связь</li>
                            </ul>
                        </section>
                        <section className='our-social-network'>
                            <h3>МЫ В СОЦИАЛЬНЫХ СЕТЯХ</h3>
                            <div className='social-links'>
                                <a href="#" className='vkontakte'></a>
                                <a href="#" className='telegram'></a>
                            </div>
                        </section>
                    </div>
                </div>
                <div className='footer__sub'>
                    <span>Политика конфиденциальности</span>
                    <span>Договор-оферта</span>
                    <span>Правила пользования сайтом</span>
                    {innerWidth < 768 && <span>© 2010–2022, Онлайн-сервис кастингов Doberman Models</span>}
                </div>
            </footer>
        )
    }
}

export default Footer;