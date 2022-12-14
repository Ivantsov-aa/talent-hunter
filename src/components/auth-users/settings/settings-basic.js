import React from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

class SettingsBasic extends React.Component {
    state = {
        uploadPhoto: null,
        aboutYourself: false
    };

    handleSaveChanges = async (files) => {
        const { setAuthUser, authUser, url, token } = this.props;

        let filePath = files.split('//')[1].replace(/\//gi, '...');

        let userInfoCustomer = authUser.role === 'Заказчик' ?
            encodeURIComponent(
                JSON.stringify({
                    name: authUser.name || '',
                    city: authUser.city || '',
                    description: authUser.description || '',
                    url_site: authUser.url_site || '',
                    email: authUser.email || '',
                    address: authUser.address || '',
                    about_me: authUser.about_me || '',
                    foto: authUser.foto ? authUser.foto + ', ' + filePath : filePath
                })
            )
            :
            encodeURIComponent(
                JSON.stringify({
                    city: authUser.city || '',
                    surname: authUser.surname || '',
                    name: authUser.name || '',
                    middle_name: authUser.middle_name || '',
                    birth_date: authUser.birth_date || '',
                    ui_age_id: authUser.ui_age_id || null,
                    email: authUser.email || '',
                    gender: authUser.gender || null,
                    family_status: authUser.family_status || null,
                    having_children: authUser.having_children || null,
                    ui_languages: authUser.ui_languages || '',
                    inter_passport: authUser.inter_passport || null,
                    ui_nationality: authUser.ui_nationality || '',
                    business_trips: authUser.business_trips || null,
                    ui_face_type: authUser.ui_face_type || null,
                    ui_face_form: authUser.ui_face_form || null,
                    ui_eye_color: authUser.ui_eye_color || null,
                    ui_eye_shape: authUser.ui_eye_shape || '',
                    ui_skin_color: authUser.ui_skin_color || null,
                    ui_racial_identity: authUser.ui_racial_identity || null,
                    ui_nose_shape: authUser.ui_nose_shape || null,
                    ui_lips: authUser.ui_lips || '',
                    ui_hair_color: authUser.ui_hair_color || null,
                    hair_length: authUser.hair_length || null,
                    ui_haircut: authUser.ui_haircut || null,
                    height: authUser.height || null,
                    ui_height: authUser.ui_height || null,
                    ui_clothes_size: authUser.ui_clothes_size || null,
                    ui_shoe_size: authUser.ui_shoe_size || null,
                    ui_body_type: authUser.ui_body_type || null,
                    waist_size: authUser.waist_size || null,
                    hip_measurements: authUser.hip_measurements || null,
                    bust: authUser.bust || null,
                    ui_breast_size: authUser.ui_breast_size || null,
                    ui_cosmetic_details: authUser.ui_cosmetic_details || '',
                    ui_cosmetic_surgery: authUser.ui_cosmetic_surgery || '',
                    ui_tattoo: authUser.ui_tattoo || null,
                    ui_education: authUser.ui_education || '',
                    ui_future_profession: authUser.ui_future_profession || '',
                    ui_dental: authUser.ui_dental || null,
                    ui_speech_features: authUser.ui_speech_features || '',
                    ui_facial_hair: authUser.ui_facial_hair || '',
                    ui_corporal_vegetation: authUser.ui_corporal_vegetation || null,
                    ui_social_status: authUser.ui_social_status || '',
                    professional_skills: authUser.professional_skills || '',
                    additional_skills: authUser.additional_skills || '',
                    ui_creative_activity: authUser.ui_creative_activity || '',
                    underwear_ads: authUser.underwear_ads || null,
                    social_network: authUser.social_network || '',
                    ui_sexual_orientation: authUser.ui_sexual_orientation || null,
                    status: authUser.status || '',
                    ui_hobby: authUser.ui_hobby.join(', ') || '',
                    ui_character_traits: authUser.ui_character_traits.join(', ') || '',
                    ui_basic_qualities: authUser.ui_basic_qualities.join(', ') || '',
                    ui_characteristic: authUser.ui_characteristic.join(', ') || '',
                    gallery_photos: authUser.gallery_photos.replace(/\//gi, '...') || '',
                    gallery_video: authUser.gallery_video.replace(/\//gi, '...') || '',
                    about_me: authUser.about_me || '',
                    foto: authUser.foto ? [...authUser.foto, filePath] : filePath
                })
            );

        if (authUser.role === 'Заказчик') {
            await fetch(`${url}/setCustomerProperties/${token}/${authUser.phone}/${userInfoCustomer}`)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.setState({ uploadPhoto: files })
                        setAuthUser({ ...authUser, foto: files.split('//')[1] });
                    }
                })
        } else {
            await fetch(`${url}/setusersinfo/${token}/${authUser.phone}/${userInfoCustomer}`)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.setState({ uploadPhoto: files })
                        setAuthUser({ ...authUser, foto: files.split('//')[1] });
                    }
                })
        }
    }

    render() {
        const { uploadPhoto, aboutYourself } = this.state;
        const { authUser } = this.props;

        const uploader = Uploader({
            apiKey: "public_kW15b1GB389CPsY8LTuoYBAFX7BR"
        });

        const options = { multi: true };

        return (
            <section className='settings_basic__wrapper'>
                <section className='input__container'>
                    <div className='upload-photo'>
                        <UploadButton
                            uploader={uploader}
                            options={options}
                            onComplete={files => this.handleSaveChanges(files.map(e => e.fileUrl).join("\n"))}
                        >
                            {({ onClick }) =>
                                <button onClick={onClick}>
                                    {authUser.foto || uploadPhoto ? <img className='user-photo' src={uploadPhoto ? uploadPhoto : 'https://' + authUser.foto} alt='upload' /> : '+'}
                                </button>
                            }
                        </UploadButton>
                        {/* <label htmlFor='upload-photo'>{authUser.foto || uploadPhoto ? <img className='user-photo' src={uploadPhoto ? uploadPhoto : authUser.foto} alt='upload' /> : '+'}</label> */}
                        <div>
                            <h2>
                                {authUser.name ? authUser.name : `${authUser.first_name} ${authUser.last_name}`}
                            </h2>
                            <p>ID: {authUser.id}</p>
                        </div>
                    </div>
                    <label>
                        Имя пользователя
                        <input
                            type='text'
                            className='phone_input'
                            placeholder='Ваше имя'
                            defaultValue={authUser.name}
                        />
                    </label>
                    <label>
                        Электронная почта
                        <input
                            type='text'
                            className='phone_input'
                            placeholder='Адрес электронной почты'
                            defaultValue={authUser.email}
                        />
                    </label>
                    <label>
                        Номер телефона
                        <input
                            type='text'
                            className='phone_input'
                            placeholder='Номер телефона'
                            defaultValue={authUser.phone}
                        />
                    </label>
                    <label>
                        Деятельность компании
                        <input
                            type='text'
                            className='phone_input'
                            placeholder='Номер телефона'
                            defaultValue={authUser.description}
                        />
                    </label>
                    <label>
                        Город
                        <input
                            type='text'
                            className='phone_input'
                            placeholder='Номер телефона'
                            defaultValue={authUser.city}
                        />
                    </label>
                    <button disabled={uploadPhoto ? false : true} onClick={this.handleSaveChanges}>Сохранить изменения</button>
                </section>
                <section className='settings_basic__buttons'>
                    <button onClick={() => this.setState({ aboutYourself: !aboutYourself })}>
                        О себе
                        <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.8875 20.8875L22.8625 17.8625C22.7463 17.7453 22.608 17.6523 22.4557 17.5889C22.3034 17.5254 22.14 17.4928 21.975 17.4928C21.81 17.4928 21.6466 17.5254 21.4943 17.5889C21.342 17.6523 21.2037 17.7453 21.0875 17.8625L16.6125 22.3375C16.4966 22.4543 16.405 22.5928 16.3428 22.7451C16.2806 22.8974 16.249 23.0605 16.25 23.225V26.25C16.25 26.5815 16.3817 26.8995 16.6161 27.1339C16.8505 27.3683 17.1685 27.5 17.5 27.5H20.525C20.6895 27.501 20.8526 27.4694 21.0049 27.4072C21.1572 27.345 21.2957 27.2534 21.4125 27.1375L25.8875 22.6625C26.0047 22.5463 26.0977 22.408 26.1611 22.2557C26.2246 22.1034 26.2572 21.94 26.2572 21.775C26.2572 21.61 26.2246 21.4466 26.1611 21.2943C26.0977 21.142 26.0047 21.0037 25.8875 20.8875V20.8875ZM20 25H18.75V23.75L21.975 20.525L23.225 21.775L20 25ZM12.5 25H7.5C7.16848 25 6.85054 24.8683 6.61612 24.6339C6.3817 24.3995 6.25 24.0815 6.25 23.75V6.25C6.25 5.91848 6.3817 5.60054 6.61612 5.36612C6.85054 5.1317 7.16848 5 7.5 5H13.75V8.75C13.75 9.74456 14.1451 10.6984 14.8483 11.4017C15.5516 12.1049 16.5054 12.5 17.5 12.5H21.25V13.75C21.25 14.0815 21.3817 14.3995 21.6161 14.6339C21.8505 14.8683 22.1685 15 22.5 15C22.8315 15 23.1495 14.8683 23.3839 14.6339C23.6183 14.3995 23.75 14.0815 23.75 13.75V11.25C23.75 11.25 23.75 11.25 23.75 11.175C23.737 11.0602 23.7118 10.947 23.675 10.8375V10.725C23.6149 10.5965 23.5347 10.4783 23.4375 10.375L15.9375 2.875C15.8342 2.77777 15.716 2.6976 15.5875 2.6375C15.5502 2.6322 15.5123 2.6322 15.475 2.6375L15.075 2.5H7.5C6.50544 2.5 5.55161 2.89509 4.84835 3.59835C4.14509 4.30161 3.75 5.25544 3.75 6.25V23.75C3.75 24.7446 4.14509 25.6984 4.84835 26.4017C5.55161 27.1049 6.50544 27.5 7.5 27.5H12.5C12.8315 27.5 13.1495 27.3683 13.3839 27.1339C13.6183 26.8995 13.75 26.5815 13.75 26.25C13.75 25.9185 13.6183 25.6005 13.3839 25.3661C13.1495 25.1317 12.8315 25 12.5 25ZM16.25 6.7625L19.4875 10H17.5C17.1685 10 16.8505 9.8683 16.6161 9.63388C16.3817 9.39946 16.25 9.08152 16.25 8.75V6.7625ZM10 17.5H17.5C17.8315 17.5 18.1495 17.3683 18.3839 17.1339C18.6183 16.8995 18.75 16.5815 18.75 16.25C18.75 15.9185 18.6183 15.6005 18.3839 15.3661C18.1495 15.1317 17.8315 15 17.5 15H10C9.66848 15 9.35054 15.1317 9.11612 15.3661C8.8817 15.6005 8.75 15.9185 8.75 16.25C8.75 16.5815 8.8817 16.8995 9.11612 17.1339C9.35054 17.3683 9.66848 17.5 10 17.5ZM10 12.5H11.25C11.5815 12.5 11.8995 12.3683 12.1339 12.1339C12.3683 11.8995 12.5 11.5815 12.5 11.25C12.5 10.9185 12.3683 10.6005 12.1339 10.3661C11.8995 10.1317 11.5815 10 11.25 10H10C9.66848 10 9.35054 10.1317 9.11612 10.3661C8.8817 10.6005 8.75 10.9185 8.75 11.25C8.75 11.5815 8.8817 11.8995 9.11612 12.1339C9.35054 12.3683 9.66848 12.5 10 12.5ZM12.5 20H10C9.66848 20 9.35054 20.1317 9.11612 20.3661C8.8817 20.6005 8.75 20.9185 8.75 21.25C8.75 21.5815 8.8817 21.8995 9.11612 22.1339C9.35054 22.3683 9.66848 22.5 10 22.5H12.5C12.8315 22.5 13.1495 22.3683 13.3839 22.1339C13.6183 21.8995 13.75 21.5815 13.75 21.25C13.75 20.9185 13.6183 20.6005 13.3839 20.3661C13.1495 20.1317 12.8315 20 12.5 20Z" fill="#0094FF" />
                        </svg>
                    </button>
                    <ReactTextareaAutosize placeholder='О себе...' className={`${aboutYourself ? 'active' : ''}`} minRows={3} maxRows={8} maxLength={150} />
                    {/* <button>
                        Анкета
                        <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.8875 20.8875L22.8625 17.8625C22.7463 17.7453 22.608 17.6523 22.4557 17.5889C22.3034 17.5254 22.14 17.4928 21.975 17.4928C21.81 17.4928 21.6466 17.5254 21.4943 17.5889C21.342 17.6523 21.2037 17.7453 21.0875 17.8625L16.6125 22.3375C16.4966 22.4543 16.405 22.5928 16.3428 22.7451C16.2806 22.8974 16.249 23.0605 16.25 23.225V26.25C16.25 26.5815 16.3817 26.8995 16.6161 27.1339C16.8505 27.3683 17.1685 27.5 17.5 27.5H20.525C20.6895 27.501 20.8526 27.4694 21.0049 27.4072C21.1572 27.345 21.2957 27.2534 21.4125 27.1375L25.8875 22.6625C26.0047 22.5463 26.0977 22.408 26.1611 22.2557C26.2246 22.1034 26.2572 21.94 26.2572 21.775C26.2572 21.61 26.2246 21.4466 26.1611 21.2943C26.0977 21.142 26.0047 21.0037 25.8875 20.8875V20.8875ZM20 25H18.75V23.75L21.975 20.525L23.225 21.775L20 25ZM12.5 25H7.5C7.16848 25 6.85054 24.8683 6.61612 24.6339C6.3817 24.3995 6.25 24.0815 6.25 23.75V6.25C6.25 5.91848 6.3817 5.60054 6.61612 5.36612C6.85054 5.1317 7.16848 5 7.5 5H13.75V8.75C13.75 9.74456 14.1451 10.6984 14.8483 11.4017C15.5516 12.1049 16.5054 12.5 17.5 12.5H21.25V13.75C21.25 14.0815 21.3817 14.3995 21.6161 14.6339C21.8505 14.8683 22.1685 15 22.5 15C22.8315 15 23.1495 14.8683 23.3839 14.6339C23.6183 14.3995 23.75 14.0815 23.75 13.75V11.25C23.75 11.25 23.75 11.25 23.75 11.175C23.737 11.0602 23.7118 10.947 23.675 10.8375V10.725C23.6149 10.5965 23.5347 10.4783 23.4375 10.375L15.9375 2.875C15.8342 2.77777 15.716 2.6976 15.5875 2.6375C15.5502 2.6322 15.5123 2.6322 15.475 2.6375L15.075 2.5H7.5C6.50544 2.5 5.55161 2.89509 4.84835 3.59835C4.14509 4.30161 3.75 5.25544 3.75 6.25V23.75C3.75 24.7446 4.14509 25.6984 4.84835 26.4017C5.55161 27.1049 6.50544 27.5 7.5 27.5H12.5C12.8315 27.5 13.1495 27.3683 13.3839 27.1339C13.6183 26.8995 13.75 26.5815 13.75 26.25C13.75 25.9185 13.6183 25.6005 13.3839 25.3661C13.1495 25.1317 12.8315 25 12.5 25ZM16.25 6.7625L19.4875 10H17.5C17.1685 10 16.8505 9.8683 16.6161 9.63388C16.3817 9.39946 16.25 9.08152 16.25 8.75V6.7625ZM10 17.5H17.5C17.8315 17.5 18.1495 17.3683 18.3839 17.1339C18.6183 16.8995 18.75 16.5815 18.75 16.25C18.75 15.9185 18.6183 15.6005 18.3839 15.3661C18.1495 15.1317 17.8315 15 17.5 15H10C9.66848 15 9.35054 15.1317 9.11612 15.3661C8.8817 15.6005 8.75 15.9185 8.75 16.25C8.75 16.5815 8.8817 16.8995 9.11612 17.1339C9.35054 17.3683 9.66848 17.5 10 17.5ZM10 12.5H11.25C11.5815 12.5 11.8995 12.3683 12.1339 12.1339C12.3683 11.8995 12.5 11.5815 12.5 11.25C12.5 10.9185 12.3683 10.6005 12.1339 10.3661C11.8995 10.1317 11.5815 10 11.25 10H10C9.66848 10 9.35054 10.1317 9.11612 10.3661C8.8817 10.6005 8.75 10.9185 8.75 11.25C8.75 11.5815 8.8817 11.8995 9.11612 12.1339C9.35054 12.3683 9.66848 12.5 10 12.5ZM12.5 20H10C9.66848 20 9.35054 20.1317 9.11612 20.3661C8.8817 20.6005 8.75 20.9185 8.75 21.25C8.75 21.5815 8.8817 21.8995 9.11612 22.1339C9.35054 22.3683 9.66848 22.5 10 22.5H12.5C12.8315 22.5 13.1495 22.3683 13.3839 22.1339C13.6183 21.8995 13.75 21.5815 13.75 21.25C13.75 20.9185 13.6183 20.6005 13.3839 20.3661C13.1495 20.1317 12.8315 20 12.5 20Z" fill="#0094FF" />
                        </svg>
                    </button> */}
                    <button>
                        Черный список
                        <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.8875 20.8875L22.8625 17.8625C22.7463 17.7453 22.608 17.6523 22.4557 17.5889C22.3034 17.5254 22.14 17.4928 21.975 17.4928C21.81 17.4928 21.6466 17.5254 21.4943 17.5889C21.342 17.6523 21.2037 17.7453 21.0875 17.8625L16.6125 22.3375C16.4966 22.4543 16.405 22.5928 16.3428 22.7451C16.2806 22.8974 16.249 23.0605 16.25 23.225V26.25C16.25 26.5815 16.3817 26.8995 16.6161 27.1339C16.8505 27.3683 17.1685 27.5 17.5 27.5H20.525C20.6895 27.501 20.8526 27.4694 21.0049 27.4072C21.1572 27.345 21.2957 27.2534 21.4125 27.1375L25.8875 22.6625C26.0047 22.5463 26.0977 22.408 26.1611 22.2557C26.2246 22.1034 26.2572 21.94 26.2572 21.775C26.2572 21.61 26.2246 21.4466 26.1611 21.2943C26.0977 21.142 26.0047 21.0037 25.8875 20.8875V20.8875ZM20 25H18.75V23.75L21.975 20.525L23.225 21.775L20 25ZM12.5 25H7.5C7.16848 25 6.85054 24.8683 6.61612 24.6339C6.3817 24.3995 6.25 24.0815 6.25 23.75V6.25C6.25 5.91848 6.3817 5.60054 6.61612 5.36612C6.85054 5.1317 7.16848 5 7.5 5H13.75V8.75C13.75 9.74456 14.1451 10.6984 14.8483 11.4017C15.5516 12.1049 16.5054 12.5 17.5 12.5H21.25V13.75C21.25 14.0815 21.3817 14.3995 21.6161 14.6339C21.8505 14.8683 22.1685 15 22.5 15C22.8315 15 23.1495 14.8683 23.3839 14.6339C23.6183 14.3995 23.75 14.0815 23.75 13.75V11.25C23.75 11.25 23.75 11.25 23.75 11.175C23.737 11.0602 23.7118 10.947 23.675 10.8375V10.725C23.6149 10.5965 23.5347 10.4783 23.4375 10.375L15.9375 2.875C15.8342 2.77777 15.716 2.6976 15.5875 2.6375C15.5502 2.6322 15.5123 2.6322 15.475 2.6375L15.075 2.5H7.5C6.50544 2.5 5.55161 2.89509 4.84835 3.59835C4.14509 4.30161 3.75 5.25544 3.75 6.25V23.75C3.75 24.7446 4.14509 25.6984 4.84835 26.4017C5.55161 27.1049 6.50544 27.5 7.5 27.5H12.5C12.8315 27.5 13.1495 27.3683 13.3839 27.1339C13.6183 26.8995 13.75 26.5815 13.75 26.25C13.75 25.9185 13.6183 25.6005 13.3839 25.3661C13.1495 25.1317 12.8315 25 12.5 25ZM16.25 6.7625L19.4875 10H17.5C17.1685 10 16.8505 9.8683 16.6161 9.63388C16.3817 9.39946 16.25 9.08152 16.25 8.75V6.7625ZM10 17.5H17.5C17.8315 17.5 18.1495 17.3683 18.3839 17.1339C18.6183 16.8995 18.75 16.5815 18.75 16.25C18.75 15.9185 18.6183 15.6005 18.3839 15.3661C18.1495 15.1317 17.8315 15 17.5 15H10C9.66848 15 9.35054 15.1317 9.11612 15.3661C8.8817 15.6005 8.75 15.9185 8.75 16.25C8.75 16.5815 8.8817 16.8995 9.11612 17.1339C9.35054 17.3683 9.66848 17.5 10 17.5ZM10 12.5H11.25C11.5815 12.5 11.8995 12.3683 12.1339 12.1339C12.3683 11.8995 12.5 11.5815 12.5 11.25C12.5 10.9185 12.3683 10.6005 12.1339 10.3661C11.8995 10.1317 11.5815 10 11.25 10H10C9.66848 10 9.35054 10.1317 9.11612 10.3661C8.8817 10.6005 8.75 10.9185 8.75 11.25C8.75 11.5815 8.8817 11.8995 9.11612 12.1339C9.35054 12.3683 9.66848 12.5 10 12.5ZM12.5 20H10C9.66848 20 9.35054 20.1317 9.11612 20.3661C8.8817 20.6005 8.75 20.9185 8.75 21.25C8.75 21.5815 8.8817 21.8995 9.11612 22.1339C9.35054 22.3683 9.66848 22.5 10 22.5H12.5C12.8315 22.5 13.1495 22.3683 13.3839 22.1339C13.6183 21.8995 13.75 21.5815 13.75 21.25C13.75 20.9185 13.6183 20.6005 13.3839 20.3661C13.1495 20.1317 12.8315 20 12.5 20Z" fill="#0094FF" />
                        </svg>
                    </button>
                    <div className='social_links'>
                        <p>Подключить социальные сети</p>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32.221 3.08337H4.77933C4.32957 3.08337 3.89822 3.26204 3.58019 3.58007C3.26216 3.8981 3.0835 4.32944 3.0835 4.77921V32.2209C3.0835 32.4436 3.12736 32.6641 3.21258 32.8698C3.29781 33.0756 3.42272 33.2625 3.58019 33.42C3.73767 33.5775 3.92461 33.7024 4.13036 33.7876C4.33611 33.8728 4.55663 33.9167 4.77933 33.9167H19.5485V21.9688H15.5402V17.3438H19.5485V13.875C19.4655 13.0607 19.5616 12.238 19.8302 11.4647C20.0988 10.6914 20.5333 9.98626 21.1032 9.39867C21.6732 8.81109 22.3648 8.35532 23.1295 8.06332C23.8943 7.77133 24.7136 7.65018 25.5302 7.70837C26.7301 7.70099 27.9294 7.76276 29.1222 7.89337V12.0559H26.671C24.7285 12.0559 24.3585 12.9809 24.3585 14.3221V17.2975H28.9835L28.3822 21.9225H24.3585V33.9167H32.221C32.4437 33.9167 32.6642 33.8728 32.87 33.7876C33.0757 33.7024 33.2627 33.5775 33.4201 33.42C33.5776 33.2625 33.7025 33.0756 33.7877 32.8698C33.873 32.6641 33.9168 32.4436 33.9168 32.2209V4.77921C33.9168 4.55651 33.873 4.33599 33.7877 4.13024C33.7025 3.92449 33.5776 3.73755 33.4201 3.58007C33.2627 3.4226 33.0757 3.29769 32.87 3.21246C32.6642 3.12724 32.4437 3.08337 32.221 3.08337Z" fill="black" />
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5002 14.6767C17.744 14.6767 17.0048 14.9009 16.376 15.3211C15.7473 15.7412 15.2572 16.3383 14.9679 17.0369C14.6785 17.7355 14.6028 18.5043 14.7503 19.2459C14.8978 19.9876 15.262 20.6688 15.7967 21.2035C16.3314 21.7382 17.0126 22.1024 17.7543 22.2499C18.4959 22.3974 19.2647 22.3217 19.9633 22.0323C20.6619 21.743 21.259 21.2529 21.6791 20.6242C22.0993 19.9954 22.3235 19.2562 22.3235 18.5C22.3235 17.998 22.2246 17.5008 22.0325 17.0369C21.8403 16.573 21.5587 16.1516 21.2037 15.7965C20.8486 15.4415 20.4272 15.1599 19.9633 14.9677C19.4994 14.7756 19.0023 14.6767 18.5002 14.6767ZM33.8089 10.8996C33.8008 9.70908 33.5816 8.52942 33.1614 7.41546C32.852 6.60032 32.3732 5.86006 31.7567 5.24353C31.1401 4.62701 30.3999 4.14823 29.5847 3.83879C28.4708 3.41863 27.2911 3.1994 26.1006 3.19129C24.1118 3.08337 23.526 3.08337 18.5002 3.08337C13.4743 3.08337 12.8885 3.08337 10.8997 3.19129C9.70921 3.1994 8.52954 3.41863 7.41558 3.83879C6.60044 4.14823 5.86018 4.62701 5.24366 5.24353C4.62713 5.86006 4.14835 6.60032 3.83891 7.41546C3.41875 8.52942 3.19952 9.70908 3.19141 10.8996C3.0835 12.8884 3.0835 13.4742 3.0835 18.5C3.0835 23.5259 3.0835 24.1117 3.19141 26.1005C3.20801 27.2952 3.42694 28.4785 3.83891 29.6C4.14698 30.4115 4.62536 31.1474 5.24183 31.7584C5.85571 32.3786 6.59755 32.8574 7.41558 33.1613C8.52954 33.5815 9.70921 33.8007 10.8997 33.8088C12.8885 33.9167 13.4743 33.9167 18.5002 33.9167C23.526 33.9167 24.1118 33.9167 26.1006 33.8088C27.2911 33.8007 28.4708 33.5815 29.5847 33.1613C30.4028 32.8574 31.1446 32.3786 31.7585 31.7584C32.375 31.1474 32.8533 30.4115 33.1614 29.6C33.5812 28.4806 33.8004 27.296 33.8089 26.1005C33.9168 24.1117 33.9168 23.5259 33.9168 18.5C33.9168 13.4742 33.9168 12.8884 33.8089 10.8996ZM29.8931 23.233C29.8436 24.1843 29.6406 25.1214 29.2918 26.008C28.9925 26.7475 28.5476 27.4193 27.9835 27.9834C27.4194 28.5475 26.7476 28.9924 26.0081 29.2917C25.1132 29.621 24.1708 29.8032 23.2177 29.8313C21.9997 29.8313 21.676 29.8313 18.5002 29.8313C15.3243 29.8313 15.0006 29.8313 13.7827 29.8313C12.8295 29.8032 11.8872 29.621 10.9922 29.2917C10.2277 29.0076 9.53734 28.5544 8.97266 27.9659C8.41407 27.4128 7.98267 26.7447 7.7085 26.008C7.3779 25.114 7.20068 24.1706 7.18433 23.2175C7.18433 21.9996 7.18433 21.6759 7.18433 18.5C7.18433 15.3242 7.18433 15.0005 7.18433 13.7825C7.20068 12.8295 7.3779 11.8861 7.7085 10.9921C7.9926 10.2276 8.44584 9.53722 9.03433 8.97254C9.58984 8.41696 10.2573 7.98602 10.9922 7.70837C11.8872 7.37908 12.8295 7.19686 13.7827 7.16879C15.0006 7.16879 15.3243 7.16879 18.5002 7.16879C21.676 7.16879 21.9997 7.16879 23.2177 7.16879C24.1708 7.19686 25.1132 7.37908 26.0081 7.70837C26.7726 7.99247 27.463 8.44571 28.0277 9.03421C28.5863 9.58728 29.0177 10.2554 29.2918 10.9921C29.6211 11.887 29.8033 12.8294 29.8314 13.7825C29.8314 15.0005 29.8314 15.3242 29.8314 18.5C29.8314 21.6759 29.9393 21.9996 29.8931 23.2175V23.233ZM27.4264 11.763C27.2429 11.265 26.9535 10.8127 26.5782 10.4375C26.2029 10.0622 25.7506 9.77276 25.2527 9.58921C24.5689 9.35219 23.8487 9.23739 23.1252 9.25004C21.9227 9.25004 21.5835 9.25004 18.5002 9.25004C15.4168 9.25004 15.0777 9.25004 13.8752 9.25004C13.1479 9.25715 12.4276 9.39285 11.7477 9.65087C11.2573 9.82609 10.8099 10.1037 10.4351 10.4652C10.0603 10.8267 9.76672 11.2638 9.57391 11.7475C9.35003 12.4341 9.24065 13.1529 9.25016 13.875C9.25016 15.0775 9.25016 15.4167 9.25016 18.5C9.25016 21.5834 9.25016 21.9225 9.25016 23.125C9.26545 23.8515 9.40089 24.5704 9.651 25.2525C9.83455 25.7505 10.124 26.2028 10.4992 26.578C10.8745 26.9533 11.3268 27.2427 11.8247 27.4263C12.4825 27.6682 13.1747 27.8035 13.8752 27.8271C15.0777 27.8271 15.4168 27.8271 18.5002 27.8271C21.5835 27.8271 21.9227 27.8271 23.1252 27.8271C23.8524 27.82 24.5727 27.6843 25.2527 27.4263C25.7506 27.2427 26.2029 26.9533 26.5782 26.578C26.9535 26.2028 27.2429 25.7505 27.4264 25.2525C27.6844 24.5726 27.8201 23.8523 27.8272 23.125C27.8272 21.9225 27.8272 21.5834 27.8272 18.5C27.8272 15.4167 27.8272 15.0775 27.8272 13.875C27.8277 13.1471 27.6917 12.4254 27.4264 11.7475V11.763ZM18.5002 24.3892C17.7275 24.3892 16.9625 24.2368 16.2488 23.9406C15.5352 23.6445 14.887 23.2104 14.3413 22.6634C13.7957 22.1163 13.3634 21.467 13.0691 20.7526C12.7748 20.0381 12.6244 19.2727 12.6264 18.5C12.6264 17.3346 12.9722 16.1954 13.62 15.2266C14.2678 14.2578 15.1885 13.503 16.2655 13.0577C17.3425 12.6124 18.5274 12.4967 19.6702 12.7252C20.813 12.9537 21.8623 13.5161 22.6853 14.3413C23.5083 15.1664 24.068 16.2172 24.2935 17.3606C24.519 18.504 24.4001 19.6886 23.952 20.7644C23.5039 21.8403 22.7467 22.759 21.7762 23.4042C20.8057 24.0495 19.6656 24.3923 18.5002 24.3892ZM24.6668 13.7671C24.326 13.7311 24.0106 13.5701 23.7814 13.3154C23.5522 13.0606 23.4254 12.73 23.4254 12.3873C23.4254 12.0446 23.5522 11.7141 23.7814 11.4593C24.0106 11.2045 24.326 11.0436 24.6668 11.0075C25.0076 11.0436 25.323 11.2045 25.5522 11.4593C25.7815 11.7141 25.9083 12.0446 25.9083 12.3873C25.9083 12.73 25.7815 13.0606 25.5522 13.3154C25.323 13.5701 25.0076 13.7311 24.6668 13.7671Z" fill="black" />
                            </svg>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}

export default SettingsBasic;