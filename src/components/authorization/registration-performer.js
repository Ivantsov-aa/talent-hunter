import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';

import Lottie from "lottie-react";
import applyIcon from '../../assets/apply-icon.json';
import UploadPhotoPopUp from "./upload-photo-pop-up";

const RegistrationPerformer = ({ setRoleChoice, handleClickRegistrationBtn, stylesBeforeOpenPopUp, setChangesStyle, navigate, registrationSubmit }) => {
    const [directionPerformer, setDirectionPerformer] = useState(null);
    const [dasharray, setDasharray] = useState([1, 250]);
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({});
    const [arrayCycle, setArrayCycle] = useState([]);

    const [languageNone, setLanguageNone] = useState(false);

    const [photoArray, addPhotoArray] = useState([]);
    const [musicArray, addMusicArray] = useState([]);
    const [videoArray, addVideoArray] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit'
    });

    useEffect(() => {
        const cycle = [];

        for (let a = 40; a < 231; a++) {
            cycle.push(a);
        }

        setArrayCycle(cycle);

        setTimeout(() => {
            switch (true) {
                case directionPerformer && directionPerformer === 'model':
                    setDasharray([28, 223]) // 28
                    break;

                case directionPerformer && directionPerformer === 'special':
                    setDasharray([32, 219]) // 32
                    break;

                case directionPerformer && directionPerformer === 'production':
                    setDasharray([36, 215]) // 36
                    break;

                default:
                    break;
            }
        }, 100)
    }, [directionPerformer])

    const handlePrevStepClick = () => {
        if (step === 1) {
            setDirectionPerformer(null);
        } else {
            switch (directionPerformer) {
                case 'model':
                    setStep(step - 1);
                    setDasharray([dasharray[0] - 28, dasharray[1] + 28]);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                    break;

                case 'special':
                    setStep(step - 1);
                    setDasharray([dasharray[0] - 32, dasharray[1] + 32]);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                    break;

                case 'production':
                    setStep(step - 1);
                    setDasharray([dasharray[0] - 36, dasharray[1] + 36]);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                    break;

                default:
                    break;
            }
        }
    }

    const handleAddMedia = e => {
        // let file = URL.createObjectURL(e.target.files[0]);

        // e.preventDefault();

        console.log(musicArray);

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
            if (e.target.name === 'photo') {
                addPhotoArray([reader.result, ...photoArray]);

            } else if (e.target.name === 'music') {
                addMusicArray([reader.result, ...musicArray]);
            } else {
                addVideoArray([reader.result, ...videoArray]);
            }
        }

        reader.readAsDataURL(file);
    }

    const onSubmit = data => {
        setUserData(data);
        switch (directionPerformer) {
            case 'model':
                switch (true) {
                    case step !== 9:
                        setStep(step + 1);
                        setDasharray([dasharray[0] + 28, dasharray[1] - 28]);
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })
                        break;

                    default:
                        setStep('apply_questionnaire');
                        registrationSubmit({ ...data, portfolio_photo: photoArray, portfolio_music: musicArray, portfolio_video: videoArray }, 'quastionnaire');
                        break;
                }
                break;

            case 'special':
                switch (true) {
                    case step !== 8:
                        setStep(step + 1);
                        setDasharray([dasharray[0] + 32, dasharray[1] - 32]);
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })
                        break;
                    default:
                        setStep('apply_questionnaire');
                        registrationSubmit({ ...data, portfolio_photo: photoArray, portfolio_music: musicArray, portfolio_video: videoArray }, 'quastionnaire');
                        break;
                }
                break;

            case 'production':
                switch (true) {
                    case step !== 7:
                        setStep(step + 1);
                        setDasharray([dasharray[0] + 36, dasharray[1] - 36]);
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })
                        break;

                    default:
                        setStep('apply_questionnaire');
                        registrationSubmit({ ...data, portfolio_photo: photoArray, portfolio_music: musicArray, portfolio_video: videoArray }, 'quastionnaire');
                        break;
                }
                break;

            default:
                break;
        }
    }

    return (
        step !== 'success' ?
            <form className={`registration__wrapper role__container performer__container animate__animated animate__fadeIn`} onSubmit={handleSubmit(onSubmit)}>
                {!directionPerformer ?
                    <>
                        <button type="button" className='registration_close' onClick={handleClickRegistrationBtn}>+</button>
                        <h1>Ваше направление</h1>
                        <section className='performer__direction-choice'>
                            <button type='button' className="model" onClick={() => setDirectionPerformer('model')}><p>Модель</p></button>
                            <button type='button' className="special" onClick={() => setDirectionPerformer('special')}><p>Особые кадры</p></button>
                            <button type='button' className="production" onClick={() => setDirectionPerformer('production')}><p>Продакшн</p></button>
                            <button type='button' onClick={() => setRoleChoice(null)}>Назад</button>
                        </section>
                    </>
                    :
                    (
                        step !== 'apply_questionnaire' ?
                            <section className='customer__wrapper'>
                                <button type="button" className='registration_close' onClick={handleClickRegistrationBtn}>+</button>
                                <div className='customer__title'>
                                    <div className='steps_circle'>
                                        <p className='svg__wrapper'>
                                            <svg className="progressbar__svg">
                                                <circle cx="42" cy="42.5" r="39.5" className='progressbar__svg-circle circle-html shadow-html' style={{ '--length-step-line': `${dasharray[0]} ${dasharray[1]}` }}> </circle>
                                            </svg>
                                        </p>
                                        <p><span>{step}</span>/{
                                            (directionPerformer === 'model' && '9')
                                            ||
                                            (directionPerformer === 'special' && '8')
                                            ||
                                            (directionPerformer === 'production' && '7')
                                        }</p>
                                    </div>
                                    <h1>Анкета <span>{
                                        (directionPerformer === 'model' && step >= 1 && step <= 2 && 'Основное')
                                        ||
                                        (directionPerformer === 'model' && step >= 3 && step <= 5 && 'Внешние данные')
                                        ||
                                        (directionPerformer === 'model' && step >= 6 && step <= 9 && 'Дополнительное')
                                        ||
                                        (directionPerformer === 'special' && step >= 1 && step <= 2 && 'Основное')
                                        ||
                                        (directionPerformer === 'special' && step >= 3 && step <= 5 && 'Внешние данные')
                                        ||
                                        (directionPerformer === 'special' && step >= 6 && step <= 8 && 'Дополнительное')
                                        ||
                                        (directionPerformer === 'production' && step >= 1 && step <= 2 && 'Основное')
                                        ||
                                        (directionPerformer === 'production' && step === 3 && 'Внешние данные')
                                        ||
                                        (directionPerformer === 'production' && step >= 4 && step <= 7 && 'Дополнительное')
                                    }</span></h1>
                                </div>
                                <div className='customer_content'>
                                    {
                                        step === 1 &&
                                        <>
                                            <label>
                                                Имя
                                                <input
                                                    type='text'
                                                    className='phone_input'
                                                    placeholder='Ваше имя'
                                                    autoFocus
                                                    {...register('first_name')}
                                                />
                                            </label>
                                            <label>
                                                Фамилия
                                                <input
                                                    type='text'
                                                    className='phone_input'
                                                    placeholder='Ваша фамилия'
                                                    {...register('last_name')}
                                                />
                                            </label>
                                            <label>
                                                Отчество
                                                <input
                                                    type='text'
                                                    className='phone_input'
                                                    placeholder='Ваше отчество'
                                                    {...register('patronymic')}
                                                />
                                            </label>
                                            <label className='date_label'>
                                                Дата рождения
                                                <input
                                                    type='date'
                                                    className='phone_input'
                                                    {...register('date')}
                                                />
                                            </label>
                                            <label className='select__wrapper'>
                                                Ваш пол
                                                <select {...register('gender')}>
                                                    <option>Мужской</option>
                                                    <option>Женский</option>
                                                </select>
                                            </label>
                                        </>
                                    }
                                    {
                                        step === 2 &&
                                        <>
                                            <label>
                                                Город
                                                <input
                                                    type='text'
                                                    className='phone_input'
                                                    placeholder='Москва'
                                                    autoFocus
                                                    {...register('city')}
                                                />
                                            </label>
                                            <label>
                                                Ваша почта
                                                <input
                                                    type='text'
                                                    className='phone_input'
                                                    placeholder='zalmary248@yandex.ru'
                                                    {...register('email')}
                                                />
                                            </label>
                                            {directionPerformer !== 'model' &&
                                                <>
                                                    <label className='radio_input'>
                                                        Семейное положение (замужем/женат)
                                                        <div>
                                                            <input
                                                                id='married-yes'
                                                                type='radio'
                                                                name='married'
                                                                value={1}
                                                                {...register('married')}
                                                            />
                                                            <label htmlFor='married-yes'>
                                                                Да
                                                            </label>
                                                            <input
                                                                id='married-no'
                                                                type='radio'
                                                                name='married'
                                                                value={0}
                                                                {...register('married')}
                                                            />
                                                            <label htmlFor='married-no'>
                                                                Нет
                                                            </label>
                                                        </div>
                                                    </label>
                                                    <label className='radio_input'>
                                                        Наличие детей
                                                        <div>
                                                            <input
                                                                id='children-yes'
                                                                type='radio'
                                                                name='children'
                                                                value={1}
                                                                {...register('children')}
                                                            />
                                                            <label htmlFor='children-yes'>
                                                                Да
                                                            </label>
                                                            <input
                                                                id='children-no'
                                                                type='radio'
                                                                name='children'
                                                                value={0}
                                                                {...register('children')}
                                                            />
                                                            <label htmlFor='children-no'>
                                                                Нет
                                                            </label>
                                                        </div>
                                                    </label>
                                                </>
                                            }
                                        </>
                                    }
                                    {
                                        step === 3 &&
                                        (directionPerformer !== 'production' ?
                                            <>
                                                <div className='select_group__wrapper'>
                                                    <div>
                                                        <select {...register('head_type')} defaultValue='head_type'>
                                                            <option value='head_type' disabled>Вид головы</option>
                                                            <option value='medium'>Средняя</option>
                                                            <option value='round'>Круглая</option>
                                                            <option value='oval'>Овальная</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <select {...register('eye_color')} defaultValue='eye_color'>
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
                                                        <select {...register('eye_shape')} defaultValue='eye_shape'>
                                                            <option value='eye_shape' disabled>Разрез глаз</option>
                                                            <option>Классический</option>
                                                            <option>Европейский</option>
                                                            <option>Азиатский</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <select {...register('skin_color')} defaultValue='skin_color'>
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
                                                        <select {...register('race')}>
                                                            <option>Евразийская</option>
                                                            <option>Экваториальная</option>
                                                            <option>Негро-австралоидная</option>
                                                        </select>
                                                    </div>
                                                </label>
                                                <div className='select_group__wrapper'>
                                                    <div>
                                                        <select {...register('nose_shape')} defaultValue='nose_shape'>
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
                                                        <select {...register('lip_shape')} defaultValue='lip_shape'>
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
                                                        <select {...register('hair_color')} defaultValue='hair_color'>
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
                                                        <select {...register('hair_length')} defaultValue='hair_length'>
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
                                            </>
                                            :
                                            <>
                                                <label className='select__wrapper'>
                                                    Телосложение
                                                    <div>
                                                        <select {...register('body_type')}>
                                                            <option>Стройное</option>
                                                            <option>Худощавое</option>
                                                            <option>Полное</option>
                                                            <option>Атлетичное</option>
                                                            <option>Мускулистое</option>
                                                        </select>
                                                    </div>
                                                </label>
                                                <label className='select__wrapper'>
                                                    Расовая принадлежность
                                                    <div>
                                                        <select {...register('race')}>
                                                            <option>Евразийская</option>
                                                            <option>Экваториальная</option>
                                                            <option>Негро-австралоидная</option>
                                                        </select>
                                                    </div>
                                                </label>
                                                <label className='select__wrapper'>
                                                    Косметические особенности
                                                    <div>
                                                        <select {...register('cosmetic_features')}>
                                                            <option>Нет</option>
                                                            <option>Татуаж</option>
                                                            <option>Пирсинг</option>
                                                        </select>
                                                    </div>
                                                </label>
                                                <label className='select__wrapper'>
                                                    Наличие косметической хирургии
                                                    <div>
                                                        <select {...register('cosmetic_surgery')} >
                                                            <option>Нет</option>
                                                            <option>Пластика губ</option>
                                                            <option>Маммопластика</option>
                                                        </select>
                                                    </div>
                                                </label>
                                                <label className='select__wrapper'>
                                                    Наличие татуировок
                                                    <div>
                                                        <select {...register('tattoo')}>
                                                            <option >Нет</option>
                                                            <option>от 1 до 3</option>
                                                            <option>4 и более</option>
                                                        </select>
                                                    </div>
                                                </label>
                                            </>
                                        )
                                    }
                                    {
                                        step === 4 &&
                                        (directionPerformer !== 'production' ?
                                            <>
                                                <div className='select_group__wrapper'>
                                                    <div>
                                                        <select {...register('haircut')} defaultValue='haircut'>
                                                            <option value='haircut' disabled>Стрижка волос</option>
                                                            {userData.gender === 'Мужской' ?
                                                                <>
                                                                    <option>«Под ноль»</option>
                                                                    <option>«Кроп»</option>
                                                                    <option>«Флэт-топ»</option>
                                                                    <option>«Фэйд»</option>
                                                                    <option>«Помпадур»</option>
                                                                    <option>«Ирокез»</option>
                                                                    <option>«Канадка»</option>
                                                                    <option>«Топ нот»</option>
                                                                    <option>«Мужское каре»</option>
                                                                </>
                                                                :
                                                                <>
                                                                    <option>«Пикси»</option>
                                                                    <option>«Каре»</option>
                                                                    <option>«Каскад»</option>
                                                                    <option>«Лесенка»</option>
                                                                    <option>«Прямой срез»</option>
                                                                    <option>«Шэг»</option>
                                                                </>
                                                            }
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <select {...register('stature')} defaultValue='stature'>
                                                            <option value='stature' disabled>Рост, см</option>
                                                            {
                                                                arrayCycle.map((item, i) => (
                                                                    item >= 80 && item <= 230 && <option key={i}>{item}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <select {...register('clothing_size')} defaultValue='clothing_size'>
                                                            <option value='clothing_size' disabled>Размер одежды</option>
                                                            {userData.gender === 'Мужской' ?
                                                                <>
                                                                    <option>S (46)</option>
                                                                    <option>M (48)</option>
                                                                    <option>L (50)</option>
                                                                    <option>XL (52)</option>
                                                                    <option>XXL (54)</option>
                                                                    <option>3XL (56)</option>
                                                                    <option>4XL (58)</option>
                                                                    <option>5XL (60)</option>
                                                                </>
                                                                :
                                                                <>
                                                                    <option>XXS (34)</option>
                                                                    <option>XS (36)</option>
                                                                    <option>S (38)</option>
                                                                    <option>M (40)</option>
                                                                    <option>L (42)</option>
                                                                    <option>XL (44)</option>
                                                                    <option>XXL (46)</option>
                                                                    <option>3XL (48)</option>
                                                                    <option>4XL (50)</option>
                                                                    <option>5XL (52)</option>
                                                                </>
                                                            }
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <select {...register('shoe_size')} defaultValue='shoe_size'>
                                                            <option value='shoe_size' disabled>Размер обуви</option>
                                                            {userData.gender === 'Мужской' ?
                                                                <>
                                                                    <option>38</option>
                                                                    <option>39</option>
                                                                    <option>40</option>
                                                                    <option>41</option>
                                                                    <option>42</option>
                                                                    <option>43</option>
                                                                    <option>44</option>
                                                                    <option>45</option>
                                                                    <option>46</option>
                                                                </>
                                                                :
                                                                <>
                                                                    <option>34</option>
                                                                    <option>35</option>
                                                                    <option>36</option>
                                                                    <option>37</option>
                                                                    <option>38</option>
                                                                    <option>39</option>
                                                                    <option>40</option>
                                                                    <option>41</option>
                                                                    <option>42</option>
                                                                </>
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <label className='select__wrapper'>
                                                    Телосложение
                                                    <div>
                                                        <select {...register('body_type')}>
                                                            <option>Стройное</option>
                                                            <option>Худощавое</option>
                                                            <option>Полное</option>
                                                            <option>Атлетичное</option>
                                                            <option>Мускулистое</option>
                                                        </select>
                                                    </div>
                                                </label>
                                                <div className='select_group__wrapper'>
                                                    <div>
                                                        <select {...register('waist')} defaultValue='waist'>
                                                            <option value='waist' disabled>Объём талии, см</option>
                                                            {
                                                                arrayCycle.map((item, i) => (
                                                                    item >= 40 && item <= 129 && <option key={i}>{item}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <select {...register('hips')} defaultValue='hips'>
                                                            <option value='hips' disabled>Объём бёдер, см</option>
                                                            {
                                                                arrayCycle.map((item, i) => (
                                                                    item >= 70 && item <= 130 && <option key={i}>{item}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <select {...register('bust')} defaultValue='bust'>
                                                            <option value='bust' disabled>Бюст, см</option>
                                                            {
                                                                arrayCycle.map((item, i) => (
                                                                    item >= 70 && item <= 150 && <option key={i}>{item}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <select {...register('chest')} defaultValue='chest'>
                                                            <option value='chest' disabled>Объём груди</option>
                                                            {
                                                                arrayCycle.map((item, i) => (
                                                                    item >= 70 && item <= 150 && <option key={i}>{item}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <label className='select__wrapper radio'>
                                                    Иностранный язык
                                                    <div>
                                                        <div>
                                                            <select disabled={languageNone ? true : false} {...register('level_language')}>
                                                                <option>Базовый</option>
                                                                <option>Средний</option>
                                                                <option>Продвинутый</option>
                                                                <option>Свободное владение</option>
                                                            </select>
                                                            <select disabled={languageNone ? true : false} {...register('language')}>
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
                                                        <input type='radio' id='language-no' onClick={(e) => {
                                                            if (languageNone) {
                                                                e.target.checked = false;
                                                                setLanguageNone(false);
                                                            } else {
                                                                setLanguageNone(true)
                                                            }

                                                        }} />
                                                        <label htmlFor='no'>
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
                                                            {...register('international_passport')}
                                                        />
                                                        <label htmlFor='international_passport-yes'>
                                                            Да
                                                        </label>
                                                        <input
                                                            id='international_passport-no'
                                                            type='radio'
                                                            name='international_passport'
                                                            value={0}
                                                            {...register('international_passport')}
                                                        />
                                                        <label htmlFor='international_passport-no'>
                                                            Нет
                                                        </label>
                                                    </div>
                                                </label>
                                                <label className='select__wrapper'>
                                                    Ваше гражданство
                                                    <div>
                                                        <select {...register('citizenship')}>
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
                                                    Готовы к командировкам?
                                                    <div>
                                                        <input
                                                            id='official_journey-yes'
                                                            type='radio'
                                                            name='official_journey'
                                                            value={1}
                                                            {...register('official_journey')}
                                                        />
                                                        <label htmlFor='official_journey-yes'>
                                                            Да
                                                        </label>
                                                        <input
                                                            id='official_journey-no'
                                                            type='radio'
                                                            name='official_journey'
                                                            value={0}
                                                            {...register('official_journey')}
                                                        />
                                                        <label htmlFor='official_journey-no'>
                                                            Нет
                                                        </label>
                                                    </div>
                                                </label>
                                            </>
                                        )
                                    }
                                    {
                                        step === 5 &&
                                        (
                                            (directionPerformer === 'model' &&
                                                <>
                                                    <label className='select__wrapper'>
                                                        Косметические особенности
                                                        <div>
                                                            <select {...register('cosmetic_features')}>
                                                                <option>Нет</option>
                                                                <option>Татуаж</option>
                                                                <option>Пирсинг</option>
                                                            </select>
                                                        </div>
                                                    </label>
                                                    <label className='select__wrapper'>
                                                        Наличие косметической хирургии
                                                        <div>
                                                            <select {...register('cosmetic_surgery')} >
                                                                <option>Нет</option>
                                                                <option>Пластика губ</option>
                                                                <option>Маммопластика</option>
                                                            </select>
                                                        </div>
                                                    </label>
                                                    <label className='select__wrapper'>
                                                        Наличие татуировок
                                                        <div>
                                                            <select {...register('tattoo')}>
                                                                <option >Нет</option>
                                                                <option>от 1 до 3</option>
                                                                <option>4 и более</option>
                                                            </select>
                                                        </div>
                                                    </label>
                                                </>)
                                            ||
                                            (directionPerformer === 'special' &&
                                                <>
                                                    <label className='select__wrapper'>
                                                        Косметические особенности
                                                        <div>
                                                            <select {...register('cosmetic_features')}>
                                                                <option>Нет</option>
                                                                <option>Татуаж</option>
                                                                <option>Пирсинг</option>
                                                            </select>
                                                        </div>
                                                    </label>
                                                    <label className='select__wrapper'>
                                                        Наличие косметической хирургии
                                                        <div>
                                                            <select {...register('cosmetic_surgery')} >
                                                                <option>Нет</option>
                                                                <option>Пластика губ</option>
                                                                <option>Маммопластика</option>
                                                            </select>
                                                        </div>
                                                    </label>
                                                    <label className='select__wrapper'>
                                                        Наличие татуировок
                                                        <div>
                                                            <select {...register('tattoo')}>
                                                                <option >Нет</option>
                                                                <option>от 1 до 3</option>
                                                                <option>4 и более</option>
                                                            </select>
                                                        </div>
                                                    </label>
                                                    <label>
                                                        Персональные достижения
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='Диплом лучшей модели'
                                                            {...register('personal_achievements')}
                                                        />
                                                    </label>
                                                    <label>
                                                        Дополнительные навыки
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='Прыгаю через скакалку'
                                                            {...register('extra_skills')}
                                                        />
                                                    </label>
                                                </>)
                                            ||
                                            (directionPerformer === 'production' &&
                                                <>
                                                    <label>
                                                        Ваши навыки
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='Ваши профессиональные навыки'
                                                            {...register('personal_achievements')}
                                                        />
                                                    </label>
                                                    <label>
                                                        Дополнительные навыки
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='Прыгаю через скакалку'
                                                            {...register('extra_skills')}
                                                        />
                                                    </label>
                                                    <label className='add_media'>
                                                        Ваше портфолио
                                                        <div>
                                                            <label>
                                                                Добавьте фото
                                                                <input type='file' name='photo' accept='image/*' onChange={handleAddMedia} />
                                                            </label>
                                                            {photoArray.map((photo, i) => (
                                                                <img src={photo} className='animate__animated animate__fadeIn' alt='add-pic' key={i} />
                                                            ))}
                                                        </div>
                                                        <div>
                                                            <label>
                                                                Добавьте музыкальный трек
                                                                <input type='file' name='music' accept='audio/*' onChange={handleAddMedia} />
                                                            </label>
                                                            <div className='audio__wrapper'>
                                                                {musicArray.map((music, i) => (
                                                                    <audio className='animate__animated animate__fadeIn' controls key={i}>
                                                                        <source src={music}></source>
                                                                    </audio>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label>
                                                                Добавьте видео
                                                                <input type='file' name='video' accept='video/*' onChange={handleAddMedia} />
                                                            </label>
                                                            {videoArray.map((video, i) => (
                                                                <video src={video} className='animate__animated animate__fadeIn' key={i} />
                                                            ))}
                                                        </div>
                                                    </label>
                                                </>
                                            )
                                        )
                                    }
                                    {
                                        step === 6 &&
                                        (directionPerformer !== 'production' ?
                                            <>
                                                <label className='select__wrapper radio'>
                                                    Иностранный язык
                                                    <div>
                                                        <div>
                                                            <select disabled={languageNone ? true : false} {...register('level_language')}>
                                                                <option>Базовый</option>
                                                                <option>Средний</option>
                                                                <option>Продвинутый</option>
                                                                <option>Свободное владение</option>
                                                            </select>
                                                            <select disabled={languageNone ? true : false} {...register('language')}>
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
                                                        <input id='language-no' type='radio' onClick={(e) => {
                                                            if (languageNone) {
                                                                e.target.checked = false;
                                                                setLanguageNone(false);
                                                            } else {
                                                                setLanguageNone(true)
                                                            }

                                                        }} />
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
                                                            {...register('international_passport')}
                                                        />
                                                        <label htmlFor='international_passport-yes'>
                                                            Да
                                                        </label>
                                                        <input
                                                            id='international_passport-no'
                                                            type='radio'
                                                            name='international_passport'
                                                            value={0}
                                                            {...register('international_passport')}
                                                        />
                                                        <label htmlFor='international_passport-no'>
                                                            Нет
                                                        </label>
                                                    </div>
                                                </label>
                                                <label className='select__wrapper'>
                                                    Ваше гражданство
                                                    <div>
                                                        <select {...register('citizenship')}>
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
                                                    Готовы к командировкам?
                                                    <div>
                                                        <input
                                                            id='official_journey-yes'
                                                            type='radio'
                                                            name='official_journey'
                                                            value={1}
                                                            {...register('official_journey')}
                                                        />
                                                        <label htmlFor='official_journey-yes'>
                                                            Да
                                                        </label>
                                                        <input
                                                            id='official_journey-no'
                                                            type='radio'
                                                            name='official_journey'
                                                            value={0}
                                                            {...register('official_journey')}
                                                        />
                                                        <label htmlFor='official_journey-no'>
                                                            Нет
                                                        </label>
                                                    </div>
                                                </label>
                                            </>
                                            :
                                            <section className='soft_skills'>
                                                <section className='personal_quality'>
                                                    <p>Основные качества личности</p>
                                                    <div>
                                                        <div>
                                                            <input type='checkbox' id='activity' value='Активность' {...register('personal_quality')} />
                                                            <label htmlFor='activity'>
                                                                Активность
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='sociability' value='Коммуникабельность' {...register('personal_quality')} />
                                                            <label htmlFor='sociability'>
                                                                Коммуникабельность
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='friendliness' value='Дружелюбность' {...register('personal_quality')} />
                                                            <label htmlFor='friendliness'>
                                                                Дружелюбность
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='punctuality' value='Пунктуальность' {...register('personal_quality')} />
                                                            <label htmlFor='punctuality'>
                                                                Пунктуальность
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='responsibility' value='Ответственность' {...register('personal_quality')} />
                                                            <label htmlFor='responsibility'>
                                                                Ответственность
                                                            </label>
                                                        </div>
                                                    </div>
                                                </section>
                                                <section className='character_traits'>
                                                    <p>Отличительные черты характера</p>
                                                    <div>
                                                        <div>
                                                            <input type='checkbox' id='impulsive' value='Импульсивный' {...register('character_traits')} />
                                                            <label htmlFor='impulsive'>
                                                                Имульсивный
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='aggressive' value='Агрессивный' {...register('character_traits')} />
                                                            <label htmlFor='aggressive'>
                                                                Агрессивный
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='cheerful' value='Жизнерадостный' {...register('character_traits')} />
                                                            <label htmlFor='cheerful'>
                                                                Жизнерадостный
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='closed' value='Замкнутый' {...register('character_traits')} />
                                                            <label htmlFor='closed'>
                                                                Замкнутый
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='calm' value='Спокойный' {...register('character_traits')} />
                                                            <label htmlFor='calm'>
                                                                Спокойный
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='indecisive' value='Нерешительный' {...register('character_traits')} />
                                                            <label htmlFor='indecisive'>
                                                                Нерешительный
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='decisive' value='Решительный' {...register('character_traits')} />
                                                            <label htmlFor='decisive'>
                                                                Решительный
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='unemotional' value='Безэмоциональный' {...register('character_traits')} />
                                                            <label htmlFor='unemotional'>
                                                                Безэмоциональный
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='responsive' value='Отзывчивый' {...register('character_traits')} />
                                                            <label htmlFor='responsive'>
                                                                Отзывчивый
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='hot-tempered' value='Вспыльчивый' {...register('character_traits')} />
                                                            <label htmlFor='hot-tempered'>
                                                                Вспыльчивый
                                                            </label>
                                                        </div>
                                                    </div>
                                                </section>
                                            </section>
                                        )
                                    }
                                    {
                                        step === 7 &&
                                        (
                                            (
                                                directionPerformer === 'model' &&
                                                <>
                                                    <label>
                                                        Персональные достижения
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='Диплом лучшей модели'
                                                            {...register('personal_achievements')}
                                                        />
                                                    </label>
                                                    <label>
                                                        Дополнительные навыки
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='Прыгаю через скакалку'
                                                            {...register('extra_skills')}
                                                        />
                                                    </label>
                                                    <section className='soft_skills'>
                                                        <section className='hobbies'>
                                                            <p>Хобби</p>
                                                            <div>
                                                                <div>
                                                                    <input type='checkbox' name='hobbies' value='Танцы' id='dance' {...register('hobbies')} />
                                                                    <label htmlFor='dance'>
                                                                        Танцы
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' name='hobbies' value='Спорт' id='sport' {...register('hobbies')} />
                                                                    <label htmlFor='sport'>
                                                                        Спорт
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' name='hobbies' value='Блоггер' id='blogger' {...register('hobbies')} />
                                                                    <label htmlFor='blogger'>
                                                                        Блоггер
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' name='hobbies' value='Кулинария' id='cooking' {...register('hobbies')} />
                                                                    <label htmlFor='cooking'>
                                                                        Кулинария
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' name='hobbies' value='Визажист/стилист' id='visagiste' {...register('hobbies')} />
                                                                    <label htmlFor='visagiste'>
                                                                        Визажист/стилист
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' name='hobbies' value='Любительская фотография' id='amateur-photo' {...register('hobbies')} />
                                                                    <label htmlFor='amateur-photo'>
                                                                        Любительская фотография
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' name='hobbies' value='Любительская живопись' id='amateur-painting' {...register('hobbies')} />
                                                                    <label htmlFor='amateur-painting'>
                                                                        Любительская живопись
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' name='hobbies' value='Компьютерные игры' id='games' {...register('hobbies')} />
                                                                    <label htmlFor='games'>
                                                                        Компьютерные игры
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' name='hobbies' value='Рукоделие' id='needlework' {...register('hobbies')} />
                                                                    <label htmlFor='needlework'>
                                                                        Рукоделие
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' name='hobbies' value='Вокал' id='vocal' {...register('hobbies')} />
                                                                    <label htmlFor='vocal'>
                                                                        Вокал
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </section>
                                                </>
                                            )
                                            ||
                                            (
                                                directionPerformer === 'special' &&
                                                <section className='soft_skills'>
                                                    <section className='personal_quality'>
                                                        <p>Основные качества личности</p>
                                                        <div>
                                                            <div>
                                                                <input type='checkbox' id='activity' value='Активность' {...register('personal_quality')} />
                                                                <label htmlFor='activity'>
                                                                    Активность
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='sociability' value='Коммуникабельность' {...register('personal_quality')} />
                                                                <label htmlFor='sociability'>
                                                                    Коммуникабельность
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='friendliness' value='Дружелюбность' {...register('personal_quality')} />
                                                                <label htmlFor='friendliness'>
                                                                    Дружелюбность
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='punctuality' value='Пунктуальность' {...register('personal_quality')} />
                                                                <label htmlFor='punctuality'>
                                                                    Пунктуальность
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='responsibility' value='Ответственность' {...register('personal_quality')} />
                                                                <label htmlFor='responsibility'>
                                                                    Ответственность
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    <section className='character_traits'>
                                                        <p>Отличительные черты характера</p>
                                                        <div>
                                                            <div>
                                                                <input type='checkbox' id='impulsive' value='Импульсивный' {...register('character_traits')} />
                                                                <label htmlFor='impulsive'>
                                                                    Имульсивный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='aggressive' value='Агрессивный' {...register('character_traits')} />
                                                                <label htmlFor='aggressive'>
                                                                    Агрессивный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='cheerful' value='Жизнерадостный' {...register('character_traits')} />
                                                                <label htmlFor='cheerful'>
                                                                    Жизнерадостный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='closed' value='Замкнутый' {...register('character_traits')} />
                                                                <label htmlFor='closed'>
                                                                    Замкнутый
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='calm' value='Спокойный' {...register('character_traits')} />
                                                                <label htmlFor='calm'>
                                                                    Спокойный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='indecisive' value='Нерешительный' {...register('character_traits')} />
                                                                <label htmlFor='indecisive'>
                                                                    Нерешительный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='decisive' value='Решительный' {...register('character_traits')} />
                                                                <label htmlFor='decisive'>
                                                                    Решительный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='unemotional' value='Безэмоциональный' {...register('character_traits')} />
                                                                <label htmlFor='unemotional'>
                                                                    Безэмоциональный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='responsive' value='Отзывчивый' {...register('character_traits')} />
                                                                <label htmlFor='responsive'>
                                                                    Отзывчивый
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='hot-tempered' value='Вспыльчивый' {...register('character_traits')} />
                                                                <label htmlFor='hot-tempered'>
                                                                    Вспыльчивый
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </section>
                                            )
                                            ||
                                            (
                                                directionPerformer === 'production' &&
                                                <>
                                                    <section className='soft_skills'>
                                                        <section className='personal_type'>
                                                            <p>Типаж</p>
                                                            <div>
                                                                <div>
                                                                    <input type='checkbox' id='activity' value='Драматический' {...register('personal_type')} />
                                                                    <label htmlFor='activity'>
                                                                        Драматический
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='sociability' value='Веселый' {...register('personal_type')} />
                                                                    <label htmlFor='sociability'>
                                                                        Веселый
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='friendliness' value='Коммерческий' {...register('personal_type')} />
                                                                    <label htmlFor='friendliness'>
                                                                        Коммерческий
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='punctuality' value='Представительный' {...register('personal_type')} />
                                                                    <label htmlFor='punctuality'>
                                                                        Представительный
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </section>
                                                    <label className='select__wrapper'>
                                                        Сексуальная ориентация
                                                        <div>
                                                            <select {...register('sexual_orientation')} defaultValue='heterosexuality'>
                                                                <option value='heterosexuality'>Гетеросексуальность</option>
                                                                <option>Бисексуальность</option>
                                                                <option>Гомосексуальность</option>
                                                                <option>Асексуальность</option>
                                                                <option>Пансексуальность</option>
                                                                <option>Полисексуальность</option>
                                                                <option>Омнисексуальность</option>
                                                            </select>
                                                        </div>
                                                    </label>
                                                    <label>
                                                        Ссылка на соцсети
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='@zalnova2016'
                                                            {...register('social_network')}
                                                        />
                                                    </label>
                                                    <label className='add_media'>
                                                        Ваше портфолио
                                                        <div>
                                                            <label>
                                                                Добавьте фото
                                                                <input type='file' name='photo' accept='image/*' onChange={handleAddMedia} />
                                                            </label>
                                                            {photoArray.map((photo, i) => (
                                                                <img src={photo} className='animate__animated animate__fadeIn' alt='add-pic' key={i} />
                                                            ))}
                                                        </div>
                                                    </label>
                                                </>
                                            )
                                        )
                                    }
                                    {
                                        step === 8 &&
                                        (
                                            (
                                                directionPerformer === 'model' &&
                                                <section className='soft_skills'>
                                                    <section className='personal_quality'>
                                                        <p>Основные качества личности</p>
                                                        <div>
                                                            <div>
                                                                <input type='checkbox' id='activity' value='Активность' {...register('personal_quality')} />
                                                                <label htmlFor='activity'>
                                                                    Активность
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='sociability' value='Коммуникабельность' {...register('personal_quality')} />
                                                                <label htmlFor='sociability'>
                                                                    Коммуникабельность
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='friendliness' value='Дружелюбность' {...register('personal_quality')} />
                                                                <label htmlFor='friendliness'>
                                                                    Дружелюбность
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='punctuality' value='Пунктуальность' {...register('personal_quality')} />
                                                                <label htmlFor='punctuality'>
                                                                    Пунктуальность
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='responsibility' value='Ответственность' {...register('personal_quality')} />
                                                                <label htmlFor='responsibility'>
                                                                    Ответственность
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    <section className='character_traits'>
                                                        <p>Отличительные черты характера</p>
                                                        <div>
                                                            <div>
                                                                <input type='checkbox' id='impulsive' value='Импульсивный' {...register('character_traits')} />
                                                                <label htmlFor='impulsive'>
                                                                    Имульсивный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='aggressive' value='Агрессивный' {...register('character_traits')} />
                                                                <label htmlFor='aggressive'>
                                                                    Агрессивный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='cheerful' value='Жизнерадостный' {...register('character_traits')} />
                                                                <label htmlFor='cheerful'>
                                                                    Жизнерадостный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='closed' value='Замкнутый' {...register('character_traits')} />
                                                                <label htmlFor='closed'>
                                                                    Замкнутый
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='calm' value='Спокойный' {...register('character_traits')} />
                                                                <label htmlFor='calm'>
                                                                    Спокойный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='indecisive' value='Нерешительный' {...register('character_traits')} />
                                                                <label htmlFor='indecisive'>
                                                                    Нерешительный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='decisive' value='Решительный' {...register('character_traits')} />
                                                                <label htmlFor='decisive'>
                                                                    Решительный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='unemotional' value='Безэмоциональный' {...register('character_traits')} />
                                                                <label htmlFor='unemotional'>
                                                                    Безэмоциональный
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='responsive' value='Отзывчивый' {...register('character_traits')} />
                                                                <label htmlFor='responsive'>
                                                                    Отзывчивый
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <input type='checkbox' id='hot-tempered' value='Вспыльчивый' {...register('character_traits')} />
                                                                <label htmlFor='hot-tempered'>
                                                                    Вспыльчивый
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </section>
                                            )
                                            ||
                                            (
                                                directionPerformer === 'special' &&
                                                <>
                                                    <section className='soft_skills'>
                                                        <section className='personal_type'>
                                                            <p>Типаж</p>
                                                            <div>
                                                                <div>
                                                                    <input type='checkbox' id='activity' value='Драматический' {...register('personal_type')} />
                                                                    <label htmlFor='activity'>
                                                                        Драматический
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='sociability' value='Веселый' {...register('personal_type')} />
                                                                    <label htmlFor='sociability'>
                                                                        Веселый
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='friendliness' value='Коммерческий' {...register('personal_type')} />
                                                                    <label htmlFor='friendliness'>
                                                                        Коммерческий
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='punctuality' value='Представительный' {...register('personal_type')} />
                                                                    <label htmlFor='punctuality'>
                                                                        Представительный
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </section>
                                                    <label className='select__wrapper'>
                                                        Сексуальная ориентация
                                                        <div>
                                                            <select {...register('sexual_orientation')} defaultValue='heterosexuality'>
                                                                <option value='heterosexuality'>Гетеросексуальность</option>
                                                                <option>Бисексуальность</option>
                                                                <option>Гомосексуальность</option>
                                                                <option>Асексуальность</option>
                                                                <option>Пансексуальность</option>
                                                                <option>Полисексуальность</option>
                                                                <option>Омнисексуальность</option>
                                                            </select>
                                                        </div>
                                                    </label>
                                                    <label>
                                                        Ссылка на соцсети
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='@zalnova2016'
                                                            {...register('social_network')}
                                                        />
                                                    </label>
                                                    <label className='add_media'>
                                                        Ваше портфолио
                                                        <div>
                                                            <label>
                                                                Добавьте фото
                                                                <input type='file' name='photo' accept='image/*' onChange={handleAddMedia} />
                                                            </label>
                                                            {photoArray.map((photo, i) => (
                                                                <img src={photo} className='animate__animated animate__fadeIn' alt='add-pic' key={i} />
                                                            ))}
                                                        </div>
                                                    </label>
                                                </>
                                            )
                                        )
                                    }
                                    {
                                        step === 9 &&
                                        <>
                                            <section className='soft_skills'>
                                                <section className='personal_type'>
                                                    <p>Типаж</p>
                                                    <div>
                                                        <div>
                                                            <input type='checkbox' id='activity' value='Драматический' {...register('personal_type')} />
                                                            <label htmlFor='activity'>
                                                                Драматический
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='sociability' value='Веселый' {...register('personal_type')} />
                                                            <label htmlFor='sociability'>
                                                                Веселый
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='friendliness' value='Коммерческий' {...register('personal_type')} />
                                                            <label htmlFor='friendliness'>
                                                                Коммерческий
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type='checkbox' id='punctuality' value='Представительный' {...register('personal_type')} />
                                                            <label htmlFor='punctuality'>
                                                                Представительный
                                                            </label>
                                                        </div>
                                                    </div>
                                                </section>
                                            </section>
                                            <label className='radio_input'>
                                                Готовы ли к рекламе нижнего белья?
                                                <div>
                                                    <input
                                                        id='international_passport-yes'
                                                        type='radio'
                                                        name='international_passport'
                                                        value={1}
                                                        {...register('international_passport')}
                                                    />
                                                    <label htmlFor='international_passport-yes'>
                                                        Да
                                                    </label>
                                                    <input
                                                        id='international_passport-no'
                                                        type='radio'
                                                        name='international_passport'
                                                        value={0}
                                                        {...register('international_passport')}
                                                    />
                                                    <label htmlFor='international_passport-no'>
                                                        Нет
                                                    </label>
                                                </div>
                                            </label>
                                            <label className='select__wrapper'>
                                                Сексуальная ориентация
                                                <div>
                                                    <select {...register('sexual_orientation')} defaultValue='heterosexuality'>
                                                        <option value='heterosexuality'>Гетеросексуальность</option>
                                                        <option>Бисексуальность</option>
                                                        <option>Гомосексуальность</option>
                                                        <option>Асексуальность</option>
                                                        <option>Пансексуальность</option>
                                                        <option>Полисексуальность</option>
                                                        <option>Омнисексуальность</option>
                                                    </select>
                                                </div>
                                            </label>
                                            <label>
                                                Ссылка на соцсети
                                                <input
                                                    type='text'
                                                    className='phone_input'
                                                    placeholder='@zalnova2016'
                                                    {...register('social_network')}
                                                />
                                            </label>
                                            <label className='add_media'>
                                                Ваше портфолио
                                                <div>
                                                    <label>
                                                        Добавьте фото
                                                        <input type='file' name='photo' accept='image/*' onChange={handleAddMedia} />
                                                    </label>
                                                    {photoArray.map((photo, i) => (
                                                        <img src={photo} className='animate__animated animate__fadeIn' alt='add-pic' key={i} />
                                                    ))}
                                                </div>
                                            </label>
                                        </>
                                    }
                                </div>
                                <div className='flex__wrapper'>
                                    <input className='next-step' type='button' value='Назад' onClick={handlePrevStepClick} />
                                    <input className='next-step' type='submit' value='Далее' />
                                </div>
                            </section>
                            :
                            <section className='questionnaire__wrapper'>
                                <h1>Анкета успешно создана</h1>
                                <div className='success-notification animate__animated animate__fadeIn'>
                                    <div className='icon'>
                                        <Lottie animationData={applyIcon} />
                                    </div>
                                    <p>Теперь добавь в настройках аватарку и описание</p>
                                </div>
                                <button onClick={() => setStep('success')}>В настройки</button>
                            </section>
                    )
                }
            </form >
            :
            <UploadPhotoPopUp
                registrationSubmit={registrationSubmit}
                stylesBeforeOpenPopUp={stylesBeforeOpenPopUp}
                handleClickRegistrationBtn={handleClickRegistrationBtn}
                setChangesStyle={setChangesStyle}
                navigate={navigate}
            />
    )
}

export default RegistrationPerformer;