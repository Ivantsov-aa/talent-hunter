import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Slider from "react-slick";
import MainPageFilter from "./components/main-page-filter";

const MainPage = ({ url, token, role, innerWidth, users, stateSearchFilter, setStateAsideFilter, setStateSearchFilter }) => {
    const [genderFilter, setGenderFilter] = useState('Все');
    const [currentFeed, setCurrentFeed] = useState(role === 'Исполнитель' ? 'castings' : 'people');
    const [allCastings, setAllCastings] = useState([]);

    const loadCastings = async () => {
        await fetch(`${url}/getCastingsInfo/${token}`)
            .then(response => response.json())
            .then(result => {
                setAllCastings(result);
            })
    }

    useEffect(() => {
        loadCastings();
    }, [])

    // const settingsBar = {
    //     arrows: true,
    //     variableWidth: true,
    //     slidesToShow: 6,
    //     infinite: false,
    //     speed: 500
    // }

    return (
        <section className='auth_user__main-page'>
            {/* <div className='stories_bar'>
                    <Slider {...settingsBar}>
                        {users.map((user, i) => (
                            user.stories && <div className='stories_block' key={i}>
                                <img src={user.img} alt='stories-logo' />
                            </div>
                        ))}
                    </Slider>
                </div> */}
            <div className='filter_bar'>
                <div className='filter'>
                    <div className='categories search_field'>
                        <button className={currentFeed === 'people' ? 'active' : ''} onClick={() => setCurrentFeed('people')}>ЛЮДИ</button>
                        <button className={currentFeed === 'castings' ? 'active' : ''} onClick={() => setCurrentFeed('castings')}>КАСТИНГИ</button>
                        {innerWidth <= 550 &&
                            <label className='search'>
                                <input type='text' placeholder='ПОИСК' />
                                <button onClick={setStateSearchFilter}><img src='/images/icons/search-filter-icon.svg' alt='search-filter' /></button>
                            </label>
                        }
                    </div>
                    {innerWidth > 550 &&
                        <div className='gender'>
                            <button className={genderFilter === 'Женский' ? 'active' : ''} onClick={() => setGenderFilter('Женский')}>ДЕВУШКИ</button>
                            <button className={genderFilter === 'Мужской' ? 'active' : ''} onClick={() => setGenderFilter('Мужской')}>МУЖЧИНЫ</button>
                            <button className={genderFilter === 'Все' ? 'active' : ''} onClick={() => setGenderFilter('Все')}>ВСЕ</button>
                        </div>
                    }
                </div>
                <div className='search_field'>
                    <button><img src='/images/icons/favorite-filter-icon.svg' alt='favorite-icon' /></button>
                    {innerWidth > 550 &&
                        <label className='search'>
                            <input type='text' placeholder='ПОИСК' />
                            <button onClick={setStateSearchFilter}><img src='/images/icons/search-filter-icon.svg' alt='search-filter' /></button>
                        </label>
                    }
                    {innerWidth <= 550 &&
                        <div className='gender'>
                            <button className={genderFilter === 'Женский' ? 'active' : ''} onClick={() => setGenderFilter('Женский')}>ДЕВУШКИ</button>
                            <button className={genderFilter === 'Мужской' ? 'active' : ''} onClick={() => setGenderFilter('Мужской')}>МУЖЧИНЫ</button>
                            <button className={genderFilter === 'Все' ? 'active' : ''} onClick={() => setGenderFilter('Все')}>ВСЕ</button>
                        </div>
                    }
                    <button className='hamburger_btn' onClick={() => {
                        document.body.style.overflow = 'hidden'
                        setStateAsideFilter(true);
                    }}><span></span><span></span></button>
                </div>
            </div>
            {stateSearchFilter && <MainPageFilter setStateSearchFilter={setStateSearchFilter} currentFeed={currentFeed} />}
            <section className={`main-page__content casting__content ${currentFeed === 'people' ? 'peoples' : ''}`}>
                {currentFeed === 'people' ?
                    users.map((user, i) => (
                        user.gallery &&
                        (
                            (genderFilter === 'Все' &&
                                <div className='content_block' key={i}>
                                    <img src={user.gallery[0]} alt='preview-gallery' />
                                    <div className='stories_block'>
                                        <img src={user.img} alt='user-logo' />
                                    </div>
                                </div>
                            )
                            ||
                            (genderFilter === 'Мужской' && user.gender === genderFilter &&
                                <div className='content_block' key={i}>
                                    <img src={user.gallery[0]} alt='preview-gallery' />
                                    <div className='stories_block'>
                                        <img src={user.img} alt='user-logo' />
                                    </div>
                                </div>
                            )
                            ||
                            (genderFilter === 'Женский' && user.gender === genderFilter &&
                                <div className='content_block' key={i}>
                                    <img src={user.gallery[0]} alt='preview-gallery' />
                                    <div className='stories_block'>
                                        <img src={user.img} alt='user-logo' />
                                    </div>
                                </div>
                            )
                        )
                    ))
                    :
                    allCastings.sort((a, b) => b.id - a.id).map(casting => {
                        let media = casting.foto && casting.contact_name !== 'Владислав' && casting.foto.split(', ');
                        return casting.foto && casting.contact_name !== 'Владислав' && casting.casting_start && <div className='casting_block' key={casting.id}>
                            <div className='casting_image'>
                                <img src={`https://${media[0]}`} alt='casting-logo' />
                                {/* <img className='brand_logo' src={} alt='brand-logo' /> */}
                            </div>
                            <div className='casting_desc'>
                                {casting.title && <h4>{casting.title}</h4>}
                                <p>Начало мероприятия: {casting.event_start.split('-').reverse().join('.')}</p>
                                <p>Даты проведения кастинга:</p>
                                <p>
                                    {casting.casting_start.split('-').reverse().join('.')} - {casting.casting_end.split('-').reverse().join('.')}
                                </p>
                                <Link to={`/castings/${casting.id}`}>Подробнее</Link>
                            </div>
                        </div>
                    })
                }
            </section>
        </section >
    )
}

export default MainPage;