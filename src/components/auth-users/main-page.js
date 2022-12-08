import React from "react";
import Stories from 'react-insta-stories';
import { Link } from "react-router-dom";
import Slider from "react-slick";
import MainPageFilter from "./components/main-page-filter";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStories: null,
            genderFilter: 'Все',
            currentFeed: 'people'
        }
    }

    handleClickOnStories = (id) => {
        if (id) {
            this.setState({ currentStories: id });
            this.props.setChangesStyle('open_filter');
            document.body.style.overflow = 'hidden';
        } else {
            this.setState({ currentStories: id });
            this.props.setChangesStyle('open');
            document.body.style.overflow = 'auto';
            setTimeout(() => (
                this.props.setChangesStyle('')
            ), 500)
        }
    }

    render() {
        const { currentStories, genderFilter, currentFeed } = this.state;
        const { innerWidth, users, castings, stateSearchFilter, setStateAsideFilter, setStateSearchFilter } = this.props;

        const settings = {
            arrows: true,
            variableWidth: true,
            slidesToShow: 3,
            speed: 500
        };

        const settingsBar = {
            arrows: true,
            variableWidth: true,
            slidesToShow: 6,
            infinite: false,
            speed: 500
        }

        return (
            <section className='auth_user__main-page'>
                <div className='stories_bar'>
                    <Slider {...settingsBar}>
                        {users.map((user, i) => (
                            user.stories && <div className='stories_block' onClick={() => this.handleClickOnStories(user.id)} key={i}>
                                <img src={user.img} alt='stories-logo' />
                            </div>
                        ))}
                    </Slider>
                </div>
                {currentStories &&
                    <div className='stories__wrapper'>
                        <Slider {...settings} initialSlide={currentStories}>
                            {users.map((user, i) => (
                                user.stories && user.id === currentStories &&
                                <div key={i}>
                                    <Stories
                                        className='stories_container'
                                        stories={user.stories}
                                        defaultInterval={1000}
                                        width={432}
                                        height={768}
                                        keyboardNavigation
                                        isPaused
                                        onAllStoriesEnd={() => {
                                            this.handleClickOnStories(currentStories + 1)
                                        }}
                                    />
                                    <Link to={`/profile/${user.id}`} className='stories__title'><img src={user.img} alt='user-logo' /><p>{user.name}</p></Link>
                                </div>
                            ))}
                        </Slider>
                        <button className='close_stories' onClick={() => this.handleClickOnStories(null)}>+</button>
                    </div>
                }
                <div className='filter_bar'>
                    <div className='filter'>
                        <div className='categories search_field'>
                            <button className={currentFeed === 'people' ? 'active' : ''} onClick={() => this.setState({ currentFeed: 'people' })}>ЛЮДИ</button>
                            <button className={currentFeed === 'castings' ? 'active' : ''} onClick={() => this.setState({ currentFeed: 'castings' })}>КАСТИНГИ</button>
                            {innerWidth <= 550 &&
                                <label className='search'>
                                    <input type='text' placeholder='ПОИСК' />
                                    <button onClick={setStateSearchFilter}><img src='/images/icons/search-filter-icon.svg' alt='search-filter' /></button>
                                </label>
                            }
                        </div>
                        {innerWidth > 550 &&
                            <div className='gender'>
                                <button className={genderFilter === 'Женский' ? 'active' : ''} onClick={() => this.setState({ genderFilter: 'Женский' })}>ДЕВУШКИ</button>
                                <button className={genderFilter === 'Мужской' ? 'active' : ''} onClick={() => this.setState({ genderFilter: 'Мужской' })}>МУЖЧИНЫ</button>
                                <button className={genderFilter === 'Все' ? 'active' : ''} onClick={() => this.setState({ genderFilter: 'Все' })}>ВСЕ</button>
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
                                <button className={genderFilter === 'Женский' ? 'active' : ''} onClick={() => this.setState({ genderFilter: 'Женский' })}>ДЕВУШКИ</button>
                                <button className={genderFilter === 'Мужской' ? 'active' : ''} onClick={() => this.setState({ genderFilter: 'Мужской' })}>МУЖЧИНЫ</button>
                                <button className={genderFilter === 'Все' ? 'active' : ''} onClick={() => this.setState({ genderFilter: 'Все' })}>ВСЕ</button>
                            </div>
                        }
                        <button className='hamburger_btn' onClick={() => {
                            document.body.style.overflow = 'hidden'
                            setStateAsideFilter(true);
                        }}><span></span><span></span></button>
                    </div>
                </div>
                {stateSearchFilter && <MainPageFilter setStateSearchFilter={setStateSearchFilter} currentFeed={currentFeed} />}
                <section className='main-page__content'>
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
                        castings.map(casting => (
                            <div className='casting_block' key={casting.id}>
                                <div className='casting_image'>
                                    <img src={casting.main_pic} alt='casting-logo' />
                                    <img className='brand_logo' src={casting.brand_logo} alt='brand-logo' />
                                </div>
                                <div className='casting_desc'>
                                    <div className='flex__wrapper'>
                                        <div>
                                            <p>{casting.brand}</p>
                                            <p>{casting.date}</p>
                                        </div>
                                        <div>
                                            <p>
                                                {casting.start} - {casting.end}
                                            </p>
                                            <p>{casting.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ₽</p>
                                        </div>
                                    </div>
                                    <p>{casting.title}</p>
                                    <Link to={`/castings/${casting.id}`}>Подробнее</Link>
                                </div>
                            </div>
                        ))
                    }
                </section>
            </section >
        )
    }
}

export default MainPage;