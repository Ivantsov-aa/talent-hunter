import React from "react";

class MainPageFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterType: 'general',
            languageNone: false,
            extendedFilterPage: 1
        }

        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.body.style.overflowY = 'hidden';
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.body.style.overflowY = 'scroll';
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        const { setStateSearchFilter } = this.props;
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            setStateSearchFilter(false);
        }
    }

    render() {
        const { filterType, languageNone, extendedFilterPage } = this.state;
        const { setStateSearchFilter, currentFeed } = this.props;

        return (
            <section className='performer__container main-page__filter' ref={this.setWrapperRef}>
                <button type="button" className='filter_close' onClick={() => setStateSearchFilter(false)}>+</button>
                <div>
                    <h1>Фильтр</h1>
                    <img src='/images/icons/search-filter-icon.svg' alt='search-filter' />
                </div>
                <p className={`counter ${currentFeed === 'castings' ? 'margin-none' : ''}`}>Отобрано кастингов: <span>125</span></p>
                {currentFeed === 'people' ?
                    <section className='customer__wrapper'>
                        <label className='select__wrapper'>
                            Город
                            <div>
                                <select>
                                    <option>Москва</option>
                                </select>
                            </div>
                        </label>
                        <label className='select__wrapper'>
                            Специалист
                            <div>
                                <select>
                                    <option>Фотомодель</option>
                                </select>
                            </div>
                        </label>
                        <label className='select__wrapper'>
                            Кастинг
                            <div>
                                <select>
                                    <option>Подиум</option>
                                </select>
                            </div>
                        </label>
                        <label className='select__wrapper'>
                            Пол специалиста
                            <div>
                                <select>
                                    <option>Мужской</option>
                                </select>
                            </div>
                        </label>
                        <label className='select__wrapper'>
                            Возраст специалиста
                            <div>
                                <select>
                                    <option>22 года</option>
                                </select>
                            </div>
                        </label>
                        <label className='select__wrapper'>
                            Оплата
                            <div>
                                <select>
                                    <option>По бартеру</option>
                                </select>
                            </div>
                        </label>
                    </section>
                    :
                    <>
                        <div className='filter_toggle'>
                            <button className={filterType === 'general' ? 'active' : ''} onClick={() => this.setState({ filterType: 'general' })}>Общие данные</button>
                            <button className={filterType === 'extended' ? 'active' : ''} onClick={() => this.setState({ filterType: 'extended' })}>Расширенные</button>
                        </div>
                        {filterType === 'general' ?
                            <section className='customer__wrapper'>
                                <label className='select__wrapper'>
                                    Специалист на кастинг
                                    <div>
                                        <select>
                                            <option>Фотомодель</option>
                                        </select>
                                    </div>
                                </label>
                                <label className='select__wrapper'>
                                    Навыки специалиста
                                    <div>
                                        <select>
                                            <option>Ню</option>
                                        </select>
                                    </div>
                                </label>
                                <label className='select__wrapper'>
                                    Пол специалиста
                                    <div>
                                        <select>
                                            <option>Женский</option>
                                        </select>
                                    </div>
                                </label>
                                <label className='select__wrapper'>
                                    Возраст специалиста
                                    <div>
                                        <select>
                                            <option>25 лет</option>
                                        </select>
                                    </div>
                                </label>
                                <label className='select__wrapper'>
                                    Город
                                    <div>
                                        <select>
                                            <option>Москва</option>
                                        </select>
                                    </div>
                                </label>
                            </section>
                            :
                            <>
                                <div className='filter_pages'>
                                    <button className={extendedFilterPage === 1 ? 'active' : ''} onClick={() => this.setState({ extendedFilterPage: 1 })}>1</button>
                                    <button className={extendedFilterPage === 2 ? 'active' : ''} onClick={() => this.setState({ extendedFilterPage: 2 })}>2</button>
                                    <button className={extendedFilterPage === 3 ? 'active' : ''} onClick={() => this.setState({ extendedFilterPage: 3 })}>3</button>
                                    <button className={extendedFilterPage === 4 ? 'active' : ''} onClick={() => this.setState({ extendedFilterPage: 4 })}>4</button>
                                    <button className={extendedFilterPage === 5 ? 'active' : ''} onClick={() => this.setState({ extendedFilterPage: 5 })}>5</button>
                                </div>
                                {extendedFilterPage === 1 &&
                                    <section className='customer__wrapper'>
                                        <label className='select__wrapper'>
                                            Косметические особенности
                                            <div>
                                                <select>
                                                    <option>Нет</option>
                                                    <option>Татуаж</option>
                                                    <option>Пирсинг</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='select__wrapper'>
                                            Наличие косметической хирургии
                                            <div>
                                                <select>
                                                    <option>Нет</option>
                                                    <option>Пластика губ</option>
                                                    <option>Маммопластика</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='select__wrapper'>
                                            Наличие татуировок
                                            <div>
                                                <select>
                                                    <option >Нет</option>
                                                    <option>от 1 до 3</option>
                                                    <option>4 и более</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='select__wrapper radio'>
                                            Иностранный язык
                                            <div>
                                                <div>
                                                    <select disabled={languageNone ? true : false}>
                                                        <option>Базовый</option>
                                                        <option>Средний</option>
                                                        <option>Продвинутый</option>
                                                        <option>Свободное владение</option>
                                                    </select>
                                                    <select disabled={languageNone ? true : false}>
                                                        <option>Английский</option>
                                                        <option>Испанский</option>
                                                        <option>Французский</option>
                                                        <option>Немецкий</option>
                                                        <option>Японский</option>
                                                        <option>Итальянский</option>
                                                        <option>Корейский</option>
                                                        <option>Арабский</option>
                                                    </select>
                                                </div>
                                                <input type='radio' id='language-no' checked={languageNone} onClick={() => this.setState({ languageNone: !languageNone })} />
                                                <label htmlFor='language-no'>
                                                    Нет
                                                </label>
                                            </div>
                                        </label>
                                        <label className='radio_input'>
                                            Наличие загран паспорта
                                            <div>
                                                <input
                                                    id='international_passport-yes'
                                                    type='radio'
                                                    name='international_passport'
                                                    value={1}
                                                />
                                                <label htmlFor='international_passport-yes'>
                                                    Да
                                                </label>
                                                <input
                                                    id='international_passport-no'
                                                    type='radio'
                                                    name='international_passport'
                                                    value={0}
                                                />
                                                <label htmlFor='international_passport-no'>
                                                    Нет
                                                </label>
                                            </div>
                                        </label>
                                        <label className='select__wrapper'>
                                            Гражданство
                                            <div>
                                                <select>
                                                    <option>Российская Федерация</option>
                                                    <option>Республика Беларусь</option>
                                                    <option>Украина</option>
                                                    <option>Азербайджанская Республика</option>
                                                    <option>Республика Армения</option>
                                                    <option>Республика Казахстан</option>
                                                    <option>Кыргызская Республика</option>
                                                    <option>Республика Молдова</option>
                                                    <option>Республика Таджикистан</option>
                                                    <option>Республика Узбекистан</option>
                                                    <option>Туркменистан</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='radio_input'>
                                            Готовность к командировкам
                                            <div>
                                                <input
                                                    id='official_journey-yes'
                                                    type='radio'
                                                    name='official_journey'
                                                    value={1}
                                                />
                                                <label htmlFor='official_journey-yes'>
                                                    Да
                                                </label>
                                                <input
                                                    id='official_journey-no'
                                                    type='radio'
                                                    name='official_journey'
                                                    value={0}
                                                />
                                                <label htmlFor='official_journey-no'>
                                                    Нет
                                                </label>
                                            </div>
                                        </label>
                                    </section>
                                }
                                {extendedFilterPage === 2 &&
                                    <section className='customer__wrapper'>
                                        <div className='select_group__wrapper'>
                                            <div>
                                                <select defaultValue='head_type'>
                                                    <option value='head_type' disabled>Вид головы</option>
                                                    <option value='medium'>Средняя</option>
                                                    <option value='round'>Круглая</option>
                                                    <option value='oval'>Овальная</option>
                                                </select>
                                            </div>
                                            <div>
                                                <select defaultValue='eye_color'>
                                                    <option value='eye_color' disabled>Цвет глаз</option>
                                                    <option>Синий</option>
                                                    <option>Голубой</option>
                                                    <option>Серый</option>
                                                    <option>Зелёный</option>
                                                    <option>Жёлтый</option>
                                                    <option>Карий</option>
                                                    <option>Чёрный</option>
                                                </select>
                                            </div>
                                            <div>
                                                <select defaultValue='eye_shape'>
                                                    <option value='eye_shape' disabled>Разрез глаз</option>
                                                    <option>Классический</option>
                                                    <option>Европейский</option>
                                                    <option>Азиатский</option>
                                                </select>
                                            </div>
                                            <div>
                                                <select defaultValue='skin_color'>
                                                    <option value='skin_color' disabled>Цвет кожи</option>
                                                    <option>Бледная</option>
                                                    <option>Персиково-розовая</option>
                                                    <option>Средний тон</option>
                                                    <option>Оливковая</option>
                                                    <option>Бронзовая</option>
                                                    <option>Смуглая</option>
                                                    <option>Тёмная</option>
                                                </select>
                                            </div>
                                        </div>
                                        <label className='select__wrapper'>
                                            Расовая принадлежность
                                            <div>
                                                <select>
                                                    <option>Евразийская</option>
                                                    <option>Экваториальная</option>
                                                    <option>Негро-австралоидная</option>
                                                </select>
                                            </div>
                                        </label>
                                        <div className='select_group__wrapper'>
                                            <div>
                                                <select defaultValue='nose_shape'>
                                                    <option value='nose_shape' disabled>Форма носа</option>
                                                    <option>«Орлиный нос»</option>
                                                    <option>«Соколийный нос»</option>
                                                    <option>«Греческий нос»</option>
                                                    <option>«Африканский нос»</option>
                                                    <option>«Курносый нос»</option>
                                                    <option>«Вздёрнутый нос»</option>
                                                </select>
                                            </div>
                                            <div>
                                                <select defaultValue='lip_shape'>
                                                    <option value='lip_shape' disabled>Губы</option>
                                                    <option>Пухлые</option>
                                                    <option>Тонкие</option>
                                                    <option>Верхняя губа с острой ложбинкой</option>
                                                    <option>Тонкая нижняя губа</option>
                                                    <option>Тонкая верхняя губа</option>
                                                    <option>Крупные</option>
                                                    <option>Широкие губы</option>
                                                    <option>Губы округлой формы</option>
                                                    <option>«Бантиком»</option>
                                                </select>
                                            </div>
                                            <div>
                                                <select defaultValue='hair_color'>
                                                    <option value='hair_color' disabled>Цвет волос</option>
                                                    <option>Брюнет</option>
                                                    <option>Рыжий</option>
                                                    <option>Блондин</option>
                                                    <option>Шатен</option>
                                                    <option>Русый</option>
                                                    <option>Седой</option>
                                                </select>
                                            </div>
                                            <div>
                                                <select defaultValue='hair_length'>
                                                    <option value='hair_length' disabled>Длина волос</option>
                                                    <option>короче 10 см</option>
                                                    <option>10-15 см</option>
                                                    <option>15-25 см</option>
                                                    <option>25-35 см</option>
                                                    <option>35-40 см</option>
                                                    <option>45-55 см</option>
                                                    <option>55-60 см</option>
                                                    <option>60 см и ниже</option>
                                                </select>
                                            </div>
                                        </div>
                                    </section>
                                }
                                {extendedFilterPage === 3 &&
                                    <section className='customer__wrapper'>
                                        <label className='select__wrapper'>
                                            Косметические особенности
                                            <div>
                                                <select>
                                                    <option>Нет</option>
                                                    <option>Татуаж</option>
                                                    <option>Пирсинг</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='select__wrapper'>
                                            Наличие косметической хирургии
                                            <div>
                                                <select>
                                                    <option>Нет</option>
                                                    <option>Пластика губ</option>
                                                    <option>Маммопластика</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='select__wrapper'>
                                            Наличие татуировок
                                            <div>
                                                <select>
                                                    <option >Нет</option>
                                                    <option>от 1 до 3</option>
                                                    <option>4 и более</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='select__wrapper radio'>
                                            Иностранный язык
                                            <div>
                                                <div>
                                                    <select disabled={languageNone ? true : false}>
                                                        <option>Базовый</option>
                                                        <option>Средний</option>
                                                        <option>Продвинутый</option>
                                                        <option>Свободное владение</option>
                                                    </select>
                                                    <select disabled={languageNone ? true : false}>
                                                        <option>Английский</option>
                                                        <option>Испанский</option>
                                                        <option>Французский</option>
                                                        <option>Немецкий</option>
                                                        <option>Японский</option>
                                                        <option>Итальянский</option>
                                                        <option>Корейский</option>
                                                        <option>Арабский</option>
                                                    </select>
                                                </div>
                                                <input type='radio' id='language-no' checked={languageNone} onClick={() => this.setState({ languageNone: !languageNone })} />
                                                <label htmlFor='language-no'>
                                                    Нет
                                                </label>
                                            </div>
                                        </label>
                                        <label className='radio_input'>
                                            Наличие загран паспорта
                                            <div>
                                                <input
                                                    id='international_passport-yes'
                                                    type='radio'
                                                    name='international_passport'
                                                    value={1}
                                                />
                                                <label htmlFor='international_passport-yes'>
                                                    Да
                                                </label>
                                                <input
                                                    id='international_passport-no'
                                                    type='radio'
                                                    name='international_passport'
                                                    value={0}
                                                />
                                                <label htmlFor='international_passport-no'>
                                                    Нет
                                                </label>
                                            </div>
                                        </label>
                                        <label className='select__wrapper'>
                                            Гражданство
                                            <div>
                                                <select>
                                                    <option>Российская Федерация</option>
                                                    <option>Республика Беларусь</option>
                                                    <option>Украина</option>
                                                    <option>Азербайджанская Республика</option>
                                                    <option>Республика Армения</option>
                                                    <option>Республика Казахстан</option>
                                                    <option>Кыргызская Республика</option>
                                                    <option>Республика Молдова</option>
                                                    <option>Республика Таджикистан</option>
                                                    <option>Республика Узбекистан</option>
                                                    <option>Туркменистан</option>
                                                </select>
                                            </div>
                                        </label>
                                        {/* <label className='radio_input'>
                                    Готовность к командировкам
                                    <div>
                                        <input
                                            id='official_journey-yes'
                                            type='radio'
                                            name='official_journey'
                                            value={1}
                                        />
                                        <label htmlFor='official_journey-yes'>
                                            Да
                                        </label>
                                        <input
                                            id='official_journey-no'
                                            type='radio'
                                            name='official_journey'
                                            value={0}
                                        />
                                        <label htmlFor='official_journey-no'>
                                            Нет
                                        </label>
                                    </div>
                                </label> */}
                                    </section>
                                }
                                {extendedFilterPage === 4 &&
                                    <section className='customer__wrapper'>
                                        <label className='select__wrapper'>
                                            Косметические особенности
                                            <div>
                                                <select>
                                                    <option>Нет</option>
                                                    <option>Татуаж</option>
                                                    <option>Пирсинг</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='select__wrapper'>
                                            Наличие косметической хирургии
                                            <div>
                                                <select>
                                                    <option>Нет</option>
                                                    <option>Пластика губ</option>
                                                    <option>Маммопластика</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='select__wrapper'>
                                            Наличие татуировок
                                            <div>
                                                <select>
                                                    <option >Нет</option>
                                                    <option>от 1 до 3</option>
                                                    <option>4 и более</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='select__wrapper radio'>
                                            Иностранный язык
                                            <div>
                                                <div>
                                                    <select disabled={languageNone ? true : false}>
                                                        <option>Базовый</option>
                                                        <option>Средний</option>
                                                        <option>Продвинутый</option>
                                                        <option>Свободное владение</option>
                                                    </select>
                                                    <select disabled={languageNone ? true : false}>
                                                        <option>Английский</option>
                                                        <option>Испанский</option>
                                                        <option>Французский</option>
                                                        <option>Немецкий</option>
                                                        <option>Японский</option>
                                                        <option>Итальянский</option>
                                                        <option>Корейский</option>
                                                        <option>Арабский</option>
                                                    </select>
                                                </div>
                                                <input type='radio' id='language-no' checked={languageNone} onClick={() => this.setState({ languageNone: !languageNone })} />
                                                <label htmlFor='language-no'>
                                                    Нет
                                                </label>
                                            </div>
                                        </label>
                                        <label className='radio_input'>
                                            Наличие загран паспорта
                                            <div>
                                                <input
                                                    id='international_passport-yes'
                                                    type='radio'
                                                    name='international_passport'
                                                    value={1}
                                                />
                                                <label htmlFor='international_passport-yes'>
                                                    Да
                                                </label>
                                                <input
                                                    id='international_passport-no'
                                                    type='radio'
                                                    name='international_passport'
                                                    value={0}
                                                />
                                                <label htmlFor='international_passport-no'>
                                                    Нет
                                                </label>
                                            </div>
                                        </label>
                                        <label className='select__wrapper'>
                                            Гражданство
                                            <div>
                                                <select>
                                                    <option>Российская Федерация</option>
                                                    <option>Республика Беларусь</option>
                                                    <option>Украина</option>
                                                    <option>Азербайджанская Республика</option>
                                                    <option>Республика Армения</option>
                                                    <option>Республика Казахстан</option>
                                                    <option>Кыргызская Республика</option>
                                                    <option>Республика Молдова</option>
                                                    <option>Республика Таджикистан</option>
                                                    <option>Республика Узбекистан</option>
                                                    <option>Туркменистан</option>
                                                </select>
                                            </div>
                                        </label>
                                        {/* <label className='radio_input'>
                                    Готовность к командировкам
                                    <div>
                                        <input
                                            id='official_journey-yes'
                                            type='radio'
                                            name='official_journey'
                                            value={1}
                                        />
                                        <label htmlFor='official_journey-yes'>
                                            Да
                                        </label>
                                        <input
                                            id='official_journey-no'
                                            type='radio'
                                            name='official_journey'
                                            value={0}
                                        />
                                        <label htmlFor='official_journey-no'>
                                            Нет
                                        </label>
                                    </div>
                                </label> */}
                                    </section>
                                }
                                {extendedFilterPage === 5 &&
                                    <section className='customer__wrapper'>
                                        <label className='select__wrapper'>
                                            Косметические особенности
                                            <div>
                                                <select>
                                                    <option>Нет</option>
                                                    <option>Татуаж</option>
                                                    <option>Пирсинг</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='select__wrapper'>
                                            Наличие косметической хирургии
                                            <div>
                                                <select>
                                                    <option>Нет</option>
                                                    <option>Пластика губ</option>
                                                    <option>Маммопластика</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='select__wrapper'>
                                            Наличие татуировок
                                            <div>
                                                <select>
                                                    <option >Нет</option>
                                                    <option>от 1 до 3</option>
                                                    <option>4 и более</option>
                                                </select>
                                            </div>
                                        </label>
                                        <label className='select__wrapper radio'>
                                            Иностранный язык
                                            <div>
                                                <div>
                                                    <select disabled={languageNone ? true : false}>
                                                        <option>Базовый</option>
                                                        <option>Средний</option>
                                                        <option>Продвинутый</option>
                                                        <option>Свободное владение</option>
                                                    </select>
                                                    <select disabled={languageNone ? true : false}>
                                                        <option>Английский</option>
                                                        <option>Испанский</option>
                                                        <option>Французский</option>
                                                        <option>Немецкий</option>
                                                        <option>Японский</option>
                                                        <option>Итальянский</option>
                                                        <option>Корейский</option>
                                                        <option>Арабский</option>
                                                    </select>
                                                </div>
                                                <input type='radio' id='language-no' checked={languageNone} onClick={() => this.setState({ languageNone: !languageNone })} />
                                                <label htmlFor='language-no'>
                                                    Нет
                                                </label>
                                            </div>
                                        </label>
                                        <label className='radio_input'>
                                            Наличие загран паспорта
                                            <div>
                                                <input
                                                    id='international_passport-yes'
                                                    type='radio'
                                                    name='international_passport'
                                                    value={1}
                                                />
                                                <label htmlFor='international_passport-yes'>
                                                    Да
                                                </label>
                                                <input
                                                    id='international_passport-no'
                                                    type='radio'
                                                    name='international_passport'
                                                    value={0}
                                                />
                                                <label htmlFor='international_passport-no'>
                                                    Нет
                                                </label>
                                            </div>
                                        </label>
                                        <label className='select__wrapper'>
                                            Гражданство
                                            <div>
                                                <select>
                                                    <option>Российская Федерация</option>
                                                    <option>Республика Беларусь</option>
                                                    <option>Украина</option>
                                                    <option>Азербайджанская Республика</option>
                                                    <option>Республика Армения</option>
                                                    <option>Республика Казахстан</option>
                                                    <option>Кыргызская Республика</option>
                                                    <option>Республика Молдова</option>
                                                    <option>Республика Таджикистан</option>
                                                    <option>Республика Узбекистан</option>
                                                    <option>Туркменистан</option>
                                                </select>
                                            </div>
                                        </label>
                                        {/* <label className='radio_input'>
                                    Готовность к командировкам
                                    <div>
                                        <input
                                            id='official_journey-yes'
                                            type='radio'
                                            name='official_journey'
                                            value={1}
                                        />
                                        <label htmlFor='official_journey-yes'>
                                            Да
                                        </label>
                                        <input
                                            id='official_journey-no'
                                            type='radio'
                                            name='official_journey'
                                            value={0}
                                        />
                                        <label htmlFor='official_journey-no'>
                                            Нет
                                        </label>
                                    </div>
                                </label> */}
                                    </section>
                                }
                            </>
                        }
                    </>
                }
                <button>Применить</button>
            </section>
        )
    }
}

export default MainPageFilter;