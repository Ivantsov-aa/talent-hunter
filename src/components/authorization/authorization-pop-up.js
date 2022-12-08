import React, { useState, useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import { Link } from "react-router-dom";

import PhoneInput, {
    parsePhoneNumber,
    getCountryCallingCode
} from "react-phone-number-input";
import ru from 'react-phone-number-input/locale/ru'
import VerificationInput from "react-verification-input";

import Lottie from "lottie-react";
import applyIcon from '../../assets/apply-icon.json';

const AuthorizationPopUp = ({ location, handleClickAuthorizationBtn, authorizationSubmit, arrayUsers }) => {
    const [step, setStep] = useState(1);
    const [phoneCountryCode, setPhoneCountryCode] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);
    const [authPath, setAuthPath] = useState('number');
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [valueVerification, setValueVerification] = useState('');
    const [codeVerification, setVerificationCode] = useState(null);
    const [successVerification, setSuccessVerification] = useState('');

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
        setPhoneCountryCode(location.country)
    }, [location.country])

    const handleTogglePassword = path => {
        setAuthPath(path);
        clearErrors();
        reset();
    }

    const onSubmit = (data) => {
        arrayUsers.forEach(user => {
            switch (true) {
                case data.phoneNumber && user.password === data.password && user.phone_number === data.phoneNumber:
                    switch (step) {
                        case 1:
                            const min = 1000;
                            const max = 9999;
                            const random = min + (Math.random() * (max - min));
                            const code = Math.round(random);
                            setVerificationCode(code);

                            setUserId(user.user_id);
                            setUserName(user.first_name);
                            setSuccessVerification('verification');

                            setTimeout(() => {
                                setSuccessVerification('')
                                setStep(2)
                            }, 2000)
                            break;

                        case 2:
                            if (+valueVerification !== codeVerification) {
                                setError('verification', { message: '* код введен неправильно' })
                            } else {
                                setSuccessVerification('authorized')
                                setTimeout(() => {
                                    authorizationSubmit(userId);
                                }, 2000);
                            }
                            break;
                        default:
                            break;
                    }

                    break;
                case data.phoneNumber && user.phone_number === data.phoneNumber && user.password !== data.password:
                    setError('password', { message: 'Неверный пароль' });
                    break;
                case data.phoneNumber && user.phone_number !== data.phoneNumber:
                    setError('phoneNumber', { message: 'Телефон не зарегистрирован' });
                    break;

                case data.email && user.password === data.password && user.email === data.email:
                    switch (step) {
                        case 1:
                            const min = 1000;
                            const max = 9999;
                            const random = min + (Math.random() * (max - min));
                            const code = Math.round(random);
                            setVerificationCode(code);

                            setUserId(user.user_id);
                            setUserName(user.first_name);
                            setSuccessVerification('verification');

                            setTimeout(() => {
                                setSuccessVerification('')
                                setStep(2)
                            }, 2000)
                            break;

                        case 2:
                            if (+valueVerification !== codeVerification) {
                                setError('verification', { message: '* код введен неправильно' })
                            } else {
                                setSuccessVerification('authorized');
                                setTimeout(() => {
                                    authorizationSubmit(userId);
                                }, 2000);
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case data.email && user.email === data.email && user.password !== data.password:
                    setError('password', { message: 'Неверный пароль' });
                    break;
                case data.email && user.email !== data.email:
                    setError('email', { message: 'E-mail не зарегистрирован' });
                    break;

                default:
                    break;
            }
        })
    }

    return (
        <section className='auth__wrapper'>
            <form className="registration__wrapper authorization__wrapper" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h1>Вход в профиль</h1>
                    <Link to='/' className='registration_close'>
                        <svg width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.7346 17.7538L33.8261 6.66763C35.2187 5.2751 35.2187 3.02812 33.8261 1.63559C32.4336 0.243057 30.1866 0.243057 28.7941 1.63559L17.7025 12.7218L6.61364 1.63288C5.22111 0.240353 2.97413 0.240353 1.5816 1.63288C0.189068 3.02542 0.189068 5.27239 1.5816 6.66493L12.6732 17.7511L1.5816 28.8373C0.189068 30.2298 0.189068 32.4768 1.5816 33.8693C2.97683 35.2618 5.23192 35.2618 6.61364 33.8693L17.7052 22.7831L28.7968 33.8693C30.1893 35.2618 32.4363 35.2618 33.8288 33.8693C35.2106 32.4768 35.2106 30.2298 33.8153 28.8346L22.7346 17.7538Z" fill="#353535" />
                        </svg>
                    </Link>

                    {step === 1 && !successVerification &&
                        <section>
                            {authPath === 'number' ?
                                <label className={`auth_input ${errors.phoneNumber ? 'error_phone' : ''}`}>
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
                                    <p className={`error ${errors.phoneNumber ? 'active' : ''}`}>{errors.phoneNumber && errors.phoneNumber.message}</p>
                                    <button type='button' onClick={() => handleTogglePassword('email')}>войти по e-mail</button>
                                </label>
                                :
                                <label className='auth_input'>
                                    <input
                                        className={`phone_input ${errors.email ? 'error_input' : ''}`}
                                        type='text'
                                        placeholder='Введите e-mail'
                                        {...register('email', {
                                            pattern: {
                                                value: /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/,
                                                message: 'E-mail введён некорректно.'
                                            }
                                        })}
                                    />
                                    <p className={`error ${errors.email ? 'active' : ''}`}>{errors.email && errors.email.message}</p>
                                    <button type='button' onClick={() => handleTogglePassword('number')}>войти по номеру</button>
                                </label>
                            }
                            <div className='password__wrapper'>
                                <label>
                                    <input
                                        className={`phone_input ${errors.password !== undefined ? 'error_input' : ''}`}
                                        type={togglePassword ? 'text' : 'password'}
                                        placeholder='Введите пароль'
                                        {...register('password', {
                                            required: 'Это поле обязательно к заполнению.',
                                            minLength: {
                                                value: 6,
                                                message: 'Пароль должен содержать от 6 до 16 символов.'
                                            },
                                            maxLength: {
                                                value: 16,
                                                message: 'Пароль должен содержать от 6 до 16 символов.'
                                            },
                                            pattern: {
                                                value: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/,
                                                message: 'Недостаточно сложный пароль. Пароль должен содержать минимум один символ верхнего и нижнего регистра, и минимум одну цифру.'
                                            }
                                        })}
                                    />
                                    <p className={`error ${errors.password ? 'active' : ''}`}>{errors.password && errors.password.message}</p>
                                    <button type='button' className={`password_toggle ${togglePassword ? 'show' : ''}`} onClick={() => setTogglePassword(!togglePassword)}></button>
                                </label>
                            </div>
                            <input type='submit' className='next-step' value='Войти' />
                        </section>
                    }
                    {successVerification === 'verification' &&
                        <div className='success-notification animate__animated animate__fadeIn'>
                            <div className='icon'>
                                <Lottie animationData={applyIcon} />
                            </div>
                            <p>Данные введены успешно!</p>
                        </div>
                    }
                    {step === 2 && !successVerification &&
                        <div className={`registration_form ${userId && !successVerification ? 'active' : ''}`}>
                            <p>{codeVerification}</p>
                            <p>Вам должно поступить SMS с 4х значным кодом</p>
                            <div className={`verification__wrapper ${errors.verification ? 'error' : ''}`}>
                                <VerificationInput
                                    value={valueVerification}
                                    length={4}
                                    placeholder={null}
                                    validChars='0-9'
                                    autoFocus={true}
                                    onChange={(value) => {
                                        setValueVerification(value);
                                    }}
                                    classNames={{
                                        container: "verification__container",
                                        character: "verification_item",
                                        characterInactive: "character--inactive",
                                        characterSelected: "item-selected",
                                    }}
                                />
                                <p className={`error ${errors.verification ? 'active' : ''}`}>{errors.verification && errors.verification.message}</p>
                            </div>
                            {errors.verification ?
                                <button className='next-step' onClick={() => {
                                    const min = 1000;
                                    const max = 9999;
                                    const random = min + (Math.random() * (max - min));
                                    const code = Math.round(random);
                                    setVerificationCode(code);
                                    setValueVerification('');
                                    clearErrors();
                                }}>Отправить пароль ещё раз</button>
                                :
                                <input className='next-step' type='submit' value='Далее' />
                            }
                        </div>
                    }

                    {successVerification === 'authorized' &&
                        <div className='success-notification animate__animated animate__fadeIn'>
                            <div className='icon'>
                                <Lottie animationData={applyIcon} />
                            </div>
                            <p>Данные введены успешно!</p>
                            <h2>Добро пожаловать в Talent Hunter, {userName}</h2>
                        </div>
                    }
                </div>
            </form>
        </section>
    )
}

export default AuthorizationPopUp;