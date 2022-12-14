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
                                <h1>???????? ??????????????????????</h1>
                                <section className='performer__direction-choice'>
                                    <button type='button' className="model" onClick={() => choicePerformerRole(1)}><p>????????????</p></button>
                                    <button type='button' className="special" onClick={() => choicePerformerRole(2)}><p>???????????? ??????????</p></button>
                                    <button type='button' className="production" onClick={() => choicePerformerRole(3)}><p>????????????????</p></button>
                                    <button type='button' onClick={() => {
                                        navigate('/registration', { state: 'back' });
                                    }}>??????????</button>
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
                                            <h1>???????????? <span>{
                                                (directionPerformer === 'model' && step >= 1 && step <= 2 && '????????????????')
                                                ||
                                                (directionPerformer === 'model' && step >= 3 && step <= 5 && '?????????????? ????????????')
                                                ||
                                                (directionPerformer === 'model' && step >= 6 && step <= 9 && '????????????????????????????')
                                                ||
                                                (directionPerformer === 'special' && step >= 1 && step <= 2 && '????????????????')
                                                ||
                                                (directionPerformer === 'special' && step >= 3 && step <= 5 && '?????????????? ????????????')
                                                ||
                                                (directionPerformer === 'special' && step >= 6 && step <= 8 && '????????????????????????????')
                                                ||
                                                (directionPerformer === 'production' && step >= 1 && step <= 2 && '????????????????')
                                                ||
                                                (directionPerformer === 'production' && step === 3 && '?????????????? ????????????')
                                                ||
                                                (directionPerformer === 'production' && step >= 4 && step <= 7 && '????????????????????????????')
                                            }</span></h1>
                                        </div>
                                        <div className='customer_content'>
                                            {
                                                step === 1 &&
                                                <>
                                                    <label>
                                                        ??????
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='???????? ??????'
                                                            autoFocus
                                                            {...register('name')}
                                                        />
                                                    </label>
                                                    <label>
                                                        ??????????????
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='???????? ??????????????'
                                                            {...register('surname')}
                                                        />
                                                    </label>
                                                    <label>
                                                        ????????????????
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='???????? ????????????????'
                                                            {...register('middle_name')}
                                                        />
                                                    </label>
                                                    <label className='date_label'>
                                                        ???????? ????????????????
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
                                                        ??????????
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='????????????'
                                                            autoFocus
                                                            {...register('city')}
                                                        />
                                                    </label>
                                                    <label>
                                                        ???????? ??????????
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='zalmary248@yandex.ru'
                                                            {...register('email')}
                                                        />
                                                    </label>
                                                    <label className='select__wrapper'>
                                                        ?????? ??????
                                                        <select {...register('gender', {
                                                            valueAsNumber: true,
                                                        })}>
                                                            <option value={1}>??????????????</option>
                                                            <option value={0}>??????????????</option>
                                                        </select>
                                                    </label>
                                                    {/* <label>
                                                        ???????? ??????????
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
                                                                ???????????????? ?????????????????? (??????????????/??????????)
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
                                                                        ????
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
                                                                        ??????
                                                                    </label>
                                                                </div>
                                                            </label>
                                                            <label className='radio_input'>
                                                                ?????????????? ??????????
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
                                                                        ????
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
                                                                        ??????
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
                                                                    <option value={null}>?????????? ????????</option>
                                                                    {userProperties.FaceForm.map(form => (
                                                                        <option value={form.id} key={form.id}>{form.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_eye_color', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>???????? ????????</option>
                                                                    {userProperties.EyeColor.map(color => (
                                                                        <option value={color.id} key={color.id}>{color.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_eye_shape', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>???????????? ????????</option>
                                                                    {userProperties.EyeShape.map(shape => (
                                                                        <option value={shape.name} key={shape.id}>{shape.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_skin_color', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>???????? ????????</option>
                                                                    {userProperties.SkinColor.map(color => (
                                                                        <option value={color.id} key={color.id}>{color.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <label className='select__wrapper'>
                                                            ?????????????? ????????????????????????????
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
                                                                    <option value={null}>?????????? ????????</option>
                                                                    {userProperties.oseShape.map(shape => (
                                                                        <option value={shape.id} key={shape.id}>{shape.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_lips', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>????????</option>
                                                                    {userProperties.Lips.map(lips => (
                                                                        <option value={lips.name} key={lips.id}>{lips.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_hair_color', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>???????? ??????????</option>
                                                                    {userProperties.HairColor.map(color => (
                                                                        <option value={color.id} key={color.id}>{color.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('hair_length', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={0}>?????????? ??????????</option>
                                                                    <option value={10}>???????????? 10 ????</option>
                                                                    <option value={15}>10-15 ????</option>
                                                                    <option value={25}>15-25 ????</option>
                                                                    <option value={35}>25-35 ????</option>
                                                                    <option value={40}>35-40 ????</option>
                                                                    <option value={55}>45-55 ????</option>
                                                                    <option value={60}>55-60 ????</option>
                                                                    <option value={70}>60 ???? ?? ????????</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <label className='select__wrapper'>
                                                            ????????????????????????
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
                                                            ?????????????? ????????????????????????????
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
                                                            ?????????????????????????? ??????????????????????
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
                                                            ?????????????? ?????????????????????????? ????????????????
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
                                                            ?????????????? ????????????????????
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
                                                                    <option value={null}>?????????????? ??????????</option>
                                                                    {userProperties.Haircut.map(item => (
                                                                        <option value={item.id} key={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_height', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>????????, ????</option>
                                                                    {userProperties.Height.map(item => (
                                                                        <option value={item.id} key={item.id}>{item.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_clothes_size', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>???????????? ????????????</option>
                                                                    {userProperties.ClothesSize.map(size => (
                                                                        <option value={size.id} key={size.id}>{size.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <select {...register('ui_shoe_size', {
                                                                    valueAsNumber: true,
                                                                })}>
                                                                    <option value={null}>???????????? ??????????</option>
                                                                    {userProperties.ShoeSize.map(size => (
                                                                        <option value={size.id} key={size.id}>{size.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <label className='select__wrapper'>
                                                            ????????????????????????
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
                                                                    <option value={null}>?????????? ??????????, ????</option>
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
                                                                    <option value={null}>?????????? ??????????, ????</option>
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
                                                                    <option value={null}>????????, ????</option>
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
                                                                    <option value={null}>?????????? ??????????</option>
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
                                                            ?????????????????????? ????????
                                                            <div>
                                                                <div>
                                                                    <select disabled={languageNone ? true : false}>
                                                                        {/* // {...register('level_language')} */}
                                                                        <option>??????????????</option>
                                                                        <option>??????????????</option>
                                                                        <option>??????????????????????</option>
                                                                        <option>?????????????????? ????????????????</option>
                                                                    </select>
                                                                    <select disabled={languageNone ? true : false} {...register('ui_languages')}>
                                                                        <option>????????????????????</option>
                                                                        <option>??????????????????</option>
                                                                        <option>??????????????????????</option>
                                                                        <option>????????????????</option>
                                                                        <option>????????????????</option>
                                                                        <option>??????????????????????</option>
                                                                        <option>??????????????????</option>
                                                                        <option>????????????????</option>
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
                                                                    ??????
                                                                </label>
                                                            </div>
                                                        </label>
                                                        <label className='radio_input'>
                                                            ?????????????? ???????????? ????????????????
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
                                                                    ????
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
                                                                    ??????
                                                                </label>
                                                            </div>
                                                        </label>
                                                        <label className='select__wrapper'>
                                                            ???????? ??????????????????????
                                                            <div>
                                                                <select {...register('ui_nationality')}>
                                                                    <option>???????????????????? ??????????????????</option>
                                                                    <option>???????????????????? ????????????????</option>
                                                                    <option>??????????????</option>
                                                                    <option>?????????????????????????????? ????????????????????</option>
                                                                    <option>???????????????????? ??????????????</option>
                                                                    <option>???????????????????? ??????????????????</option>
                                                                    <option>???????????????????? ????????????????????</option>
                                                                    <option>???????????????????? ??????????????</option>
                                                                    <option>???????????????????? ??????????????????????</option>
                                                                    <option>???????????????????? ????????????????????</option>
                                                                    <option>????????????????????????</option>
                                                                </select>
                                                            </div>
                                                        </label>
                                                        <label className='radio_input'>
                                                            ???????????? ?? ???????????????????????????
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
                                                                    ????
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
                                                                    ??????
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
                                                                ?????????????????????????? ??????????????????????
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
                                                                ?????????????? ?????????????????????????? ????????????????
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
                                                                ?????????????? ????????????????????
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
                                                                ?????????????????????????? ??????????????????????
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
                                                                ?????????????? ?????????????????????????? ????????????????
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
                                                                ?????????????? ????????????????????
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
                                                                ???????????????????????? ????????????????????
                                                                <input
                                                                    type='text'
                                                                    className='phone_input'
                                                                    placeholder='???????????? ???????????? ????????????'
                                                                    {...register('ui_creative_activity')}
                                                                />
                                                            </label>
                                                            <label>
                                                                ???????????????????????????? ????????????
                                                                <input
                                                                    type='text'
                                                                    className='phone_input'
                                                                    placeholder='???????????? ?????????? ????????????????'
                                                                    {...register('additional_skills')}
                                                                />
                                                            </label>
                                                        </>)
                                                    ||
                                                    (directionPerformer === 'production' &&
                                                        <>
                                                            <label>
                                                                ???????? ????????????
                                                                <input
                                                                    type='text'
                                                                    className='phone_input'
                                                                    placeholder='???????? ???????????????????????????????? ????????????'
                                                                    {...register('professional_skills')}
                                                                />
                                                            </label>
                                                            <label>
                                                                ???????????????????????????? ????????????
                                                                <input
                                                                    type='text'
                                                                    className='phone_input'
                                                                    placeholder='???????????? ?????????? ????????????????'
                                                                    {...register('additional_skills')}
                                                                />
                                                            </label>
                                                            <label className='add_media'>
                                                                ???????? ??????????????????
                                                                <div>
                                                                    <label>
                                                                        ???????????????? ????????
                                                                        <input type='file' name='photo' accept='image/*' onChange={handleAddMedia} />
                                                                    </label>
                                                                    {photoArray.map((photo, i) => (
                                                                        <img src={`https://${photo}`} className='animate__animated animate__fadeIn' alt='add-pic' key={i} />
                                                                    ))}
                                                                </div>
                                                                <div>
                                                                    <label>
                                                                        ???????????????? ?????????????????????? ????????
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
                                                                        ???????????????? ??????????
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
                                                            ?????????????????????? ????????
                                                            <div>
                                                                <div>
                                                                    <select disabled={languageNone ? true : false}>
                                                                        <option>??????????????</option>
                                                                        <option>??????????????</option>
                                                                        <option>??????????????????????</option>
                                                                        <option>?????????????????? ????????????????</option>
                                                                    </select>
                                                                    <select disabled={languageNone ? true : false} {...register('ui_languages')}>
                                                                        <option>????????????????????</option>
                                                                        <option>??????????????????</option>
                                                                        <option>??????????????????????</option>
                                                                        <option>????????????????</option>
                                                                        <option>????????????????</option>
                                                                        <option>??????????????????????</option>
                                                                        <option>??????????????????</option>
                                                                        <option>????????????????</option>
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
                                                                    ??????
                                                                </label>
                                                            </div>
                                                        </label>
                                                        <label className='radio_input'>
                                                            ?????????????? ???????????? ????????????????
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
                                                                    ????
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
                                                                    ??????
                                                                </label>
                                                            </div>
                                                        </label>
                                                        <label className='select__wrapper'>
                                                            ???????? ??????????????????????
                                                            <div>
                                                                <select {...register('ui_nationality')}>
                                                                    <option>???????????????????? ??????????????????</option>
                                                                    <option>???????????????????? ????????????????</option>
                                                                    <option>??????????????</option>
                                                                    <option>?????????????????????????????? ????????????????????</option>
                                                                    <option>???????????????????? ??????????????</option>
                                                                    <option>???????????????????? ??????????????????</option>
                                                                    <option>???????????????????? ????????????????????</option>
                                                                    <option>???????????????????? ??????????????</option>
                                                                    <option>???????????????????? ??????????????????????</option>
                                                                    <option>???????????????????? ????????????????????</option>
                                                                    <option>????????????????????????</option>
                                                                </select>
                                                            </div>
                                                        </label>
                                                        <label className='radio_input'>
                                                            ???????????? ?? ???????????????????????????
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
                                                                    ????
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
                                                                    ??????
                                                                </label>
                                                            </div>
                                                        </label>
                                                    </>
                                                    :
                                                    <section className='soft_skills'>
                                                        <section className='personal_quality'>
                                                            <p>???????????????? ???????????????? ????????????????</p>
                                                            <div>
                                                                <div>
                                                                    <input type='checkbox' id='activity' value='????????????????????' {...register('ui_basic_qualities')} />
                                                                    <label htmlFor='activity'>
                                                                        ????????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='sociability' value='????????????????????????????????????' {...register('ui_basic_qualities')} />
                                                                    <label htmlFor='sociability'>
                                                                        ????????????????????????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='friendliness' value='??????????????????????????' {...register('ui_basic_qualities')} />
                                                                    <label htmlFor='friendliness'>
                                                                        ??????????????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='punctuality' value='????????????????????????????' {...register('ui_basic_qualities')} />
                                                                    <label htmlFor='punctuality'>
                                                                        ????????????????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='responsibility' value='??????????????????????????????' {...register('ui_basic_qualities')} />
                                                                    <label htmlFor='responsibility'>
                                                                        ??????????????????????????????
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </section>
                                                        <section className='character_traits'>
                                                            <p>?????????????????????????? ?????????? ??????????????????</p>
                                                            <div>
                                                                <div>
                                                                    <input type='checkbox' id='impulsive' value='????????????????????????' {...register('ui_character_traits')} />
                                                                    <label htmlFor='impulsive'>
                                                                        ??????????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='aggressive' value='??????????????????????' {...register('ui_character_traits')} />
                                                                    <label htmlFor='aggressive'>
                                                                        ??????????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='cheerful' value='????????????????????????????' {...register('ui_character_traits')} />
                                                                    <label htmlFor='cheerful'>
                                                                        ????????????????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='closed' value='??????????????????' {...register('ui_character_traits')} />
                                                                    <label htmlFor='closed'>
                                                                        ??????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='calm' value='??????????????????' {...register('ui_character_traits')} />
                                                                    <label htmlFor='calm'>
                                                                        ??????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='indecisive' value='??????????????????????????' {...register('ui_character_traits')} />
                                                                    <label htmlFor='indecisive'>
                                                                        ??????????????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='decisive' value='??????????????????????' {...register('ui_character_traits')} />
                                                                    <label htmlFor='decisive'>
                                                                        ??????????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='unemotional' value='????????????????????????????????' {...register('ui_character_traits')} />
                                                                    <label htmlFor='unemotional'>
                                                                        ????????????????????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='responsive' value='????????????????????' {...register('ui_character_traits')} />
                                                                    <label htmlFor='responsive'>
                                                                        ????????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='hot-tempered' value='??????????????????????' {...register('ui_character_traits')} />
                                                                    <label htmlFor='hot-tempered'>
                                                                        ??????????????????????
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
                                                                ???????????????????????? ????????????????????
                                                                <input
                                                                    type='text'
                                                                    className='phone_input'
                                                                    placeholder='???????????? ???????????? ????????????'
                                                                    {...register('ui_creative_activity')}
                                                                />
                                                            </label>
                                                            <label>
                                                                ???????????????????????????? ????????????
                                                                <input
                                                                    type='text'
                                                                    className='phone_input'
                                                                    placeholder='???????????? ?????????? ????????????????'
                                                                    {...register('additional_skills')}
                                                                />
                                                            </label>
                                                            <section className='soft_skills'>
                                                                <section className='hobbies'>
                                                                    <p>??????????</p>
                                                                    <div>
                                                                        <div>
                                                                            <input type='checkbox' value='??????????' id='dance' {...register('ui_hobby')} />
                                                                            <label htmlFor='dance'>
                                                                                ??????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='??????????' id='sport' {...register('ui_hobby')} />
                                                                            <label htmlFor='sport'>
                                                                                ??????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='??????????????' id='blogger' {...register('ui_hobby')} />
                                                                            <label htmlFor='blogger'>
                                                                                ??????????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='??????????????????' id='cooking' {...register('ui_hobby')} />
                                                                            <label htmlFor='cooking'>
                                                                                ??????????????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='????????????????/??????????????' id='visagiste' {...register('ui_hobby')} />
                                                                            <label htmlFor='visagiste'>
                                                                                ????????????????/??????????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='???????????????????????? ????????????????????' id='amateur-photo' {...register('ui_hobby')} />
                                                                            <label htmlFor='amateur-photo'>
                                                                                ???????????????????????? ????????????????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='???????????????????????? ????????????????' id='amateur-painting' {...register('ui_hobby')} />
                                                                            <label htmlFor='amateur-painting'>
                                                                                ???????????????????????? ????????????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='???????????????????????? ????????' id='games' {...register('ui_hobby')} />
                                                                            <label htmlFor='games'>
                                                                                ???????????????????????? ????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='??????????????????' id='needlework' {...register('ui_hobby')} />
                                                                            <label htmlFor='needlework'>
                                                                                ??????????????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' value='??????????' id='vocal' {...register('ui_hobby')} />
                                                                            <label htmlFor='vocal'>
                                                                                ??????????
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
                                                                <p>???????????????? ???????????????? ????????????????</p>
                                                                <div>
                                                                    <div>
                                                                        <input type='checkbox' id='activity' value='????????????????????' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='activity'>
                                                                            ????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='sociability' value='????????????????????????????????????' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='sociability'>
                                                                            ????????????????????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='friendliness' value='??????????????????????????' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='friendliness'>
                                                                            ??????????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='punctuality' value='????????????????????????????' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='punctuality'>
                                                                            ????????????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='responsibility' value='??????????????????????????????' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='responsibility'>
                                                                            ??????????????????????????????
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            <section className='character_traits'>
                                                                <p>?????????????????????????? ?????????? ??????????????????</p>
                                                                <div>
                                                                    <div>
                                                                        <input type='checkbox' id='impulsive' value='????????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='impulsive'>
                                                                            ??????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='aggressive' value='??????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='aggressive'>
                                                                            ??????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='cheerful' value='????????????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='cheerful'>
                                                                            ????????????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='closed' value='??????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='closed'>
                                                                            ??????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='calm' value='??????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='calm'>
                                                                            ??????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='indecisive' value='??????????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='indecisive'>
                                                                            ??????????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='decisive' value='??????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='decisive'>
                                                                            ??????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='unemotional' value='????????????????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='unemotional'>
                                                                            ????????????????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='responsive' value='????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='responsive'>
                                                                            ????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='hot-tempered' value='??????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='hot-tempered'>
                                                                            ??????????????????????
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
                                                                    <p>??????????</p>
                                                                    <div>
                                                                        <div>
                                                                            <input type='checkbox' id='activity' value='??????????????????????????' {...register('ui_characteristic')} />
                                                                            <label htmlFor='activity'>
                                                                                ??????????????????????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' id='sociability' value='??????????????' {...register('ui_characteristic')} />
                                                                            <label htmlFor='sociability'>
                                                                                ??????????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' id='friendliness' value='????????????????????????' {...register('ui_characteristic')} />
                                                                            <label htmlFor='friendliness'>
                                                                                ????????????????????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' id='punctuality' value='????????????????????????????????' {...register('ui_characteristic')} />
                                                                            <label htmlFor='punctuality'>
                                                                                ????????????????????????????????
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </section>
                                                            </section>
                                                            <label className='select__wrapper'>
                                                                ?????????????????????? ????????????????????
                                                                <div>
                                                                    <select {...register('ui_sexual_orientation')}>
                                                                        {userProperties.SexualOrientation.map(item => (
                                                                            <option value={item.id} key={item.id}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </label>
                                                            <label>
                                                                ???????????? ???? ??????????????
                                                                <input
                                                                    type='text'
                                                                    className='phone_input'
                                                                    placeholder='@zalnova2016'
                                                                    {...register('social_network')}
                                                                />
                                                            </label>
                                                            <label className='add_media'>
                                                                ???????? ??????????????????
                                                                <div>
                                                                    <label>
                                                                        ???????????????? ????????
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
                                                                <p>???????????????? ???????????????? ????????????????</p>
                                                                <div>
                                                                    <div>
                                                                        <input type='checkbox' id='activity' value='????????????????????' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='activity'>
                                                                            ????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='sociability' value='????????????????????????????????????' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='sociability'>
                                                                            ????????????????????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='friendliness' value='??????????????????????????' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='friendliness'>
                                                                            ??????????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='punctuality' value='????????????????????????????' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='punctuality'>
                                                                            ????????????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='responsibility' value='??????????????????????????????' {...register('ui_basic_qualities')} />
                                                                        <label htmlFor='responsibility'>
                                                                            ??????????????????????????????
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            <section className='character_traits'>
                                                                <p>?????????????????????????? ?????????? ??????????????????</p>
                                                                <div>
                                                                    <div>
                                                                        <input type='checkbox' id='impulsive' value='????????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='impulsive'>
                                                                            ??????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='aggressive' value='??????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='aggressive'>
                                                                            ??????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='cheerful' value='????????????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='cheerful'>
                                                                            ????????????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='closed' value='??????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='closed'>
                                                                            ??????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='calm' value='??????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='calm'>
                                                                            ??????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='indecisive' value='??????????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='indecisive'>
                                                                            ??????????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='decisive' value='??????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='decisive'>
                                                                            ??????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='unemotional' value='????????????????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='unemotional'>
                                                                            ????????????????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='responsive' value='????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='responsive'>
                                                                            ????????????????????
                                                                        </label>
                                                                    </div>
                                                                    <div>
                                                                        <input type='checkbox' id='hot-tempered' value='??????????????????????' {...register('ui_character_traits')} />
                                                                        <label htmlFor='hot-tempered'>
                                                                            ??????????????????????
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
                                                                    <p>??????????</p>
                                                                    <div>
                                                                        <div>
                                                                            <input type='checkbox' id='activity' value='??????????????????????????' {...register('ui_characteristic')} />
                                                                            <label htmlFor='activity'>
                                                                                ??????????????????????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' id='sociability' value='??????????????' {...register('ui_characteristic')} />
                                                                            <label htmlFor='sociability'>
                                                                                ??????????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' id='friendliness' value='????????????????????????' {...register('ui_characteristic')} />
                                                                            <label htmlFor='friendliness'>
                                                                                ????????????????????????
                                                                            </label>
                                                                        </div>
                                                                        <div>
                                                                            <input type='checkbox' id='punctuality' value='????????????????????????????????' {...register('ui_characteristic')} />
                                                                            <label htmlFor='punctuality'>
                                                                                ????????????????????????????????
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </section>
                                                            </section>
                                                            <label className='select__wrapper'>
                                                                ?????????????????????? ????????????????????
                                                                <div>
                                                                    <select {...register('ui_sexual_orientation')}>
                                                                        {userProperties.SexualOrientation.map(item => (
                                                                            <option value={item.id} key={item.id}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </label>
                                                            <label>
                                                                ???????????? ???? ??????????????
                                                                <input
                                                                    type='text'
                                                                    className='phone_input'
                                                                    placeholder='@zalnova2016'
                                                                    {...register('social_network')}
                                                                />
                                                            </label>
                                                            <label className='add_media'>
                                                                ???????? ??????????????????
                                                                <div>
                                                                    <label>
                                                                        ???????????????? ????????
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
                                                            <p>??????????</p>
                                                            <div>
                                                                <div>
                                                                    <input type='checkbox' id='activity' value='??????????????????????????' {...register('ui_characteristic')} />
                                                                    <label htmlFor='activity'>
                                                                        ??????????????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='sociability' value='??????????????' {...register('ui_characteristic')} />
                                                                    <label htmlFor='sociability'>
                                                                        ??????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='friendliness' value='????????????????????????' {...register('ui_characteristic')} />
                                                                    <label htmlFor='friendliness'>
                                                                        ????????????????????????
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <input type='checkbox' id='punctuality' value='????????????????????????????????' {...register('ui_characteristic')} />
                                                                    <label htmlFor='punctuality'>
                                                                        ????????????????????????????????
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </section>
                                                    <label className='radio_input'>
                                                        ???????????? ???? ?? ?????????????? ?????????????? ???????????
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
                                                                ????
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
                                                                ??????
                                                            </label>
                                                        </div>
                                                    </label>
                                                    <label className='select__wrapper'>
                                                        ?????????????????????? ????????????????????
                                                        <div>
                                                            <select {...register('ui_sexual_orientation')}>
                                                                {userProperties.SexualOrientation.map(item => (
                                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </label>
                                                    <label>
                                                        ???????????? ???? ??????????????
                                                        <input
                                                            type='text'
                                                            className='phone_input'
                                                            placeholder='@zalnova2016'
                                                            {...register('social_network')}
                                                        />
                                                    </label>
                                                    <label className='add_media'>
                                                        ???????? ??????????????????
                                                        <div>
                                                            <label>
                                                                ???????????????? ????????
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
                                            <input className='next-step' type='button' value='??????????' onClick={handlePrevStepClick} />
                                            <input className='next-step' type='submit' value='??????????' />
                                        </div>
                                    </section>
                                    :
                                    <section className='questionnaire__wrapper'>
                                        <h1>???????????? ?????????????? ??????????????</h1>
                                        <div className='success-notification animate__animated animate__fadeIn'>
                                            <div className='icon'>
                                                <Lottie animationData={applyIcon} />
                                            </div>
                                            <p>???????????? ???????????? ?? ???????????????????? ???????????????? ?? ????????????????</p>
                                        </div>
                                        <button onClick={() => setStep('success')}>?? ??????????????????</button>
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