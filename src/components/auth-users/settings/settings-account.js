import React from "react";

class SettingsAccount extends React.Component {
    render() {
        const { innerWidth } = this.props;

        return (
            <section className='settings_account__wrapper'>
                <div className='flex__wrapper'>
                    <div>
                        <h2>Подтвердите email</h2>
                        {innerWidth > 767 && <p>
                            Подтвердите адрес электронной почты или номер телефона, чтобы получить доступ ко всем функциям. Сообщение для подтверждения было отправлено
                            на адрес zalmary248@yandex.ru.
                        </p>}
                    </div>
                    <button>Подтвердить</button>
                </div>
                <div className='flex__wrapper'>
                    <div>
                        <h2>Загрузите логотип</h2>
                        {innerWidth > 767 &&
                            <p>Добавьте свой логотип на аватар профиля. Не используйте фото и логотипы посторонних правообладателей без их письменного разрешения.</p>
                        }
                    </div>
                    <button>Добавить аватар</button>
                </div>
                <div className='flex__wrapper'>
                    <div>
                        <h2>{innerWidth > 767 ? 'Добавьте фотографии' : 'Добавить фото'}</h2>
                        {innerWidth > 767 &&
                            <p>
                                Загрузите портфолио вашего агенства, чтобы исполнители могли лучше понять, как проходят кастинги и мероприятия именно у вас.
                                Необходимо добавить как минимум 3 фотографии, сейчас фотографий нет.
                            </p>
                        }
                    </div>
                    <button>Добавить фото</button>
                </div>
                <div className='flex__wrapper'>
                    <div>
                        <h2>{innerWidth > 767 ? 'Пройдите варификацию аккаунта' : 'Верификация'}</h2>
                        {innerWidth > 767 &&
                            <p>
                                Сфотографируйтесь он-лайн и мы модтвердим варификацию вашего профиля, что позволит повысить количество откликов и повышение рейтинга
                                для вашего аккаунта, так как доверие будет выше у исполнителя.
                            </p>
                        }
                    </div>
                    <button>Подтвердить</button>
                </div>
            </section>
        )
    }
}

export default SettingsAccount;