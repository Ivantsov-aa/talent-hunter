import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PhoneInput, {
    parsePhoneNumber,
    getCountryCallingCode
} from "react-phone-number-input";
import ru from 'react-phone-number-input/locale/ru'
import { useForm, Controller } from 'react-hook-form';

import VerificationInput from "react-verification-input";
import Lottie from "lottie-react";
import applyIcon from '../../assets/apply-icon.json';

const RegistrationContainer = ({ registrationSubmit, location }) => {
    const [phoneCountryCode, setPhoneCountryCode] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);

    const [registrationSteps, setRegistrationSteps] = useState([
        {
            status: 'active',
            value: 1
        },
        {
            status: 'disabled',
            value: 2
        },
        {
            status: 'disabled',
            value: 3
        },
        {
            status: 'disabled',
            value: 4
        }
    ]);
    const [currentStep, setCurrentStep] = useState(1);
    const [valueVerification, setValueVerification] = useState('');
    const [codeVerification, setVerificationCode] = useState(null);
    const [successVerification, setSuccessVerification] = useState(false);

    const {
        control,
        register,
        handleSubmit,
        setError,
        getValues,
        clearErrors,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit'
    });

    const locationBack = useLocation()

    useEffect(() => {
        setPhoneCountryCode(location.country);

        if (locationBack.state === 'back') {
            setCurrentStep(4);
        }
    }, [location.country])

    const onSubmit = (data) => {
        if (currentStep === 1 && data.phoneNumber) {
            const completedStep = registrationSteps.map(step => {
                if (step.value === 1) {
                    return { ...step, status: 'completed' };
                } else if (step.value === 2) {
                    return { ...step, status: 'active' };
                } else {
                    return { ...step, status: 'disabed' };
                }
            });

            const min = 1000;
            const max = 9999;
            const random = min + (Math.random() * (max - min));
            const code = Math.round(random);
            setVerificationCode(code);

            setRegistrationSteps(completedStep);
            setCurrentStep(2);
        } else if (currentStep === 2) {
            const completedStep = registrationSteps.map(step => {
                if (step.value === 1) {
                    return { ...step, status: 'completed' };
                } else if (step.value === 2) {
                    return { ...step, status: 'completed' };
                } else if (step.value === 3) {
                    return { ...step, status: 'active' }
                } else {
                    return { ...step, status: 'disabed' };
                }
            });

            if (+valueVerification !== codeVerification) {
                setError('verification', { message: '* код введен неправильно' })
            } else {
                setCurrentStep(3);
                setRegistrationSteps(completedStep);
            }
        } else if (currentStep === 3) {
            setSuccessVerification(true);
            registrationSubmit({ phone_number: data.phoneNumber, password: data.password }, 'verification');
            setTimeout(() => {
                setSuccessVerification(false);
                setRegistrationSteps(registrationSteps.map(step => (
                    { ...step, status: 'completed' }
                )));
                setCurrentStep(4);
            }, 2000)
        } else {

        }
    }

    return (
        <section className='auth__wrapper'>
            <form className='registration__wrapper' onSubmit={handleSubmit(onSubmit)} >
                <div>
                    <h1>Регистрация</h1>
                    <Link to='/' className='registration_close'>
                        <svg width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.7346 17.7538L33.8261 6.66763C35.2187 5.2751 35.2187 3.02812 33.8261 1.63559C32.4336 0.243057 30.1866 0.243057 28.7941 1.63559L17.7025 12.7218L6.61364 1.63288C5.22111 0.240353 2.97413 0.240353 1.5816 1.63288C0.189068 3.02542 0.189068 5.27239 1.5816 6.66493L12.6732 17.7511L1.5816 28.8373C0.189068 30.2298 0.189068 32.4768 1.5816 33.8693C2.97683 35.2618 5.23192 35.2618 6.61364 33.8693L17.7052 22.7831L28.7968 33.8693C30.1893 35.2618 32.4363 35.2618 33.8288 33.8693C35.2106 32.4768 35.2106 30.2298 33.8153 28.8346L22.7346 17.7538Z" fill="#353535" />
                        </svg>
                    </Link>
                    <div className='registration__steps'>
                        {registrationSteps.map((step, i) => (
                            <div className={`step ${step.status === 'active' ? 'active' : ''} ${step.status === 'completed' ? 'active' : ''}`} key={i}>
                                {step.value}
                            </div>
                        ))}
                    </div>
                    {!successVerification ?
                        <>
                            {currentStep === 1 &&
                                <div className={`registration_form ${currentStep === 1 && !successVerification ? 'active' : ''}`}>
                                    <p>
                                        Введите ваш номер телефона.
                                        <span>Мы отправим вам код подтверждения</span>
                                    </p>
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
                                    <input className='next-step' type='submit' value='Далее' />
                                    <Link to='/auth' className='login-btn'>Вход</Link>
                                </div>
                            }

                            {currentStep === 2 &&
                                <div className={`registration_form ${currentStep === 2 && !successVerification ? 'active' : ''}`}>
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
                                    <Link to='/auth' className='login-btn'>Вход</Link>
                                </div>
                            }

                            {
                                currentStep === 3 &&
                                <div className={`password__wrapper ${currentStep === 3 && !successVerification ? 'active' : ''}`}>
                                    <p>Осталось только придумать пароль и мы перейдём к знакомству ;)</p>
                                    <label>
                                        <input
                                            className={`phone_input ${errors.password !== undefined ? 'error_input' : ''}`}
                                            type={togglePassword ? 'text' : 'password'}
                                            placeholder='Введите пароль'
                                            autoComplete='new-password'
                                            hidden
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
                                    <label>
                                        <input
                                            className={`phone_input ${errors.repeat_password !== undefined ? 'error_input' : ''}`}
                                            type={togglePassword ? 'text' : 'password'}
                                            placeholder='Повторите пароль'
                                            autoComplete='new-password'
                                            hidden
                                            {...register('repeat_password', {
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
                                                },
                                                validate: value => {
                                                    const { password } = getValues();
                                                    return value === password || 'Пароли не совпадают.'
                                                }
                                            })}
                                        />
                                        <p className={`error ${errors.repeat_password ? 'active' : ''}`}>{errors.repeat_password && errors.repeat_password.message}</p>
                                        <button type='button' className={`password_toggle ${togglePassword ? 'show' : ''}`} onClick={() => setTogglePassword(!togglePassword)}></button>
                                    </label>
                                    <input className='next-step' type='submit' value='Далее' />
                                    <Link to='/auth' className='login-btn'>Вход</Link>
                                </div>
                            }
                        </>
                        :
                        <div className='success-notification animate__animated animate__fadeIn'>
                            <div className='icon'>
                                <Lottie animationData={applyIcon} />
                            </div>
                            <p>Данные введены успешно!</p>
                        </div>
                    }
                    {currentStep === 4 &&
                        <div className={`role-selection__wrapper registration_form ${currentStep === 4 && !successVerification ? 'active' : ''}`}>
                            <p>Заполните анкету</p>
                            <Link to='/registration/performer'>Хочу быть исполнителем</Link>
                            <Link to='/registration/customer'>Хочу быть заказчиком</Link>
                        </div>
                    }
                </div>
            </form>
        </section>
    )
}

export default RegistrationContainer;