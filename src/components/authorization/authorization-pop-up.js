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
import loadingIcon from '../../assets/loading-icon.json';

const AuthorizationPopUp = ({ location, url, token, authorizationSubmit }) => {
    const [step, setStep] = useState(1);
    const [phoneCountryCode, setPhoneCountryCode] = useState('');
    const [togglePassword, setTogglePassword] = useState(false);
    // const [authPath, setAuthPath] = useState('number');
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [valueVerification, setValueVerification] = useState('');
    const [codeVerification, setVerificationCode] = useState(null);
    const [successVerification, setSuccessVerification] = useState('');
    const [loading, setLoading] = useState(false);
    const [verifiedPhone, setVerifiedPhone] = useState(null);

    const {
        control,
        register,
        handleSubmit,
        setError,
        // reset,
        clearErrors,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit'
    });

    useEffect(() => {
        setPhoneCountryCode(location.country)
    }, [location.country])

    // const handleTogglePassword = path => {
    //     setAuthPath(path);
    //     clearErrors();
    //     reset();
    // }

    const checkPhoneAndPassword = async (data) => {
        let userNumber = encodeURIComponent(JSON.stringify({ phone: data.phoneNumber }));
        let userPassword = encodeURIComponent(JSON.stringify({ password: data.password }));

        await Promise.all([
            fetch(`${url}/checkphone/${token}/${userNumber}`)
                .then(response => response.json()),
            fetch(`${url}/checkpasswd/${token}/${userNumber}/${userPassword}`)
                .then(response => response.json()),
        ])
            .then(result => {
                setLoading(false);
                if (result[0].message === 'Phone exists!' && result[1].message === 'Password matches!') {
                    setStep(2);
                    setVerifiedPhone(userNumber);
                    fetch(`${url}/getSms/${token}/${userNumber}`)
                        .then(response => response.json())
                        .then(result => setVerificationCode(result.sms_code))
                } else if (result[0].message !== 'Phone exists!') {
                    setError('phone', { message: '* ?????????? ?????????? ???????????????? ???? ??????????????????????????????' })
                } else if (result[1].message !== 'Password matches!') {
                    setError('password', { message: '* ???????????????? ????????????' })
                }
            })
    }

    const onSubmit = (data) => {
        setLoading(true);

        if (step === 1) {
            checkPhoneAndPassword(data);
        } else if (step === 2) {
            if (+valueVerification !== codeVerification) {
                setError('verification', { message: '* ?????? ???????????? ??????????????????????' })
            } else {
                setSuccessVerification('authorized')
                setTimeout(() => {
                    authorizationSubmit(verifiedPhone);
                }, 2000);
            }
        }
        // arrayUsers.forEach(user => {
        //     switch (true) {
        //         case data.phoneNumber && user.password === data.password && user.phone_number === data.phoneNumber:
        //             switch (step) {
        //                 case 1:
        //                     const min = 1000;
        //                     const max = 9999;
        //                     const random = min + (Math.random() * (max - min));
        //                     const code = Math.round(random);
        //                     setVerificationCode(code);

        //                     setUserId(user.user_id);
        //                     setUserName(user.first_name);
        //                     setSuccessVerification('verification');

        //                     setTimeout(() => {
        //                         setSuccessVerification('')
        //                         setStep(2)
        //                     }, 2000)
        //                     break;

        //                 case 2:
        //                     if (+valueVerification !== codeVerification) {
        //                         setError('verification', { message: '* ?????? ???????????? ??????????????????????' })
        //                     } else {
        //                         setSuccessVerification('authorized')
        //                         setTimeout(() => {
        //                             authorizationSubmit(userId);
        //                         }, 2000);
        //                     }
        //                     break;
        //                 default:
        //                     break;
        //             }

        //             break;
        //         case data.phoneNumber && user.phone_number === data.phoneNumber && user.password !== data.password:
        //             setError('password', { message: '???????????????? ????????????' });
        //             break;
        //         case data.phoneNumber && user.phone_number !== data.phoneNumber:
        //             setError('phoneNumber', { message: '?????????????? ???? ??????????????????????????????' });
        //             break;

        //         case data.email && user.password === data.password && user.email === data.email:
        //             switch (step) {
        //                 case 1:
        //                     const min = 1000;
        //                     const max = 9999;
        //                     const random = min + (Math.random() * (max - min));
        //                     const code = Math.round(random);
        //                     setVerificationCode(code);

        //                     setUserId(user.user_id);
        //                     setUserName(user.first_name);
        //                     setSuccessVerification('verification');

        //                     setTimeout(() => {
        //                         setSuccessVerification('')
        //                         setStep(2)
        //                     }, 2000)
        //                     break;

        //                 case 2:
        //                     if (+valueVerification !== codeVerification) {
        //                         setError('verification', { message: '* ?????? ???????????? ??????????????????????' })
        //                     } else {
        //                         setSuccessVerification('authorized');
        //                         setTimeout(() => {
        //                             authorizationSubmit(userId);
        //                         }, 2000);
        //                     }
        //                     break;
        //                 default:
        //                     break;
        //             }
        //             break;
        //         case data.email && user.email === data.email && user.password !== data.password:
        //             setError('password', { message: '???????????????? ????????????' });
        //             break;
        //         case data.email && user.email !== data.email:
        //             setError('email', { message: 'E-mail ???? ??????????????????????????????' });
        //             break;

        //         default:
        //             break;
        //     }
        // })
    }

    return (
        <section className='auth__wrapper'>
            <form className="registration__wrapper authorization__wrapper" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h1>???????? ?? ??????????????</h1>
                    <Link to='/' className='registration_close'>
                        <svg width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.7346 17.7538L33.8261 6.66763C35.2187 5.2751 35.2187 3.02812 33.8261 1.63559C32.4336 0.243057 30.1866 0.243057 28.7941 1.63559L17.7025 12.7218L6.61364 1.63288C5.22111 0.240353 2.97413 0.240353 1.5816 1.63288C0.189068 3.02542 0.189068 5.27239 1.5816 6.66493L12.6732 17.7511L1.5816 28.8373C0.189068 30.2298 0.189068 32.4768 1.5816 33.8693C2.97683 35.2618 5.23192 35.2618 6.61364 33.8693L17.7052 22.7831L28.7968 33.8693C30.1893 35.2618 32.4363 35.2618 33.8288 33.8693C35.2106 32.4768 35.2106 30.2298 33.8153 28.8346L22.7346 17.7538Z" fill="#353535" />
                        </svg>
                    </Link>

                    {step === 1 && !successVerification &&
                        <section>
                            {/* {authPath === 'number' ? */}
                            <label className={`phone-input_label auth_input ${errors.phone !== undefined ? 'error_input' : ''}`}>
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
                                            onFocus={() => clearErrors()}
                                            labels={ru}
                                        />
                                    )}
                                >
                                </Controller>
                                <p className={`error ${errors.phone ? 'active' : ''}`}>{errors.phone && errors.phone.message}</p>
                                {/* <button type='button' onClick={() => handleTogglePassword('email')}>?????????? ???? e-mail</button> */}
                            </label>
                            {/*//     :
                            //     <label className='auth_input'>
                            //         <input
                            //             className={`phone_input ${errors.email ? 'error_input' : ''}`}
                            //             type='text'
                            //             placeholder='?????????????? e-mail'
                            //             {...register('email', {
                            //                 pattern: {
                            //                     value: /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/,
                            //                     message: 'E-mail ???????????? ??????????????????????.'
                            //                 }
                            //             })}
                            //         />
                            //         <p className={`error ${errors.email ? 'active' : ''}`}>{errors.email && errors.email.message}</p>
                            //         <button type='button' onClick={() => handleTogglePassword('number')}>?????????? ???? ????????????</button>
                            //     </label>
                            //*/}
                            <div className='password__wrapper' >
                                <label>
                                    <input
                                        className={`phone_input ${errors.password !== undefined ? 'error_input' : ''}`}
                                        type={togglePassword ? 'text' : 'password'}
                                        placeholder='?????????????? ????????????'
                                        {...register('password', {
                                            required: '?????? ???????? ?????????????????????? ?? ????????????????????.',
                                            minLength: {
                                                value: 6,
                                                message: '???????????? ???????????? ?????????????????? ???? 6 ???? 16 ????????????????.'
                                            },
                                            maxLength: {
                                                value: 16,
                                                message: '???????????? ???????????? ?????????????????? ???? 6 ???? 16 ????????????????.'
                                            },
                                            pattern: {
                                                value: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/,
                                                message: '???????????????????????? ?????????????? ????????????. ???????????? ???????????? ?????????????????? ?????????????? ???????? ???????????? ???????????????? ?? ?????????????? ????????????????, ?? ?????????????? ???????? ??????????.'
                                            }
                                        })}
                                    />
                                    <p className={`error ${errors.password ? 'active' : ''}`}>{errors.password && errors.password.message}</p>
                                    <button type='button' className={`password_toggle ${togglePassword ? 'show' : ''}`} onClick={() => setTogglePassword(!togglePassword)}></button>
                                </label>
                            </div>
                            <button type='submit' className={`next-step ${loading ? 'loading' : ''}`}>{!loading ?
                                '??????????'
                                :
                                <div className='loading_icon'>
                                    <Lottie animationData={loadingIcon} />
                                </div>
                            }</button>
                        </section>
                    }
                    {successVerification === 'verification' &&
                        <div className='success-notification animate__animated animate__fadeIn'>
                            <div className='icon'>
                                <Lottie animationData={applyIcon} />
                            </div>
                            <p>???????????? ?????????????? ??????????????!</p>
                        </div>
                    }
                    {step === 2 && !successVerification &&
                        <div className={`registration_form ${userId && !successVerification ? 'active' : ''}`}>
                            <p>{codeVerification}</p>
                            <p>?????? ???????????? ?????????????????? SMS ?? 4?? ?????????????? ??????????</p>
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
                                }}>?????????????????? ???????????? ?????? ??????</button>
                                :
                                <input className='next-step' type='submit' value='??????????' />
                            }
                        </div>
                    }

                    {successVerification === 'authorized' &&
                        <div className='success-notification animate__animated animate__fadeIn'>
                            <div className='icon'>
                                <Lottie animationData={applyIcon} />
                            </div>
                            <p>???????????? ?????????????? ??????????????!</p>
                            <h2>?????????? ???????????????????? ?? Talent Hunter, {userName}</h2>
                        </div>
                    }
                </div>
            </form>
        </section>
    )
}

export default AuthorizationPopUp;