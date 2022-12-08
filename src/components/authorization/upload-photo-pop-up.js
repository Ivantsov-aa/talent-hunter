import React from "react";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";

import Lottie from "lottie-react";
import applyIcon from '../../assets/apply-icon.json';

const UploadPhotoPopUp = ({ navigate, registrationSubmit, stylesBeforeOpenPopUp, handleClickRegistrationBtn, setChangesStyle }) => {
    const [userPhoto, setUserPhoto] = useState(null);
    const [published, setPublished] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm({
        mode: 'onSubmit'
    });

    const handleUploadPhoto = e => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onload = () => {
            setUserPhoto(reader.result);
        }

        reader.readAsDataURL(file);
    }

    const handlePublishPhoto = () => {
        setPublished(true);
    }


    const goToNewsFeed = () => {
        registrationSubmit(userPhoto, 'upload_photo');
        navigate('/');

        setTimeout(() => {
            setChangesStyle('')
        }, 500)
    }

    return (
        <section className='auth__wrapper'>
            {!published ?
                <form className={`registration__wrapper upload-photo animate__animated ${stylesBeforeOpenPopUp === 'open' ? 'animate__fadeOut' : 'animate__fadeIn '}`}
                    onSubmit={handleSubmit(handlePublishPhoto)}
                >
                    <div>
                        <h1>Загрузи своё первое фото</h1>
                        <Link to='/' className='registration_close'>
                            <svg width="25" height="25" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.7346 17.7538L33.8261 6.66763C35.2187 5.2751 35.2187 3.02812 33.8261 1.63559C32.4336 0.243057 30.1866 0.243057 28.7941 1.63559L17.7025 12.7218L6.61364 1.63288C5.22111 0.240353 2.97413 0.240353 1.5816 1.63288C0.189068 3.02542 0.189068 5.27239 1.5816 6.66493L12.6732 17.7511L1.5816 28.8373C0.189068 30.2298 0.189068 32.4768 1.5816 33.8693C2.97683 35.2618 5.23192 35.2618 6.61364 33.8693L17.7052 22.7831L28.7968 33.8693C30.1893 35.2618 32.4363 35.2618 33.8288 33.8693C35.2106 32.4768 35.2106 30.2298 33.8153 28.8346L22.7346 17.7538Z" fill="#353535" />
                            </svg>
                        </Link>
                        <input
                            type='file'
                            accept='image/*'
                            {...register('user_photo')}
                            id='upload-photo'
                            onChange={handleUploadPhoto}
                        />
                        <label htmlFor='upload-photo'>{userPhoto ? <img className='user-photo' src={userPhoto} alt='upload' /> : '+'}</label>
                        <button className='upload'>Опубликовать</button>
                    </div>
                </form>
                :
                <section className={`registration__wrapper success_registration animate__animated ${stylesBeforeOpenPopUp === 'open' ? 'animate__fadeOut' : 'animate__fadeIn '}`}>
                    <div>
                        <h1>ПОЗДРАВЛЯЕМ!</h1>
                        <p>Вы добавили свое первое фото</p>
                        <div className='success-notification animate__animated animate__fadeIn'>
                            <div className='icon'>
                                <Lottie animationData={applyIcon} />
                            </div>
                        </div>
                        <button className='redirect' onClick={goToNewsFeed}>Смотреть ленту</button>
                    </div>
                </section>
            }
        </section>
    )
}

export default UploadPhotoPopUp;