import React from "react"

const GalleryPhoto = ({ gallery }) => {
    return (
        <section className='gallery__container'>
            {/* <section className='gallery__category'>
                    <h3>АЛЬБОМЫ</h3>
                    <section className='grid__container'>
                        <section>
                            <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                            <div className='gallery__footer-card'>
                                <p>Франция 2019</p>
                                <button><img src='/images/icons/edit-icon.svg' alt='edit-icon' /></button>
                            </div>
                        </section>
                        <section>
                            <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                            <div className='gallery__footer-card'>
                                <p>Франция 2020</p>
                                <button><img src='/images/icons/edit-icon.svg' alt='edit-icon' /></button>
                            </div>
                        </section>
                        <section>
                            <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                            <div className='gallery__footer-card'>
                                <p>Франция 2022</p>
                                <button><img src='/images/icons/edit-icon.svg' alt='edit-icon' /></button>
                            </div>
                        </section>
                    </section>
                </section>
                <section className='gallery__category'>
                    <h3>ОТМЕТКИ НА ФОТОГРАФИЯХ</h3>
                    <section className='grid__container'>
                        <section>
                            <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                            <div className='gallery__footer-card'>
                                <div>
                                    <img src='/images/users/stefani.png' alt='user-logo' />
                                    <p>@maruzal</p>
                                </div>
                                <button className='delete-btn'>Удалить</button>
                            </div>
                        </section>
                        <section>
                            <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                            <div className='gallery__footer-card'>
                                <div>
                                    <img src='/images/users/paul.png' alt='user-logo' />
                                    <p>@maruzal</p>
                                </div>
                                <button className='delete-btn'>Удалить</button>
                            </div>
                        </section>
                        <section>
                            <img className='main_pic' src='/images/main/gallery-logo.png' alt='gallery-logo' />
                            <div className='gallery__footer-card'>
                                <div>
                                    <img src='/images/users/marcus.png' alt='user-logo' />
                                    <p>@maruzal</p>
                                </div>
                                <button className='delete-btn'>Удалить</button>
                            </div>
                        </section>
                    </section>
                </section> */}
            <section className='gallery__category'>
                <h3>ВСЕ ФОТОГРАФИИ</h3>
                <section className='grid__container'>
                    {gallery && gallery.split(', ').map((image, i) => {
                        let imgPath = image.split('...').join('/');
                        return image !== 'null' && <section key={i}>
                            <img className='main_pic' src={`https://${imgPath}`} alt='gallery-logo' />
                        </section>
                    })}
                </section>
            </section>
        </section>
    )
}

export default GalleryPhoto;