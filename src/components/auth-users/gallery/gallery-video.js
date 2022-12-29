import React, { useState } from "react"

const GalleryVideo = ({ gallery }) => {
    const [videoState, setVideoState] = useState('');

    const handleVideoClick = (e) => {
        if (e.currentTarget.children[0].paused) {
            e.currentTarget.children[0].play()
            setVideoState(e.currentTarget.dataset.id);
        } else {
            e.currentTarget.children[0].pause()
            setVideoState('');
        }
    }

    return (
        <section className='gallery__container'>
            {/* <section className='gallery__category'>
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
                </section> */}
            <section className='gallery__category'>
                <h3>ВСЕ ВИДЕО</h3>
                <section className='grid__container'>
                    {gallery && gallery.split(', ').map((video, i) => (
                        video !== 'null' && <section className={`casting_video ${+videoState !== i ? 'paused' : ''}`} data-id={i} onClick={handleVideoClick} key={i}>
                            <video src={`https://${video.split('...').join('/')}`} muted />
                            {+videoState !== i && <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 100 100"><g filter="url(#a)"><circle cx="50" cy="50" r="50" fill="#fff" fillOpacity=".6" /></g><path fill="#fff" stroke="url(#b)" d="M44.75 32.801 68.156 50 44.75 67.199V32.8Z" /><defs><linearGradient id="b" x1="57.75" x2="37.329" y1="41.727" y2="52.516" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient><filter id="a" width="120" height="120" x="-10" y="-10" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feGaussianBlur in="BackgroundImageFix" stdDeviation="5" /><feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_428_4624" /><feBlend in="SourceGraphic" in2="effect1_backgroundBlur_428_4624" result="shape" /></filter></defs></svg>}
                            {/* <p>{chosenCasting.task ? chosenCasting.task : 'Task'}</p> */}
                        </section>
                    ))}
                </section>
            </section>
        </section>
    )
}

export default GalleryVideo;