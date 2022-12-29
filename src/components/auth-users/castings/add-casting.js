import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import cities from '../../../store/cities.json';
import PhoneInput, {
    parsePhoneNumber,
    getCountryCallingCode
} from "react-phone-number-input";
import ru from 'react-phone-number-input/locale/ru';
import { Upload } from "upload-js";

import Lottie from "lottie-react";
import loadingIcon from '../../../assets/loading-icon.json';

const AddCasting = ({ url, token, navigate, userId, location, setStateAsideFilter }) => {
    const [cityValue, setCityValue] = useState('');
    const [cityDrop, setCityDrop] = useState(true);
    const [langValue, setLangValue] = useState('0');
    const [castingCover, addCastingCover] = useState('');
    const [castingGallery, addCastingGallery] = useState([]);
    const [imgFocus, setImgFocus] = useState(null);
    const [phoneCountryCode, setPhoneCountryCode] = useState('');
    const [loadingProgress, setLoadingProgress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        setPhoneCountryCode(location.country);
    }, [])

    const handlePhoto = async (e, path) => {
        let file = e.target.files[0];

        const upload = Upload({
            apiKey: "public_kW15b1GB389CPsY8LTuoYBAFX7BR"
        });


        const { fileUrl, filePath } = await upload.uploadFile(
            file,
            {
                onBegin: ({ cancel }) => {
                },
                onProgress: ({ progress }) => {
                    setLoadingProgress({ path: path, progress: progress });
                },
                metadata: {
                    productId: 60891
                },
                tags: [
                    "product_image"
                ],
                path: {
                    folderPath: "/uploads/castings/{UTC_YEAR}/{UTC_MONTH}/{UTC_DAY}",
                    fileName: "{UNIQUE_DIGITS_8}{ORIGINAL_FILE_EXT}"
                }
            }
        );

        if (path === 'cover') {
            addCastingCover(fileUrl);
        } else {
            addCastingGallery([fileUrl, ...castingGallery])
        }
    }

    const onSubmit = data => {
        let gallery = castingCover ? castingCover.split('//')[1].replace(/\//gi, '...') : '';
        castingGallery && castingGallery.forEach(photo => gallery += ', ' + photo.split('//')[1].replace(/\//gi, '...'));
        let castingDataToNum = {};
        for (let i in data) {
            castingDataToNum[i] = (parseInt(data[i]) && i !== 'contact_phone' && i !== 'event_start' && i !== 'casting_end' && i !== 'casting_start') || parseInt(data[i]) === 0 ? +data[i] : data[i]
        }

        const castingData = encodeURIComponent(JSON.stringify({ user_id: userId, ...castingDataToNum, service_cost_min: data.service_cost_min ? +data.service_cost_min : 0, service_cost_max: data.service_cost_max ? +data.service_cost_max : 0, foto: gallery }));

        setIsLoading(true);

        console.log({ user_id: userId, ...castingDataToNum, service_cost_min: 0, service_cost_max: 0, foto: gallery });

        fetch(`${url}/setNewCasting/${token}/${castingData}`)
            .then(response => {
                if (response.status === 200) {
                    navigate('/castings');
                    setIsLoading(false);
                }
            })
    }

    return (
        <section className='add-casting__wrapper'>
            <div className='user_title'>
                <h1>Добавление кастинга</h1>
                <button className='hamburger_btn' onClick={() => {
                    setStateAsideFilter(true);
                    document.body.style.overflowY = 'hidden';
                }}><span></span><span></span></button>
            </div>
            <form className='add-casting__form' onSubmit={handleSubmit(onSubmit)}>
                <div className='casting_media'>
                    <h2>Добавить фотографии</h2>
                    <div className='flex__wrapper'>
                        <div className='upload-photo'>
                            <input
                                type='file'
                                accept='image/*'
                                id='cover'
                                name='cover'
                                onChange={(e) => handlePhoto(e, 'cover')}
                            />
                            <label htmlFor='cover'>
                                {loadingProgress && loadingProgress.path === 'cover' && loadingProgress.progress < 100 && <p className='loading'>{loadingProgress.progress} %</p>}
                                {castingCover ?
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
                            <div className={`wrapper ${castingGallery.length > 2 ? 'scroll' : ''}`}>
                                {castingGallery.length <= 12 && <div className='upload-photo'>
                                    {loadingProgress && loadingProgress.path === 'gallery' && loadingProgress.progress < 100 && <p className='loading'>{loadingProgress.progress} %</p>}
                                    <input
                                        type='file'
                                        accept='image/*'
                                        id='gallery'
                                        name='gallery'
                                        onChange={(e) => handlePhoto(e, 'gallery')}
                                        multiple
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
                            </div>
                            <p>Фотографии кастинга</p>
                        </div>
                    </div>
                </div>
                <div className='basic_requierments'>
                    <h2>Общие требования</h2>
                    <label className='title'>
                        Название кастинга
                        <input type='text' placeholder='Введите название кастинга' {...register('title')} />
                    </label>
                    <label>
                        Специалист на кастинг
                        <select {...register('ci_specialist_id')}>
                            <option value={1}>Подиум</option>
                            <option value={2}>Модели</option>
                            <option value={3}>Промо</option>
                            <option value={4}>Видео</option>
                            <option value={5}>Клипы</option>
                            <option value={6}>Кино</option>
                            <option value={7}>Танцоры</option>
                            <option value={8}>Диджеи</option>
                            <option value={9}>Вокалисты</option>
                            <option value={10}>Фотографы</option>
                            <option value={11}>Стилисты</option>
                            <option value={12}>Визажисты</option>
                            <option value={13}>Ведущие</option>
                            <option value={14}>Блоггеры</option>
                            <option value={15}>Дети</option>
                            <option value={16}>Близнецы</option>
                            <option value={17}>Плюс сайз</option>
                            <option value={18}>Беременные</option>
                            <option value={19}>Темнокожие</option>
                        </select>
                    </label>
                    <label>
                        Пол
                        <select {...register('ci_gender_id')}>
                            <option value={0}>Любой</option>
                            <option value={1}>Женский</option>
                            <option value={2}>Мужской</option>
                        </select>
                    </label>
                    <label className='citizenship'>
                        Гражданство
                        <select {...register('ci_nationality_id')}>
                            <option value={1}>Российская Федерация</option>
                            <option value={2}>Республика Беларусь</option>
                            <option value={3}>Украина</option>
                            <option value={4}>Азербайджанская Республика</option>
                            <option value={5}>Республика Армения</option>
                            <option value={6}>Республика Казахстан</option>
                            <option value={7}>Кыргызская Республика</option>
                            <option value={8}>Республика Молдова</option>
                            <option value={9}>Республика Таджикистан</option>
                            <option value={10}>Республика Узбекистан</option>
                            <option value={11}>Туркменистан</option>
                        </select>
                    </label>
                    <label>
                        Возраст
                        <div>
                            <input type='number' min={1} max={100} placeholder='от 1' {...register('age_min')} />
                            <input type='number' min={1} max={100} placeholder='от 100' {...register('age_max')} />
                        </div>
                    </label>
                    <label>
                        Навыки
                        <ReactTextareaAutosize minRows={1} maxRows={3} placeholder='Навыки, перечисляйте, через, запятую' {...register('skills')} />
                    </label>
                </div>
                <div className='model_traits'>
                    <h2>Требуемые качества модели</h2>
                    <label>
                        Косметические особенности
                        <select {...register('ci_cosmetic_id')}>
                            <option value={0}>Нет</option>
                            <option value={1}>Татуаж</option>
                            <option value={2}>Пирсинг</option>
                        </select>
                    </label>
                    <label>
                        Наличие косметической хирургии
                        <select {...register('ci_surgery_id')}>
                            <option value={0}>Нет</option>
                            <option value={1}>Пластика губ</option>
                            <option value={2}>Маммопластика</option>
                        </select>
                    </label>
                    <label className='city_input'>
                        Наличие татуировок
                        <div className='flex__wrapper radio_input'>
                            <input
                                id='tattoos-yes'
                                type='radio'
                                name='tattoos'
                                value={1}
                                {...register('tattoos')}
                            />
                            <label htmlFor='tattoos-yes'>
                                Да
                            </label>
                            <input
                                id='tattoos-no'
                                type='radio'
                                name='tattoos'
                                value={0}
                                {...register('tattoos')}
                            />
                            <label htmlFor='tattoos-no'>
                                Нет
                            </label>
                        </div>
                    </label>
                    <label>
                        Иностранный язык
                        <div className='lang__selects'>
                            <select disabled={langValue && langValue !== '0' ? false : true} {...register('ci_langiage_id')}>
                                <option value={1}>Базовый</option>
                                <option value={2}>Средний</option>
                                <option value={3}>Продвинутый</option>
                                <option value={4}>Свободное владение</option>
                            </select>
                            <select value={langValue} {...register('ci_langiage_dop_id')} onChange={(e) => setLangValue(e.target.value)}>
                                <option value={0}>Не требуется</option>
                                <option value={1}>Английский</option>
                                <option value={2}>Испанский</option>
                                <option value={3}>Французский</option>
                                <option value={4}>Немецкий</option>
                                <option value={5}>Японский</option>
                                <option value={6}>Итальянский</option>
                                <option value={7}>Корейский</option>
                                <option value={8}>Арабский</option>
                            </select>
                        </div>
                    </label>
                    <label className='city_input'>
                        Готовность к командировкам
                        <div className='flex__wrapper radio_input'>
                            <input
                                id='business-trips-yes'
                                type='radio'
                                name='business-trips'
                                value={1}
                                {...register('business_trips')}
                            />
                            <label htmlFor='business-trips-yes'>
                                Да
                            </label>
                            <input
                                id='business-trips-no'
                                type='radio'
                                name='business-trips'
                                value={0}
                                {...register('business_trips')}
                            />
                            <label htmlFor='business-trips-no'>
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
                            <input type='text' placeholder='Место проведения' value={cityValue} {...register('city')} onChange={(e) => {
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
                            <input type='number' min={1} max={100} placeholder='от 1' {...register('num_models')} />
                        </div>
                    </label>
                    <label className='price'>
                        Точная стоимость услуг, ₽
                        <div>
                            <input
                                type='number'
                                placeholder={`10000`.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
                                {...register('service_cost')}
                            />
                        </div>
                    </label>
                    <label>
                        Диапазон стоимости услуг, ₽
                        <div>
                            <input
                                type='number'
                                placeholder={`10000`.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
                                {...register('service_cost_min')}
                            />
                            <input
                                type='number'
                                placeholder={`10000`.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}
                                {...register('service_cost_max')}
                            />
                        </div>
                    </label>
                    <label className='date_input'>
                        Дата начала кастинга
                        <input type='date' {...register('casting_start')} />
                    </label>
                    <label className='date_input'>
                        Дата окончания кастинга
                        <input type='date' {...register('casting_end')} />
                    </label>
                    <label className='date_input'>
                        Дата начала мероприятия
                        <input type='date' {...register('event_start')} />
                    </label>
                    <label>
                        Дополнительная информация
                        <ReactTextareaAutosize minRows={1} maxRows={5} placeholder='Не обязательно для заполнения' {...register('information')} />
                    </label>
                </div>
                <div className='event_info'>
                    <h2>Контактная информация</h2>
                    <label className='phone_input'>
                        Номер телефона
                        <Controller
                            control={control}
                            name='contact_phone'
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
                                    labels={ru}
                                />
                            )}
                        >
                        </Controller>
                    </label>
                    <label>
                        Имя контактного лица
                        <input type='text' placeholder='Введите имя' {...register('contact_name')} />
                    </label>
                    <label>
                        Электронная почта для связи
                        <input type='text' placeholder='Введите электронную почту' {...register('contact_email')} />
                    </label>
                </div>
                <button className='apply'>
                    {!isLoading ?
                        'Создать'
                        :
                        <div className='loading_icon'>
                            <Lottie animationData={loadingIcon} />
                        </div>
                    }
                </button>
            </form>
        </section >
    )
}

export default AddCasting;