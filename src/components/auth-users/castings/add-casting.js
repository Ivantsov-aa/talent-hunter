import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Slider, { Range } from 'rc-slider';
import ReactTextareaAutosize from "react-textarea-autosize";
import cities from '../../../store/cities.json';
import PhoneInput, {
    parsePhoneNumber,
    getCountryCallingCode
} from "react-phone-number-input";
import ru from 'react-phone-number-input/locale/ru'

const AddCasting = ({ location, setStateAsideFilter }) => {
    const [cityValue, setCityValue] = useState('');
    const [cityDrop, setCityDrop] = useState(true);
    const [langValue, setLangValue] = useState(null);
    const [castingCover, addCastingCover] = useState(null);
    const [castingGallery, addCastingGallery] = useState([]);
    const [imgFocus, setImgFocus] = useState(null);
    const [phoneCountryCode, setPhoneCountryCode] = useState('');

    const {
        control,
        register,
        handleSubmit,
        setError,
        reset,
        clearErrors,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit'
    });

    const handlePhoto = e => {
        let reader = new FileReader();
        let file = e.target.files[0];

        // if (file.type !== 'image/jpeg' || file.type !== 'image/jpeg') {
        //     setError('photo', {
        //         type: 'filetype',
        //         message: 'Только файлы с расширением .jpg, .jpeg'
        //     })
        // } else if (file.size > 1048576) {
        //     setError('photo', {
        //         type: 'filesize',
        //         message: 'Максимальный размер файла 1 Мб.'
        //     })
        // } else {
        //     clearErrors();
        reader.onload = () => {
            if (e.target.name === 'cover') {
                console.log(e.target.name);
                addCastingCover(reader.result);
            } else {
                addCastingGallery([reader.result, ...castingGallery]);
            }
        }

        reader.readAsDataURL(file);
    }

    return (
        <section className='add-casting__wrapper'>
            <div className='user_title'>
                <h1>Добавление кастинга</h1>
                <button className='hamburger_btn' onClick={setStateAsideFilter}><span></span><span></span></button>
            </div>
            <form className='add-casting__form'>
                <div className='casting_media'>
                    <h2>Добавить фотографии</h2>
                    <div className='flex__wrapper'>
                        <div className='upload-photo'>
                            <input
                                type='file'
                                accept='image/*'
                                id='cover'
                                name='cover'
                                onChange={handlePhoto}
                            />
                            <label htmlFor='cover'>
                                {
                                    castingCover ?
                                        <img className='user-photo' src={castingCover} alt='upload' />
                                        :
                                        <svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.8 9.18602C17.5496 7.83679 18.9717 7 20.5152 7H27.4848C29.0283 7 30.4504 7.83679 31.2 9.18602L32.4855 11.5H36.25C39.4256 11.5 42 14.0744 42 17.25V24.0436C39.9794 22.75 37.5773 22 35 22C33.8186 22 32.6739 22.1576 31.586 22.4529C30.5222 19.2834 27.5278 17 24 17C19.5817 17 16 20.5817 16 25C16 28.7945 18.6418 31.972 22.1865 32.7936C22.0639 33.5107 22 34.2479 22 35C22 36.7718 22.3545 38.4608 22.9963 40H11.75C8.57436 40 6 37.4256 6 34.25V17.25C6 14.0744 8.57436 11.5 11.75 11.5H15.5145L16.8 9.18602Z" fill="#353535" />
                                            <path d="M24 19.5C20.9624 19.5 18.5 21.9624 18.5 25C18.5 27.6415 20.3622 29.8481 22.8454 30.3786C24.0153 27.3035 26.3187 24.7871 29.2451 23.34C28.5411 21.1138 26.459 19.5 24 19.5Z" fill="#353535" />
                                            <path d="M35 46C41.0751 46 46 41.0751 46 35C46 28.9249 41.0751 24 35 24C28.9249 24 24 28.9249 24 35C24 41.0751 28.9249 46 35 46ZM35 28C35.5523 28 36 28.4477 36 29V34H41C41.5523 34 42 34.4477 42 35C42 35.5523 41.5523 36 41 36H36V41C36 41.5523 35.5523 42 35 42C34.4477 42 34 41.5523 34 41V36H29C28.4477 36 28 35.5523 28 35C28 34.4477 28.4477 34 29 34H34V29C34 28.4477 34.4477 28 35 28Z" fill="#353535" />
                                        </svg>
                                }
                            </label>
                            <p>Обложка кастинга</p>
                        </div>
                        <div className='gallery'>
                            <div>
                                {castingGallery.length > 0 && castingGallery.map((photo, i) => (
                                    <div
                                        className={`img__wrapper ${imgFocus && imgFocus == i + 1 ? 'active' : ''}`}
                                        onMouseEnter={() => setImgFocus(i + 1)}
                                        onMouseLeave={() => setImgFocus(null)}
                                        key={i}
                                    >
                                        <img src={photo} alt='casting-pic' />
                                        <button type='button' onClick={() => addCastingGallery(castingGallery.filter((val, i) => i + 1 !== imgFocus))}>
                                            <svg width="30" height="30" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0 10.1479C0 4.54322 4.54322 0 10.1479 0C15.7526 0 20.2958 4.54322 20.2958 10.1479C20.2958 15.7526 15.7526 20.2958 10.1479 20.2958C4.54322 20.2958 0 15.7526 0 10.1479ZM8.32839 6.89348C8.137 6.70862 7.88066 6.60634 7.61458 6.60865C7.34851 6.61096 7.09399 6.71769 6.90584 6.90584C6.71769 7.09399 6.61096 7.34851 6.60865 7.61458C6.60634 7.88066 6.70862 8.137 6.89348 8.32839L8.713 10.1479L6.89348 11.9674C6.79655 12.061 6.71924 12.173 6.66606 12.2968C6.61287 12.4206 6.58488 12.5538 6.58371 12.6885C6.58254 12.8233 6.60822 12.9569 6.65924 13.0816C6.71026 13.2063 6.78562 13.3196 6.8809 13.4149C6.97618 13.5102 7.08948 13.5856 7.2142 13.6366C7.33891 13.6876 7.47254 13.7133 7.60728 13.7121C7.74202 13.7109 7.87518 13.6829 7.99899 13.6298C8.1228 13.5766 8.23478 13.4993 8.32839 13.4023L10.1479 11.5828L11.9674 13.4023C12.1588 13.5872 12.4152 13.6895 12.6812 13.6872C12.9473 13.6849 13.2018 13.5781 13.39 13.39C13.5781 13.2018 13.6849 12.9473 13.6872 12.6812C13.6895 12.4152 13.5872 12.1588 13.4023 11.9674L11.5828 10.1479L13.4023 8.32839C13.5872 8.137 13.6895 7.88066 13.6872 7.61458C13.6849 7.34851 13.5781 7.09399 13.39 6.90584C13.2018 6.71769 12.9473 6.61096 12.6812 6.60865C12.4152 6.60634 12.1588 6.70862 11.9674 6.89348L10.1479 8.713L8.32839 6.89348V6.89348Z" fill="#353535" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                {castingGallery.length < 3 && <div className='upload-photo'>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        id='gallery'
                                        name='gallery'
                                        onChange={handlePhoto}
                                    />
                                    <label htmlFor='gallery'>
                                        <svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.8 9.18602C17.5496 7.83679 18.9717 7 20.5152 7H27.4848C29.0283 7 30.4504 7.83679 31.2 9.18602L32.4855 11.5H36.25C39.4256 11.5 42 14.0744 42 17.25V24.0436C39.9794 22.75 37.5773 22 35 22C33.8186 22 32.6739 22.1576 31.586 22.4529C30.5222 19.2834 27.5278 17 24 17C19.5817 17 16 20.5817 16 25C16 28.7945 18.6418 31.972 22.1865 32.7936C22.0639 33.5107 22 34.2479 22 35C22 36.7718 22.3545 38.4608 22.9963 40H11.75C8.57436 40 6 37.4256 6 34.25V17.25C6 14.0744 8.57436 11.5 11.75 11.5H15.5145L16.8 9.18602Z" fill="#353535" />
                                            <path d="M24 19.5C20.9624 19.5 18.5 21.9624 18.5 25C18.5 27.6415 20.3622 29.8481 22.8454 30.3786C24.0153 27.3035 26.3187 24.7871 29.2451 23.34C28.5411 21.1138 26.459 19.5 24 19.5Z" fill="#353535" />
                                            <path d="M35 46C41.0751 46 46 41.0751 46 35C46 28.9249 41.0751 24 35 24C28.9249 24 24 28.9249 24 35C24 41.0751 28.9249 46 35 46ZM35 28C35.5523 28 36 28.4477 36 29V34H41C41.5523 34 42 34.4477 42 35C42 35.5523 41.5523 36 41 36H36V41C36 41.5523 35.5523 42 35 42C34.4477 42 34 41.5523 34 41V36H29C28.4477 36 28 35.5523 28 35C28 34.4477 28.4477 34 29 34H34V29C34 28.4477 34.4477 28 35 28Z" fill="#353535" />
                                        </svg>
                                    </label>
                                </div>
                                }
                            </div>
                            <p>Фотографии кастинга</p>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
                <div className='basic_requierments'>
                    <h2>Общие требования</h2>
                    <label>
                        Специалист на кастинг
                        <select>
                            <option>Подиум</option>
                            <option>Модели</option>
                            <option>Промо</option>
                            <option>Видео</option>
                            <option>Клипы</option>
                            <option>Кино</option>
                            <option>Танцоры</option>
                            <option>Диджеи</option>
                            <option>Вокалисты</option>
                            <option>Фотографы</option>
                            <option>Стилисты</option>
                            <option>Визажисты</option>
                            <option>Ведущие</option>
                            <option>Блоггеры</option>
                            <option>Дети</option>
                            <option>Близнецы</option>
                            <option>Плюс сайз</option>
                            <option>Беременные</option>
                            <option>Темнокожие</option>
                        </select>
                    </label>
                    <label>
                        Пол
                        <select>
                            <option>Любой</option>
                            <option>Женский</option>
                            <option>Мужской</option>
                        </select>
                    </label>
                    <label className='citizenship'>
                        Гражданство
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
                    </label>
                    <label>
                        Возраст
                        <div>
                            <input type='number' min={1} max={100} placeholder='от 1' />
                            <input type='number' min={1} max={100} placeholder='от 100' />
                        </div>
                    </label>
                    <label>
                        Навыки
                        <ReactTextareaAutosize minRows={1} maxRows={3} placeholder='Навыки, перечисляйте, через, запятую' />
                    </label>
                </div>
                <div className='model_traits'>
                    <h2>Требуемые качества модели</h2>
                    <label>
                        Косметические особенности
                        <select>
                            <option>Нет</option>
                            <option>Татуаж</option>
                            <option>Пирсинг</option>
                        </select>
                    </label>
                    <label>
                        Наличие косметической хирургии
                        <select>
                            <option>Нет</option>
                            <option>Пластика губ</option>
                            <option>Маммопластика</option>
                        </select>
                    </label>
                    <label className='city_input'>
                        Наличие татуировок
                        <div className='flex__wrapper radio_input'>
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
                    <label>
                        Иностранный язык
                        <div className='lang__selects'>
                            <select disabled={langValue && langValue !== 'Не требуется' ? false : true}>
                                <option>Базовый</option>
                                <option>Средний</option>
                                <option>Продвинутый</option>
                                <option>Свободное владение</option>
                            </select>
                            <select onChange={(e) => setLangValue(e.target.value)}>
                                <option>Не требуется</option>
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
                    </label>
                    <label className='city_input'>
                        Готовность к командировкам
                        <div className='flex__wrapper radio_input'>
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
                </div>
                <div className='casting_details'>
                    <h2>Подробности кастинга</h2>
                    <label className='city_input'>
                        Город
                        <div className='wrap'>
                            <input type='text' placeholder='Место проведения' value={cityValue} onChange={(e) => {
                                setCityValue(e.target.value)
                                setCityDrop(true)
                            }} />
                            {
                                cityValue &&
                                cityDrop &&
                                <div className='cities__container'>
                                    {cities.map((city, i) => (
                                        cityValue !== city.city ?
                                            city.city.includes(cityValue) &&
                                            <p onClick={() => setCityValue(city.city)} key={i}>{city.city}</p>
                                            :
                                            setCityDrop(false)
                                    ))}
                                </div>
                            }
                        </div>
                    </label>
                    <label>
                        Количество моделей
                        <div>
                            <input type='number' min={1} max={100} placeholder='от 1' />
                        </div>
                    </label>
                    <label className='price'>
                        Точная стоимость услуг, ₽
                        <div>
                            <input
                                type='number'
                                min={1}
                                max={100}
                                placeholder={`10000`.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
                            />
                        </div>
                    </label>
                    <label>
                        Диапазон стоимости услуг, ₽
                        <div>
                            <input
                                type='number'
                                min={1}
                                max={100}
                                placeholder={`10000`.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
                            />
                            <input
                                type='number'
                                min={1}
                                max={100}
                                placeholder={`10000`.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
                            />
                        </div>
                    </label>
                    <label className='date_input'>
                        Дата начала кастинга
                        <input type='date' />
                    </label>
                    <label className='date_input'>
                        Дата окончания кастинга
                        <input type='date' />
                    </label>
                    <label className='date_input'>
                        Дата начала мероприятия
                        <input type='date' />
                    </label>
                    <label>
                        Дополнительная информация
                        <ReactTextareaAutosize minRows={1} maxRows={5} placeholder='Не обязательно для заполнения' />
                    </label>
                </div>
                <div className='event_info'>
                    <h2>Контактная информация</h2>
                    <label className='phone_input'>
                        Номер телефона
                        <Controller
                            control={control}
                            name='phoneNumber'
                            rules={{
                                validate: {
                                    isValid: (value) => {
                                        if (value) {
                                            const callingCode = getCountryCallingCode(phoneCountryCode);
                                            if (!new RegExp(`^\\+${callingCode}$`).test(value)) {
                                                return !!parsePhoneNumber(value);
                                            }
                                        }
                                        return true;
                                    }
                                }
                            }}
                            render={({ field }) => (
                                <PhoneInput
                                    {...field}
                                    onCountryChange={(v) => setPhoneCountryCode(v)}
                                    defaultCountry={location ? location.country : 'RU'}
                                    international
                                    withCountryCallingCode
                                    autoFocus
                                    labels={ru}
                                />
                            )}
                        >
                        </Controller>
                    </label>
                    <label>
                        Имя контактного лица
                        <input type='text' placeholder='Введите имя' />
                    </label>
                    <label>
                        Электронная почта для связи
                        <input type='text' placeholder='Введите электронную почту' />
                    </label>
                </div>
                <button className='apply'>Создать</button>
            </form>
        </section >
    )
}

export default AddCasting;