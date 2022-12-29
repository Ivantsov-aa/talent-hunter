import React from "react";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Link, useLocation } from "react-router-dom";

import Lottie from "lottie-react";
import applyIcon from '../../assets/apply-icon.json';

import UploadPhotoPopUp from "./upload-photo-pop-up";


const RegistrationCustomer = ({ navigate, authorizationSubmit }) => {
    const [stepCustomer, setStepCustomer] = useState(1);
    const [dasharray, setDasharray] = useState(null);
    const [userData, setUserData] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit'
    });

    useEffect(() => {
        setTimeout(() => {
            setDasharray({ '--length-step-line': '126 125' })
        }, 100)
    }, [])

    const location = useLocation();

    const onSubmit = (data) => {
        if (stepCustomer === 1) {
            setStepCustomer(2)
            setDasharray({ '--length-step-line': '251 0' });
        } else {
            setStepCustomer(3)
            setUserData(data);
        }
    }

    const handlePrevStepClick = () => {
        if (stepCustomer === 1) {
            navigate('/registration', { state: 'back' });
        } else {
            setStepCustomer(stepCustomer - 1);
        }
    }

    const handleSuccessCreateQuestionnaire = () => {
        setStepCustomer('success');
    }

    return (
        stepCustomer !== 'success' ?
            <section className='auth__wrapper'>
                <form className={`registration__wrapper role__container ${stepCustomer === 3 ? 'success' : ''}`}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        {stepCustomer !== 3 ?
                            <section className='customer__wrapper'>
                                <div className='customer__title'>
                                    <div className='steps_circle'>
                                        <p className='svg__wrapper'>
                                            <svg className="progressbar__svg">
                                                <circle cx="42" cy="42.5" r="39.5" className='progressbar__svg-circle circle-html shadow-html' style={dasharray}> </circle>
                                            </svg>
                                        </p>
                                        <p><span>{stepCustomer}</span>/2</p>
                                    </div>
                                    <h1>Анкета</h1>
                                </div>
                                {stepCustomer === 1 &&
                                    <div className='customer_content'>
                                        <label>
                                            Название бренда
                                            <input
                                                type='text'
                                                className='phone_input'
                                                placeholder='ADELE AGENCY'
                                                autoFocus
                                                {...register('name')}
                                            />
                                        </label>
                                        <label>
                                            Город
                                            <input
                                                type='text'
                                                className='phone_input'
                                                placeholder='Зальнова'
                                                {...register('city')}
                                            />
                                        </label>
                                        <label>
                                            Деятельность компании
                                            <input
                                                type='text'
                                                className='phone_input'
                                                placeholder='Модельное агенство'
                                                {...register('description')}
                                            />
                                        </label>
                                    </div>
                                }
                                {stepCustomer === 2 &&
                                    <div className='customer_content'>
                                        <label>
                                            Ваш сайт
                                            <input
                                                type='text'
                                                className='phone_input'
                                                placeholder='www.agency.com'
                                                {...register('url_site')}
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
                                        <label>
                                            Адрес компании
                                            <input
                                                type='text'
                                                className='phone_input'
                                                placeholder='г. Москва, ул. Вавилова, д. 1'
                                                {...register('address')}
                                            />
                                        </label>
                                    </div>
                                }
                                <Link to='/' className='registration_close'>
                                    <svg width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.7346 17.7538L33.8261 6.66763C35.2187 5.2751 35.2187 3.02812 33.8261 1.63559C32.4336 0.243057 30.1866 0.243057 28.7941 1.63559L17.7025 12.7218L6.61364 1.63288C5.22111 0.240353 2.97413 0.240353 1.5816 1.63288C0.189068 3.02542 0.189068 5.27239 1.5816 6.66493L12.6732 17.7511L1.5816 28.8373C0.189068 30.2298 0.189068 32.4768 1.5816 33.8693C2.97683 35.2618 5.23192 35.2618 6.61364 33.8693L17.7052 22.7831L28.7968 33.8693C30.1893 35.2618 32.4363 35.2618 33.8288 33.8693C35.2106 32.4768 35.2106 30.2298 33.8153 28.8346L22.7346 17.7538Z" fill="#353535" />
                                    </svg>
                                </Link>
                                <div className='flex__wrapper'>
                                    <input className='next-step' type='button' value='Назад' onClick={handlePrevStepClick} />
                                    <input className='next-step' type='submit' value='Далее' />
                                </div>
                            </section >
                            :
                            <section className='questionnaire__wrapper'>
                                <h1>Анкета успешно создана</h1>
                                <div className='success-notification animate__animated animate__fadeIn'>
                                    <div className='icon'>
                                        <Lottie animationData={applyIcon} />
                                    </div>
                                    <p>Теперь добавь в настройках аватарку и описание</p>
                                </div>
                                <button onClick={handleSuccessCreateQuestionnaire}>В настройки</button>
                            </section>
                        }
                    </div>
                </form>
            </section>
            :
            <UploadPhotoPopUp
                role='customer'
                userData={{ phone: location.state, ...userData }}
                url={location.state.url}
                token={location.state.token}
                authorizationSubmit={authorizationSubmit}
            />
    )
}

export default RegistrationCustomer;