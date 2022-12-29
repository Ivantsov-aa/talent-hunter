import React from "react";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { Upload } from "upload-js";

import Lottie from "lottie-react";
import applyIcon from '../../assets/apply-icon.json';

const UploadPhotoPopUp = ({ authorizationSubmit, url, token, userData, role }) => {
    const [userPhoto, setUserPhoto] = useState(null);
    const [published, setPublished] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm({
        mode: 'onSubmit'
    });

    const handleUploadPhoto = async (e) => {
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

        setUserPhoto(fileUrl)
    }

    const handlePublishPhoto = async () => {
        // let userNumber = encodeURIComponent(JSON.stringify({ phone: userData.phone }));

        if (role === 'customer') {
            let userInfoCustomer = encodeURIComponent(
                JSON.stringify({
                    name: userData.name || '',
                    city: userData.city || '',
                    description: userData.description || '',
                    url_site: userData.url_site || '',
                    email: userData.email || '',
                    address: userData.address || '',
                    about_me: userData.about_me || '',
                    foto: userPhoto.split('//')[1].replace(/\//gi, '...')
                })
            );

            await fetch(`${url}/setCustomerProperties/${token}/${userData.phone}/${userInfoCustomer}`)
                .then(() => {
                    authorizationSubmit(userData.phone)
                })
        } else {
            let userInfoExecutor = encodeURIComponent(
                JSON.stringify({
                    city: userData.city || '',
                    surname: userData.surname || '',
                    name: userData.name || '',
                    middle_name: userData.middle_name || '',
                    birth_date: userData.birth_date || '',
                    ui_age_id: userData.ui_age_id || null,
                    email: userData.email || '',
                    gender: userData.gender || null,
                    family_status: userData.family_status || null,
                    having_children: userData.having_children || null,
                    ui_languages: userData.ui_languages || '',
                    inter_passport: userData.inter_passport || null,
                    ui_nationality: userData.ui_nationality || '',
                    business_trips: userData.business_trips || null,
                    ui_face_type: userData.ui_face_type || null,
                    ui_face_form: userData.ui_face_form || null,
                    ui_eye_color: userData.ui_eye_color || null,
                    ui_eye_shape: userData.ui_eye_shape || '',
                    ui_skin_color: userData.ui_skin_color || null,
                    ui_racial_identity: userData.ui_racial_identity || null,
                    ui_nose_shape: userData.ui_nose_shape || null,
                    ui_lips: userData.ui_lips || '',
                    ui_hair_color: userData.ui_hair_color || null,
                    hair_length: userData.hair_length || null,
                    ui_haircut: userData.ui_haircut || null,
                    height: userData.height || null,
                    ui_height: userData.ui_height || null,
                    ui_clothes_size: userData.ui_clothes_size || null,
                    ui_shoe_size: userData.ui_shoe_size || null,
                    ui_body_type: userData.ui_body_type || null,
                    waist_size: userData.waist_size || null,
                    hip_measurements: userData.hip_measurements || null,
                    bust: userData.bust || null,
                    ui_breast_size: userData.ui_breast_size || null,
                    ui_cosmetic_details: userData.ui_cosmetic_details || '',
                    ui_cosmetic_surgery: userData.ui_cosmetic_surgery || '',
                    ui_tattoo: userData.ui_tattoo || null,
                    ui_education: userData.ui_education || '',
                    ui_future_profession: userData.ui_future_profession || '',
                    ui_dental: userData.ui_dental || null,
                    ui_speech_features: userData.ui_speech_features || '',
                    ui_facial_hair: userData.ui_facial_hair || '',
                    ui_corporal_vegetation: userData.ui_corporal_vegetation || null,
                    ui_social_status: userData.ui_social_status || '',
                    professional_skills: userData.professional_skills || '',
                    additional_skills: userData.additional_skills || '',
                    ui_creative_activity: userData.ui_creative_activity || '',
                    underwear_ads: userData.underwear_ads || null,
                    social_network: userData.social_network || '',
                    ui_sexual_orientation: userData.ui_sexual_orientation || null,
                    status: userData.status || '',
                    ui_hobby: userData.ui_hobby.join(', ') || '',
                    ui_character_traits: userData.ui_character_traits.join(', ') || '',
                    ui_basic_qualities: userData.ui_basic_qualities.join(', ') || '',
                    ui_characteristic: userData.ui_characteristic.join(', ') || '',
                    foto: userPhoto.split('//')[1].replace(/\//gi, '...') || '',
                    gallery_photos: userData.gallery_photos.replace(/\//gi, '...') || '',
                    gallery_video: userData.gallery_video.replace(/\//gi, '...') || '',
                    about_me: userData.about_me || ''
                })
            );

            await fetch(`${url}/setusersinfo/${token}/${userData.phone}/${userInfoExecutor}`)
                .then(resp => {
                    if (resp.status === 200) {
                        authorizationSubmit(userData.phone);
                    }
                })

        }

        setPublished(true);
    }

    return (
        <section className='auth__wrapper'>
            {!published ?
                <form className={`registration__wrapper upload-photo animate__animated animate__fadeIn`}
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
                <section className={`registration__wrapper success_registration animate__animated 'animate__fadeIn`}>
                    <div>
                        <h1>ПОЗДРАВЛЯЕМ!</h1>
                        <p>Вы добавили свое первое фото</p>
                        <div className='success-notification animate__animated animate__fadeIn'>
                            <div className='icon'>
                                <Lottie animationData={applyIcon} />
                            </div>
                        </div>
                        {/* <Link to='/' className='redirect'>Смотреть ленту</Link> */}
                    </div>
                </section>
            }
        </section>
    )
}

export default UploadPhotoPopUp;