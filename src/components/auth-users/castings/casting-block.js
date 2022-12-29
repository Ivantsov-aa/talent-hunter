import React from "react";
import { Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import { useEffect, useState } from "react";

const CastingBlock = ({ url, token, authUser, setStateAsideFilter }) => {
    const [fullDesc, setFullDesc] = useState(false);
    const [chosenCasting, setChosenCasting] = useState(null);
    const [similarCasting, setSimilarCasting] = useState([]);
    const [videoState, setVideoState] = useState(false);

    const location = useLocation();
    const locationId = location.pathname.split('/').pop();

    const loadSimilarCastings = async () => {
        await fetch(`${url}/getCastingsInfo/${token}`)
            .then(response => response.json())
            .then(result => {
                let similar = result.filter(casting => casting.id !== +locationId);
                setSimilarCasting(similar);
            })
    }

    const handleVideoClick = (e) => {
        if (e.currentTarget.children[0].paused) {
            e.currentTarget.children[0].play()
            setVideoState(true);
        } else {
            e.currentTarget.children[0].pause()
            setVideoState(false);
        }
    }

    const loadChosenCasting = async () => {
        let id = encodeURIComponent(JSON.stringify({ id: +locationId }))
        await fetch(`${url}/getCastingInfo/${token}/${id}`)
            .then(response => response.json())
            .then(result => {
                setChosenCasting(result);
            })
    }

    useEffect(() => {
        loadSimilarCastings();
        loadChosenCasting();
        setFullDesc(false);
    }, [locationId])

    const settingsBar = {
        arrows: true,
        variableWidth: true,
        slidesToShow: 4,
        infinite: true,
        speed: 500
    }

    return (
        chosenCasting &&
        <section className='casting__wrapper'>
            <div className='user_title'>
                <h1>Кастинг</h1>
                <button className='hamburger_btn' onClick={setStateAsideFilter}><span></span><span></span></button>
            </div>
            <section className='grid__wrapper'>
                <section className='casting_title'>
                    <div className='casting_image'>
                        <img src={`https://${chosenCasting.foto.split(',')[0]}`} alt='casting-logo' />
                        <img className='brand_logo' src={`https://${authUser.foto}`} alt='brand-logo' />
                    </div>
                    <div className='info'>
                        <h3>{chosenCasting.title ? chosenCasting.title : 'Title'}</h3>
                        <p>Контактное лицо: {chosenCasting.contact_name}</p>
                        <p>Дата мероприятия: {chosenCasting.event_start.split('-').reverse().join('.')}</p>
                        <p>Город: {chosenCasting.city}</p>
                        <div className='buttons'>
                            <button>Редактировать</button>
                            <button>Отклики</button>
                        </div>
                    </div>
                </section>
                <section className={`casting_video ${!videoState ? 'paused' : ''}`} onClick={handleVideoClick}>
                    <video src='/video/video.mp4' muted />
                    {!videoState && <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 100 100"><g filter="url(#a)"><circle cx="50" cy="50" r="50" fill="#fff" fillOpacity=".6" /></g><path fill="#fff" stroke="url(#b)" d="M44.75 32.801 68.156 50 44.75 67.199V32.8Z" /><defs><linearGradient id="b" x1="57.75" x2="37.329" y1="41.727" y2="52.516" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient><filter id="a" width="120" height="120" x="-10" y="-10" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feGaussianBlur in="BackgroundImageFix" stdDeviation="5" /><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_428_4624" /><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_428_4624" result="shape" /></filter></defs></svg>}
                    {/* <p>{chosenCasting.task ? chosenCasting.task : 'Task'}</p> */}
                </section>
                <section className={`casting_desc ${fullDesc ? 'full' : ''}`}>
                    <div className='responses'>
                        <div>
                            <p>Отклики:</p>
                            <p>125 <span>+5</span></p>
                        </div>
                        <div>
                            <img src='/images/users/jiao.png' alt='user-logo' />
                            <img src='/images/users/jim.png' alt='user-logo' />
                            <img src='/images/users/marcus.png' alt='user-logo' />
                            <img src='/images/users/mary.png' alt='user-logo' />
                        </div>
                    </div>
                    <div className='full_desc'>
                        <h4>Общие требования:</h4>
                        <p>Количество моделей: {chosenCasting.num_models}</p>
                        <p>Представите{chosenCasting.ci_gender_id === 2 ? 'ли мужского' : chosenCasting.ci_gender_id === 1 ? 'льницы женского' : 'ли мужского и женского пола'} пола</p>
                        <p>Возраст {chosenCasting.age_min ? 'от ' + chosenCasting.age_min : ''} {chosenCasting.age_max ? 'до ' + chosenCasting.age_max : ''} лет</p>
                        {chosenCasting.ci_langiage_id && <p>Знание {chosenCasting.ci_langiage_id} языка на уровне {chosenCasting.ci_langiage_dop_id}</p>}
                        {chosenCasting.business_trips && <p>Также Вы должны быть готовы к командировкам.</p>}
                        {chosenCasting.ci_cosmetic_id && <p>Будет плюсом наличие {chosenCasting.ci_cosmetic_id}</p>}
                        {chosenCasting.ci_nationality_id && <p>Представители {chosenCasting.ci_nationality_id}</p>}
                        {chosenCasting.skills && <p>{chosenCasting.skills}</p>}
                        <h4>Общая информация:</h4>
                        {chosenCasting.service_cost && !chosenCasting.service_cost_min && !chosenCasting.service_cost_max && <p>Сумма оплаты составит: {chosenCasting.service_cost} ₽</p>}
                        {chosenCasting.service_cost_min ? <p>Сумма оплаты составит от {chosenCasting.service_cost_min} до {chosenCasting.service_cost_max} ₽</p> : ''}
                        <p>Начало кастинга: {chosenCasting.casting_start.split('-').reverse().join('.')}</p>
                        <p>Окончание кастинга: {chosenCasting.casting_end.split('-').reverse().join('.')}</p>
                        <p>Телефон для связи: <a href={`tel:${chosenCasting.contact_phone}`}>{chosenCasting.contact_phone}</a></p>
                        <p>Почта для связи: <a href={`tel:${chosenCasting.contact_email}`}>{chosenCasting.contact_email}</a></p>
                        {chosenCasting.information &&
                            <>
                                <h4>Дополнительная информация:</h4>
                                <p>{chosenCasting.information}</p>
                            </>
                        }
                    </div>
                    {!fullDesc && <button onClick={() => setFullDesc(true)}>Показать полностью</button>}
                </section>
                <section className={`casting__photos ${fullDesc ? 'stretch' : ''}`}>
                    {chosenCasting.foto.split(', ').slice(1).map((pic, i) => (
                        <img src={`https://${pic}`} alt='casting-pic' key={i} />
                    ))}
                </section>
            </section>
            <section className='similar_castings'>
                <h3>Похожие кастинги:</h3>
                <section className='flex__wrapper'>
                    {similarCasting.map((casting, i) => {
                        let media = casting.foto && casting.foto.split(', ')[0];
                        return casting.id !== chosenCasting.id && casting.contact_name !== 'Владислав' && casting.foto &&
                            <Link to={`/castings/${casting.id}`} key={i}>
                                <img src={`https://${media}`} alt='similar-casting' />
                                <p>{casting.title}</p>
                                <p>{casting.service_cost ? casting.service_cost.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') : '5 000'} ₽</p>
                            </Link>
                    })}
                </section>
            </section>
        </section >
    )
}

export default CastingBlock;