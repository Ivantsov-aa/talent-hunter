import React from "react"

class GalleryVideo extends React.Component {
    render() {
        return (
            <section className='gallery__container'>
                <section className='gallery__category'>
                    <h3>АЛЬБОМЫ</h3>
                    <section className='grid__container'>
                        <section>
                            <div className='video_preview'>
                                <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                                <img className='play_icon' src='/images/icons/play-icon.svg' alt='play-icon' />
                            </div>
                            <div className='gallery__footer-card'>
                                <p>Франция 2019</p>
                                <button><img src='/images/icons/edit-icon.svg' alt='edit-icon' /></button>
                            </div>
                        </section>
                        <section>
                            <div className='video_preview'>
                                <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                                <img className='play_icon' src='/images/icons/play-icon.svg' alt='play-icon' />
                            </div>
                            <div className='gallery__footer-card'>
                                <p>Франция 2020</p>
                                <button><img src='/images/icons/edit-icon.svg' alt='edit-icon' /></button>
                            </div>
                        </section>
                        <section>
                            <div className='video_preview'>
                                <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                                <img className='play_icon' src='/images/icons/play-icon.svg' alt='play-icon' />
                            </div>
                            <div className='gallery__footer-card'>
                                <p>Франция 2022</p>
                                <button><img src='/images/icons/edit-icon.svg' alt='edit-icon' /></button>
                            </div>
                        </section>
                    </section>
                </section>
                <section className='gallery__category'>
                    <h3>ОТМЕТКИ НА ВИДЕО</h3>
                    <section className='grid__container'>
                        <section>
                            <div className='video_preview'>
                                <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                                <img className='play_icon' src='/images/icons/play-icon.svg' alt='play-icon' />
                            </div>
                            <div className='gallery__footer-card'>
                                <img src='/images/users/stefani.png' alt='user-logo' />
                                <p>@maruzal</p>
                                <button className='delete-btn'>Удалить</button>
                            </div>
                        </section>
                        <section>
                            <div className='video_preview'>
                                <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                                <img className='play_icon' src='/images/icons/play-icon.svg' alt='play-icon' />
                            </div>
                            <div className='gallery__footer-card'>
                                <img src='/images/users/paul.png' alt='user-logo' />
                                <p>@maruzal</p>
                                <button className='delete-btn'>Удалить</button>
                            </div>
                        </section>
                        <section>
                            <div className='video_preview'>
                                <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                                <img className='play_icon' src='/images/icons/play-icon.svg' alt='play-icon' />
                            </div>
                            <div className='gallery__footer-card'>
                                <img src='/images/users/marcus.png' alt='user-logo' />
                                <p>@maruzal</p>
                                <button className='delete-btn'>Удалить</button>
                            </div>
                        </section>
                    </section>
                </section>
                <section className='gallery__category'>
                    <h3>ВСЕ ВИДЕО</h3>
                    <section className='grid__container'>
                        <section>
                            <div className='video_preview'>
                                <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                                <img className='play_icon' src='/images/icons/play-icon.svg' alt='play-icon' />
                            </div>
                        </section>
                        <section>
                            <div className='video_preview'>
                                <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                                <img className='play_icon' src='/images/icons/play-icon.svg' alt='play-icon' />
                            </div>
                        </section>
                        <section>
                            <div className='video_preview'>
                                <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                                <img className='play_icon' src='/images/icons/play-icon.svg' alt='play-icon' />
                            </div>
                        </section>
                    </section>
                </section>
            </section>
        )
    }
}

export default GalleryVideo;