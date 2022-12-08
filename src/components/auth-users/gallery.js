import React from "react";
import { Link, Outlet } from "react-router-dom";

class Gallery extends React.Component {
    componentDidMount() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    render() {
        const { urlLocation } = this.props;
        const currentUrl = urlLocation.split('/').pop();

        return (
            <section className='gallery__wrapper'>
                <div className='user_title'>
                    <h1>Галерея</h1>
                    <button className='hamburger_btn'><span></span><span></span></button>
                </div>
                <div className='gallery__navigation'>
                    <nav>
                        <Link to='/gallery/photo' className={`nav_btn ${currentUrl === 'photo' ? 'active' : ''}`}>Фотографии</Link>
                        <Link to='/gallery/video' className={`nav_btn ${currentUrl === 'video' ? 'active' : ''}`}>Видео</Link>
                        <Link to='/gallery/audio' className={`nav_btn ${currentUrl === 'audio' ? 'active' : ''}`}>Аудио</Link>
                    </nav>
                    <div>
                        <button>
                            Добавить {
                                (currentUrl === 'photo' && 'фотографии')
                                ||
                                (currentUrl === 'video' && 'видео')
                                ||
                                (currentUrl === 'audio' && 'аудио')
                            }
                        </button>
                        {currentUrl !== 'audio' && <button>Создать альбом</button>}
                    </div>
                </div>
                <Outlet />
            </section>
        )
    }
}

export default Gallery;