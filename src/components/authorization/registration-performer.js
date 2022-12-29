import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';

import Lottie from "lottie-react";
import applyIcon from '../../assets/apply-icon.json';
import UploadPhotoPopUp from "./upload-photo-pop-up";
import { Link, useLocation } from "react-router-dom";
import { Upload } from "upload-js";

const RegistrationPerformer = ({ handleClickRegistrationBtn, stylesBeforeOpenPopUp, setChangesStyle, navigate, authorizationSubmit }) => {
    const [directionPerformer, setDirectionPerformer] = useState(null);
    const [dasharray, setDasharray] = useState([1, 250]);
    const [step, setStep] = useState(1);

    const [userProperties, setUserProperties] = useState(null);

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

    const location = useLocation();

    const loadAllProperties = async () => {
        await fetch(`${location.state.url}/usersinfo/All/${location.state.token}`)
            .then(response => response.json())
            .then(result => setUserProperties(result))
    }

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

        loadAllProperties();

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

    const handleAddMedia = async (e) => {
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
                    // setLoadingProgress({ path: path, progress: progress });
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

        if (e.target.name === 'photo') {
            addPhotoArray([fileUrl.split('//')[1], ...photoArray]);

        } else if (e.target.name === 'music') {
            addMusicArray([fileUrl.split('//')[1], ...musicArray]);
        } else {
            addVideoArray([fileUrl.split('//')[1], ...videoArray]);
        }
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
                        break;
                }
                break;

            default:
                break;
        }
    }

    const choicePerformerRole = async (id) => {
        const roleId = encodeURIComponent(JSON.stringify({ role: id }));
        const chosenRole = (id === 1 && 'model') || (id === 2 && 'special') || (id === 3 && 'production');
        await fetch(`${location.state.url}/setExecutorRole/${location.state.token}/${location.state.phone}/${roleId}`)
            .then(response => setDirectionPerformer(chosenRole))
    }

    return (
        step !== 'success' ?
            <section className='auth__wrapper'>
                <form className={`registration__wrapper role__container performer__container animate__animated animate__fadeIn`} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {!directionPerformer ?
                            <>
                                <Link to='/' className='registration_close'>
                                    <svg width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.7346 17.7538L33.8261 6.66763C35.2187 5.2751 35.2187 3.02812 33.8261 1.63559C32.4336 0.243057 30.1866 0.243057 28.7941 1.63559L17.7025 12.7218L6.61364 1.63288C5.22111 0.240353 2.97413 0.240353 1.5816 1.63288C0.189068 3.02542 0.189068 5.27239 1.5816 6.66493L12.6732 17.7511L1.5816 28.8373C0.189068 30.2298 0.189068 32.4768 1.5816 33.8693C2.97683 35.2618 5.23192 35.2618 6.61364 33.8693L17.7052 22.7831L28.7968 33.8693C30.1893 35.2618 32.4363 35.2618 33.8288 33.8693C35.2106 32.4768 35.2106 30.2298 33.8153 28.8346L22.7346 17.7538Z" fill="#353535" />
                                    </svg>
                                </Link>
                                <h1>Ваше направление</h1>
                                <section className='performer__direction-choice'>
                                    <button type='button' className="model" onClick={() => choicePerformerRole(1)}><p>Модель</p></button>
                                    <button type='button' className="special" onClick={() => choicePerformerRole(2)}><p>Особые кадры</p></button>
                                    <button type='button' className="production" onClick={() => choicePerformerRole(3)}><p>Продакшн</p></button>
                                    <button type='button' onClick={() => {
                                        navigate('/registration', { state: 'back' });
                                    }}>Назад</button>
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
                                                            {...register('name')}
                                                        />
                                                    </label>
                                                    <label>
                                                        Фамилия
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='Ваша фамилия'
                                                            {...register('surname')}
                                                        />
                                                    </label>
                                                    <label>
                                                        Отчество
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='Ваше отчество'
                                                            {...register('middle_name')}
                                                        />
                                                    </label>
                                                    <label className='date_label'>
                                                        Дата рождения
                                                        <input
                                                            type='date'
                                                            className='phone_input'
                                                            {...register('birth_date')}
                                                        />
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
                                                    <label className='select__wrapper'>
                                                        Ваш пол
                                                        <select {...register('gender', {
                                                            valueAsNumber: true,
                                                        })}>
                                                            <option value={1}>Мужской</option>
                                                            <option value={0}>Женский</option>
                                                        </select>
                                                    </label>
                                                    {/* <label>
                                                        Ваша почта
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='zalmary248@yandex.ru'
                                                            {...register('email')}
                                                        />
                                                    </label> */}
                                                    {directionPerformer !== 'model' &&
                                                        <>
                                                            <label className='radio_input'>
                                                                Семейное положение (замужем/женат)
                                                                <div>
                                                                    <input
                                                                        id='family_status-yes'
                                                                        type='radio'
                                                                        name='family_status'
                                                                        value={1}
                                                                        {...register('family_status', {
                                                                            valueAsNumber: true,
                                                                        })}
                                                                    />
                                                                    <label htmlFor='family_status-yes'>
                                                                        Да
                                                                    </label>
                                                                    <input
                                                                        id='family_status-no'
                                                                        type='radio'
                                                                        name='family_status'
                                                                        value={0}
                                                                        {...register('family_status', {
                                                                            valueAsNumber: true,
                                                                        })}
                                                                    />
                                                                    <label htmlFor='family_status-no'>
                                                                        Нет
                                                                    </label>
                                                                </div>
                                                            </label>
                                                            <label className='radio_input'>
                                                                Наличие детей
                                                                <div>
                                                                    <input
                                                                        id='having_children-yes'
                                                                        type='radio'
                                                                        name='having_children'
                                                                        value={1}
                                                                        {...register('having_children', {
                                                                            valueAsNumber: true,
                                                                        })}
                                                                    />
                                                                    <label htmlFor='having_children-yes'>
                                                                        Да
                                                                    </label>
                                                                    <input
                                                                        id='having_children-no'
                                                                        type='radio'
                                                                        name='having_children'
                                                                        value={0}
                                                                        {...register('having_children', {
                                                                            valueAsNumber: true,
                                                                        })}
                                                                    />
                                                                    <label htmlFor='having_children-no'>
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
                                                                <select {...register('ui_face_form', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Форма лица</option>
                                                                    {userProperties.FaceForm.map(form => (
                                                                        <option value={form.id} key={form.id}>{form.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_eye_color', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Цвет глаз</option>
                                                                    {userProperties.EyeColor.map(color => (
                                                                        <option value={color.id} key={color.id}>{color.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_eye_shape', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Разрез глаз</option>
                                                                    {userProperties.EyeShape.map(shape => (
                                                                        <option value={shape.name} key={shape.id}>{shape.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_skin_color', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Цвет кожи</option>
                                                                    {userProperties.SkinColor.map(color => (
                                                                        <option value={color.id} key={color.id}>{color.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <label className='select__wrapper'>
                                                            Расовая принадлежность
                                                            <div>
                                                                <select {...register('ui_racial_identity', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    {userProperties.RacialIdentity.map(race => (
                                                                        <option value={race.id} key={race.id}>{race.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </label>
                                                        <div className='select_group__wrapper'>
                                                            <div>
                                                                <select {...register('ui_nose_shape', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Форма носа</option>
                                                                    {userProperties.oseShape.map(shape => (
                                                                        <option value={shape.id} key={shape.id}>{shape.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_lips', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Губы</option>
                                                                    {userProperties.Lips.map(lips => (
                                                                        <option value={lips.name} key={lips.id}>{lips.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_hair_color', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Цвет волос</option>
                                                                    {userProperties.HairColor.map(color => (
                                                                        <option value={color.id} key={color.id}>{color.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('hair_length', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={0}>Длина волос</option>
                                                                    <option value={10}>короче 10 см</option>
                                                                    <option value={15}>10-15 см</option>
                                                                    <option value={25}>15-25 см</option>
                                                                    <option value={35}>25-35 см</option>
                                                                    <option value={40}>35-40 см</option>
                                                                    <option value={55}>45-55 см</option>
                                                                    <option value={60}>55-60 см</option>
                                                                    <option value={70}>60 см и ниже</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <label className='select__wrapper'>
                                                            Телосложение
                                                            <div>
                                                                <select {...register('ui_body_type', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    {userProperties.BodyType.map(body => (
                                                                        <option value={body.id} key={body.id}>{body.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </label>
                                                        <label className='select__wrapper'>
                                                            Расовая принадлежность
                                                            <div>
                                                                <select {...register('ui_racial_identity', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    {userProperties.RacialIdentity.map(race => (
                                                                        <option value={race.id} key={race.id}>{race.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </label>
                                                        <label className='select__wrapper'>
                                                            Косметические особенности
                                                            <div>
                                                                <select {...register('ui_cosmetic_details', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    {userProperties.CosmeticDetails.map(cosmetic => (
                                                                        <option value={cosmetic.name} key={cosmetic.id}>{cosmetic.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </label>
                                                        <label className='select__wrapper'>
                                                            Наличие косметической хирургии
                                                            <div>
                                                                <select {...register('ui_cosmetic_surgery', {
                                                                    valueAsNumber: true,
                                                                })} >
                                                                    {userProperties.CosmeticSurgery.map(cosmetic => (
                                                                        <option value={cosmetic.name} key={cosmetic.id}>{cosmetic.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </label>
                                                        <label className='select__wrapper'>
                                                            Наличие татуировок
                                                            <div>
                                                                <select {...register('ui_tattoo', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    {userProperties.Tattoo.map(item => (
                                                                        <option value={item.id} key={item.id}>{item.name}</option>
                                                                    ))}
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
                                                                <select {...register('ui_haircut', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Стрижка волос</option>
                                                                    {userProperties.Haircut.map(item => (
                                                                        <option value={item.id} key={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_height', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Рост, см</option>
                                                                    {userProperties.Height.map(item => (
                                                                        <option value={item.id} key={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_clothes_size', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Размер одежды</option>
                                                                    {userProperties.ClothesSize.map(size => (
                                                                        <option value={size.id} key={size.id}>{size.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_shoe_size', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Размер обуви</option>
                                                                    {userProperties.ShoeSize.map(size => (
                                                                        <option value={size.id} key={size.id}>{size.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <label className='select__wrapper'>
                                                            Телосложение
                                                            <div>
                                                                <select {...register('ui_body_type', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    {userProperties.BodyType.map(item => (
                                                                        <option value={item.id} key={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </label>
                                                        <div className='select_group__wrapper'>
                                                            <div>
                                                                <select {...register('waist_size', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Объём талии, см</option>
                                                                    {
                                                                        arrayCycle.map((item, i) => (
                                                                            item >= 40 && item <= 129 && <option key={i}>{item}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('hip_measurements', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Объём бёдер, см</option>
                                                                    {
                                                                        arrayCycle.map((item, i) => (
                                                                            item >= 70 && item <= 130 && <option value={item} key={i}>{item}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('bust', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Бюст, см</option>
                                                                    {
                                                                        arrayCycle.map((item, i) => (
                                                                            item >= 70 && item <= 150 && <option key={i}>{item}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_breast_size', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>Объём груди</option>
                                                                    {userProperties.BreastSize.map(size => (
                                                                        <option value={size.id} key={size.id}>{size.name}</option>
                                                                    ))}
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
                                                                    <select disabled={languageNone ? true : false}>
                                                                        {/* // {...register('level_language')} */}
                                                                        <option>Базовый</option>
                                                                        <option>Средний</option>
                                                                        <option>Продвинутый</option>
                                                                        <option>Свободное владение</option>
                                                                    </select>
                                                                    <select disabled={languageNone ? true : false} {...register('ui_languages')}>
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
                                                                <input type='radio' value='' {...register('ui_languages')} id='language-no' onClick={(e) => {
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
                                                                    id='inter_passport-yes'
                                                                    type='radio'
                                                                    name='inter_passport'
                                                                    value={1}
                                                                    {...register('inter_passport', {
                                                                        valueAsNumber: true,
                                                                    })}
                                                                />
                                                                <label htmlFor='inter_passport-yes'>
                                                                    Да
                                                                </label>
                                                                <input
                                                                    id='inter_passport-no'
                                                                    type='radio'
                                                                    name='inter_passport'
                                                                    value={0}
                                                                    {...register('inter_passport', {
                                                                        valueAsNumber: true,
                                                                    })}
                                                                />
                                                                <label htmlFor='inter_passport-no'>
                                                                    Нет
                                                                </label>
                                                            </div>
                                                        </label>
                                                        <label className='select__wrapper'>
                                                            Ваше гражданство
                                                            <div>
                                                                <select {...register('ui_nationality')}>
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
                                                                    id='business_trips-yes'
                                                                    type='radio'
                                                                    name='business_trips'
                                                                    value={1}
                                                                    {...register('business_trips', {
                                                                        valueAsNumber: true,
                                                                    })}
                                                                />
                                                                <label htmlFor='business_trips-yes'>
                                                                    Да
                                                                </label>
                                                                <input
                                                                    id='business_trips-no'
                                                                    type='radio'
                                                                    name='business_trips'
                                                                    value={0}
                                                                    {...register('business_trips', {
                                                                        valueAsNumber: true,
                                                                    })}
                                                                />
                                                                <label htmlFor='business_trips-no'>
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
                                                                    <select {...register('ui_cosmetic_details', {
                                                                        valueAsNumber: true,
                                                                    })}>
                                                                        {userProperties.CosmeticDetails.map(cosmetic => (
                                                                            <option value={cosmetic.name} key={cosmetic.id}>{cosmetic.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </label>
                                                            <label className='select__wrapper'>
                                                                Наличие косметической хирургии
                                                                <div>
                                                                    <select {...register('ui_cosmetic_surgery', {
                                                                        valueAsNumber: true,
                                                                    })} >
                                                                        {userProperties.CosmeticSurgery.map(cosmetic => (
                                                                            <option value={cosmetic.name} key={cosmetic.id}>{cosmetic.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </label>
                                                            <label className='select__wrapper'>
                                                                Наличие татуировок
                                                                <div>
                                                                    <select {...register('ui_tattoo', {
                                                                        valueAsNumber: true,
                                                                    })}>
                                                                        {userProperties.Tattoo.map(item => (
                                                                            <option value={item.id} key={item.id}>{item.name}</option>
                                                                        ))}
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
                                                                    <select {...register('ui_cosmetic_details', {
                                                                        valueAsNumber: true,
                                                                    })}>
                                                                        {userProperties.CosmeticDetails.map(cosmetic => (
                                                                            <option value={cosmetic.name} key={cosmetic.id}>{cosmetic.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </label>
                                                            <label className='select__wrapper'>
                                                                Наличие косметической хирургии
                                                                <div>
                                                                    <select {...register('ui_cosmetic_surgery', {
                                                                        valueAsNumber: true,
                                                                    })} >
                                                                        {userProperties.CosmeticSurgery.map(cosmetic => (
                                                                            <option value={cosmetic.name} key={cosmetic.id}>{cosmetic.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </label>
                                                            <label className='select__wrapper'>
                                                                Наличие татуировок
                                                                <div>
                                                                    <select {...register('ui_tattoo', {
                                                                        valueAsNumber: true,
                                                                    })}>
                                                                        {userProperties.Tattoo.map(item => (
                                                                            <option value={item.id} key={item.id}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </label>
                                                            <label>
                                                                Персональные достижения
                                                                <input
                                                                    type='text'
                                                                    className='phone_input'
                                                                    placeholder='Диплом лучшей модели'
                                                                    {...register('ui_creative_activity')}
                                                                />
                                                            </label>
                                                            <label>
                                                                Дополнительные навыки
                                                                <input
                                                                    type='text'
                                                                    className='phone_input'
                                                                    placeholder='Прыгаю через скакалку'
                                                                    {...register('additional_skills')}
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
                                                                    {...register('professional_skills')}
                                                                />
                                                            </label>
                                                            <label>
                                                                Дополнительные навыки
                                                                <input
                                                                    type='text'
                                                                    className='phone_input'
                                                                    placeholder='Прыгаю через скакалку'
                                                                    {...register('additional_skills')}
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
                                                                        <img src={`https://${photo}`} className='animate__animated animate__fadeIn' alt='add-pic' key={i} />
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
                                                                        <video src={`https://${video}`} className='animate__animated animate__fadeIn' key={i} />
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
                                                                    <select disabled={languageNone ? true : false}>
                                                                        <option>Базовый</option>
                                                                        <option>Средний</option>
                                                                        <option>Продвинутый</option>
                                                                        <option>Свободное владение</option>
                                                                    </select>
                                                                    <select disabled={languageNone ? true : false} {...register('ui_languages')}>
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
                                                                <input id='language-no' value='' {...register('ui_languages')} type='radio' onClick={(e) => {
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
                                                                    id='inter_passport-yes'
                                                                    type='radio'
                                                                    name='inter_passport'
                                                                    value={1}
                                                                    {...register('inter_passport', {
                                                                        valueAsNumber: true,
                                                                    })}
                                                                />
                                                                <label htmlFor='inter_passport-yes'>
                                                                    Да
                                                                </label>
                                                                <input
                                                                    id='inter_passport-no'
                                                                    type='radio'
                                                                    name='inter_passport'
                                                                    value={0}
                                                                    {...register('inter_passport', {
                                                                        valueAsNumber: true,
                                                                    })}
                                                                />
                                                                <label htmlFor='inter_passport-no'>
                                                                    Нет
                                                                </label>
                                                            </div>
                                                        </label>
                                                        <label className='select__wrapper'>
                                                            Ваше гражданство
                                                            <div>
                                                                <select {...register('ui_nationality')}>
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
                                                                    id='business_trips-yes'
                                                                    type='radio'
                                                                    name='business_trips'
                                                                    value={1}
                                                                    {...register('business_trips', {
                                                                        valueAsNumber: true,
                                                                    })}
                                                                />
                                                                <label htmlFor='business_trips-yes'>
                                                                    Да
                                                                </label>
                                                                <input
                                                                    id='business_trips-no'
                                                                    type='radio'
                                                                    name='business_trips'
                                                                    value={0}
                                                                    {...register('business_trips', {
                                                                        valueAsNumber: true,
                                                                    })}
                                                                />
                                                                <label htmlFor='business_trips-no'>
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
                                                                    <input type='checkbox' id='activity' value='Активность' {...register('ui_basic_qualities')} />
                                                                    <label htmlFor='activity'>
                                                                        Активность
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='sociability' value='Коммуникабельность' {...register('ui_basic_qualities')} />
                                                                    <label htmlFor='sociability'>
                                                                        Коммуникабельность
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='friendliness' value='Дружелюбность' {...register('ui_basic_qualities')} />
                                                                    <label htmlFor='friendliness'>
                                                                        Дружелюбность
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='punctuality' value='Пунктуальность' {...register('ui_basic_qualities')} />
                                                                    <label htmlFor='punctuality'>
                                                                        Пунктуальность
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='responsibility' value='Ответственность' {...register('ui_basic_qualities')} />
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
                                                                    <input type='checkbox' id='impulsive' value='Импульсивный' {...register('ui_character_traits')} />
                                                                    <label htmlFor='impulsive'>
                                                                        Имульсивный
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='aggressive' value='Агрессивный' {...register('ui_character_traits')} />
                                                                    <label htmlFor='aggressive'>
                                                                        Агрессивный
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='cheerful' value='Жизнерадостный' {...register('ui_character_traits')} />
                                                                    <label htmlFor='cheerful'>
                                                                        Жизнерадостный
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='closed' value='Замкнутый' {...register('ui_character_traits')} />
                                                                    <label htmlFor='closed'>
                                                                        Замкнутый
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='calm' value='Спокойный' {...register('ui_character_traits')} />
                                                                    <label htmlFor='calm'>
                                                                        Спокойный
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='indecisive' value='Нерешительный' {...register('ui_character_traits')} />
                                                                    <label htmlFor='indecisive'>
                                                                        Нерешительный
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='decisive' value='Решительный' {...register('ui_character_traits')} />
                                                                    <label htmlFor='decisive'>
                                                                        Решительный
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='unemotional' value='Безэмоциональный' {...register('ui_character_traits')} />
                                                                    <label htmlFor='unemotional'>
                                                                        Безэмоциональный
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='responsive' value='Отзывчивый' {...register('ui_character_traits')} />
                                                                    <label htmlFor='responsive'>
                                                                        Отзывчивый
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='hot-tempered' value='Вспыльчивый' {...register('ui_character_traits')} />
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
                                                                    {...register('ui_creative_activity')}
                                                                />
                                                            </label>
                                                            <label>
                                                                Дополнительные навыки
                                                                <input
                                                                    type='text'
                                                                    className='phone_input'
                                                                    placeholder='Прыгаю через скакалку'
                                                                    {...register('additional_skills')}
                                                                />
                                                            </label>
                                                            <section className='soft_skills'>
                                                                <section className='hobbies'>
                                                                    <p>Хобби</p>
                                                                    <div>
                                                                        <div>
                                                                            <input type='checkbox' value='Танцы' id='dance' {...register('ui_hobby')} />
                                                                            <label htmlFor='dance'>
                                                                                Танцы
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='Спорт' id='sport' {...register('ui_hobby')} />
                                                                            <label htmlFor='sport'>
                                                                                Спорт
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='Блоггер' id='blogger' {...register('ui_hobby')} />
                                                                            <label htmlFor='blogger'>
                                                                                Блоггер
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='Кулинария' id='cooking' {...register('ui_hobby')} />
                                                                            <label htmlFor='cooking'>
                                                                                Кулинария
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='Визажист/стилист' id='visagiste' {...register('ui_hobby')} />
                                                                            <label htmlFor='visagiste'>
                                                                                Визажист/стилист
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='Любительская фотография' id='amateur-photo' {...register('ui_hobby')} />
                                                                            <label htmlFor='amateur-photo'>
                                                                                Любительская фотография
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='Любительская живопись' id='amateur-painting' {...register('ui_hobby')} />
                                                                            <label htmlFor='amateur-painting'>
                                                                                Любительская живопись
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='Компьютерные игры' id='games' {...register('ui_hobby')} />
                                                                            <label htmlFor='games'>
                                                                                Компьютерные игры
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='Рукоделие' id='needlework' {...register('ui_hobby')} />
                                                                            <label htmlFor='needlework'>
                                                                                Рукоделие
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='Вокал' id='vocal' {...register('ui_hobby')} />
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
                                                            <section className='ui_basic_qualities'>
                                                                <p>Основные качества личности</p>
                                                                <div>
                                                                    <div>
                                                                        <input type='checkbox' id='activity' value='Активность' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='activity'>
                                                                            Активность
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='sociability' value='Коммуникабельность' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='sociability'>
                                                                            Коммуникабельность
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='friendliness' value='Дружелюбность' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='friendliness'>
                                                                            Дружелюбность
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='punctuality' value='Пунктуальность' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='punctuality'>
                                                                            Пунктуальность
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='responsibility' value='Ответственность' {...register('ui_basic_qualities')} />
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
                                                                        <input type='checkbox' id='impulsive' value='Импульсивный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='impulsive'>
                                                                            Имульсивный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='aggressive' value='Агрессивный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='aggressive'>
                                                                            Агрессивный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='cheerful' value='Жизнерадостный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='cheerful'>
                                                                            Жизнерадостный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='closed' value='Замкнутый' {...register('ui_character_traits')} />
                                                                        <label htmlFor='closed'>
                                                                            Замкнутый
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='calm' value='Спокойный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='calm'>
                                                                            Спокойный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='indecisive' value='Нерешительный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='indecisive'>
                                                                            Нерешительный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='decisive' value='Решительный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='decisive'>
                                                                            Решительный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='unemotional' value='Безэмоциональный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='unemotional'>
                                                                            Безэмоциональный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='responsive' value='Отзывчивый' {...register('ui_character_traits')} />
                                                                        <label htmlFor='responsive'>
                                                                            Отзывчивый
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='hot-tempered' value='Вспыльчивый' {...register('ui_character_traits')} />
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
                                                                            <input type='checkbox' id='activity' value='Драматический' {...register('ui_characteristic')} />
                                                                            <label htmlFor='activity'>
                                                                                Драматический
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' id='sociability' value='Веселый' {...register('ui_characteristic')} />
                                                                            <label htmlFor='sociability'>
                                                                                Веселый
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' id='friendliness' value='Коммерческий' {...register('ui_characteristic')} />
                                                                            <label htmlFor='friendliness'>
                                                                                Коммерческий
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' id='punctuality' value='Представительный' {...register('ui_characteristic')} />
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
                                                                    <select {...register('ui_sexual_orientation')}>
                                                                        {userProperties.SexualOrientation.map(item => (
                                                                            <option value={item.id} key={item.id}>{item.name}</option>
                                                                        ))}
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
                                                                        <img src={`https://${photo}`} className='animate__animated animate__fadeIn' alt='add-pic' key={i} />
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
                                                            <section className='ui_basic_qualities'>
                                                                <p>Основные качества личности</p>
                                                                <div>
                                                                    <div>
                                                                        <input type='checkbox' id='activity' value='Активность' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='activity'>
                                                                            Активность
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='sociability' value='Коммуникабельность' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='sociability'>
                                                                            Коммуникабельность
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='friendliness' value='Дружелюбность' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='friendliness'>
                                                                            Дружелюбность
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='punctuality' value='Пунктуальность' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='punctuality'>
                                                                            Пунктуальность
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='responsibility' value='Ответственность' {...register('ui_basic_qualities')} />
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
                                                                        <input type='checkbox' id='impulsive' value='Импульсивный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='impulsive'>
                                                                            Имульсивный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='aggressive' value='Агрессивный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='aggressive'>
                                                                            Агрессивный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='cheerful' value='Жизнерадостный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='cheerful'>
                                                                            Жизнерадостный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='closed' value='Замкнутый' {...register('ui_character_traits')} />
                                                                        <label htmlFor='closed'>
                                                                            Замкнутый
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='calm' value='Спокойный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='calm'>
                                                                            Спокойный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='indecisive' value='Нерешительный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='indecisive'>
                                                                            Нерешительный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='decisive' value='Решительный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='decisive'>
                                                                            Решительный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='unemotional' value='Безэмоциональный' {...register('ui_character_traits')} />
                                                                        <label htmlFor='unemotional'>
                                                                            Безэмоциональный
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='responsive' value='Отзывчивый' {...register('ui_character_traits')} />
                                                                        <label htmlFor='responsive'>
                                                                            Отзывчивый
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='hot-tempered' value='Вспыльчивый' {...register('ui_character_traits')} />
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
                                                                            <input type='checkbox' id='activity' value='Драматический' {...register('ui_characteristic')} />
                                                                            <label htmlFor='activity'>
                                                                                Драматический
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' id='sociability' value='Веселый' {...register('ui_characteristic')} />
                                                                            <label htmlFor='sociability'>
                                                                                Веселый
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' id='friendliness' value='Коммерческий' {...register('ui_characteristic')} />
                                                                            <label htmlFor='friendliness'>
                                                                                Коммерческий
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' id='punctuality' value='Представительный' {...register('ui_characteristic')} />
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
                                                                    <select {...register('ui_sexual_orientation')}>
                                                                        {userProperties.SexualOrientation.map(item => (
                                                                            <option value={item.id} key={item.id}>{item.name}</option>
                                                                        ))}
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
                                                                        <img src={`https://${photo}`} className='animate__animated animate__fadeIn' alt='add-pic' key={i} />
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
                                                                    <input type='checkbox' id='activity' value='Драматический' {...register('ui_characteristic')} />
                                                                    <label htmlFor='activity'>
                                                                        Драматический
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='sociability' value='Веселый' {...register('ui_characteristic')} />
                                                                    <label htmlFor='sociability'>
                                                                        Веселый
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='friendliness' value='Коммерческий' {...register('ui_characteristic')} />
                                                                    <label htmlFor='friendliness'>
                                                                        Коммерческий
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='punctuality' value='Представительный' {...register('ui_characteristic')} />
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
                                                                id='underwear_ads-yes'
                                                                type='radio'
                                                                name='underwear_ads'
                                                                value={1}
                                                                {...register('underwear_ads', {
                                                                    valueAsNumber: true,
                                                                })}
                                                            />
                                                            <label htmlFor='underwear_ads-yes'>
                                                                Да
                                                            </label>
                                                            <input
                                                                id='underwear_ads-no'
                                                                type='radio'
                                                                name='underwear_ads'
                                                                value={0}
                                                                {...register('underwear_ads', {
                                                                    valueAsNumber: true,
                                                                })}
                                                            />
                                                            <label htmlFor='underwear_ads-no'>
                                                                Нет
                                                            </label>
                                                        </div>
                                                    </label>
                                                    <label className='select__wrapper'>
                                                        Сексуальная ориентация
                                                        <div>
                                                            <select {...register('ui_sexual_orientation')}>
                                                                {userProperties.SexualOrientation.map(item => (
                                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                                ))}
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
                                                                <img src={`https://${photo}`} className='animate__animated animate__fadeIn' alt='add-pic' key={i} />
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
                    </div>
                </form >
            </section >
            :
            <UploadPhotoPopUp
                authorizationSubmit={authorizationSubmit}
                stylesBeforeOpenPopUp={stylesBeforeOpenPopUp}
                handleClickRegistrationBtn={handleClickRegistrationBtn}
                setChangesStyle={setChangesStyle}
                userData={{ phone: location.state.phone, ...userData, gallery_photos: photoArray.join(', '), gallery_video: videoArray.join(', ') }}
                url={location.state.url}
                token={location.state.token}
                navigate={navigate}
            />
    )
}

export default RegistrationPerformer;