import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Upload } from "upload-js";

const Gallery = ({ url, token, authUser, setAuthUser, setGalleryLoading, urlLocation, setStateAsideFilter }) => {
    const [currentUrl, setCurrentUrl] = useState('')
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        setCurrentUrl(urlLocation.split('/').pop());
    }, [window, urlLocation, authUser])

    const handleUpload = async (e, path) => {
        const file = e.target.files[0];

        const upload = Upload({
            apiKey: "public_kW15b1GB389CPsY8LTuoYBAFX7BR"
        });

        let obj = {};
        for (let i in authUser) {
            if (i !== 'id' && i !== 'phone' && i !== 'role') {
                obj[i] = authUser[i];
            }
        }

        const { fileUrl, filePath } = await upload.uploadFile(
            file,
            {
                onBegin: ({ cancel }) => {
                },
                onProgress: ({ progress }) => {
                    // setLoadingProgress({ path: path, progress: progress });
                    setGalleryLoading({ value: progress, state: true });
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

        const fileUrlConvert = fileUrl.split('//')[1].replace(/\//gi, '...');

        if (path === 'photo') {
            if (authUser.role === 'Заказчик') {
                fetch(`${url}/setCustomerProperties/${token}/${encodeURIComponent(JSON.stringify({ phone: authUser.phone }))}/${encodeURIComponent(JSON.stringify({ ...obj, about_me: authUser.about_me || '', email: authUser.email || '', gallery_photos: fileUrlConvert + ', ' + authUser.gallery_photos, gallery_video: authUser.gallery_video || '', foto: authUser.foto.replace(/\//gi, '...') }))}`)
                    .then((resp) => {
                        if (resp.status === 200) {
                            setGalleryLoading({ value: 0, state: false });
                            setAuthUser({ ...authUser, gallery_photos: !authUser.gallery_photos ? fileUrl.split('//')[1] : fileUrl.split('//')[1] + ', ' + authUser.gallery_photos, gallery_video: authUser.gallery_video || '' })
                        }
                    })
            } else {
                fetch(`${url}/setusersinfo/${token}/${encodeURIComponent(JSON.stringify({ phone: authUser.phone }))}/${encodeURIComponent(JSON.stringify({ ...obj, about_me: authUser.about_me || '', email: authUser.email || '', gallery_photos: fileUrlConvert + ', ' + authUser.gallery_photos, gallery_video: authUser.gallery_video || '', foto: authUser.foto.replace(/\//gi, '...') }))}`)
                    .then((resp) => {
                        if (resp.status === 200) {
                            setGalleryLoading({ value: 0, state: false });
                            setAuthUser({ ...authUser, gallery_photos: !authUser.gallery_photos ? fileUrl.split('//')[1] : fileUrl.split('//')[1] + ', ' + authUser.gallery_photos, gallery_video: authUser.gallery_video || '' })
                        }
                    })
            }
        } else if (path === 'video') {
            if (authUser.role === 'Заказчик') {
                fetch(`${url}/setCustomerProperties/${token}/${encodeURIComponent(JSON.stringify({ phone: authUser.phone }))}/${encodeURIComponent(JSON.stringify({ ...obj, about_me: authUser.about_me || '', email: authUser.email || '', gallery_video: fileUrlConvert + ', ' + authUser.gallery_video, gallery_photos: authUser.gallery_photos || '', foto: authUser.foto.replace(/\//gi, '...') }))}`)
                    .then((resp) => {
                        if (resp.status === 200) {
                            setGalleryLoading({ value: 0, state: false });
                            setAuthUser({ ...authUser, gallery_video: !authUser.gallery_video ? fileUrl.split('//')[1] : fileUrl.split('//')[1] + ', ' + authUser.gallery_video, gallery_photos: authUser.gallery_photos || '' })
                        }
                    })
            } else {
                fetch(`${url}/setusersinfo/${token}/${encodeURIComponent(JSON.stringify({ phone: authUser.phone }))}/${encodeURIComponent(JSON.stringify({ ...obj, about_me: authUser.about_me || '', email: authUser.email || '', gallery_video: fileUrlConvert + ', ' + authUser.gallery_video, gallery_photos: authUser.gallery_photos || '', foto: authUser.foto.replace(/\//gi, '...') }))}`)
                    .then((resp) => {
                        if (resp.status === 200) {
                            setGalleryLoading({ value: 0, state: false });
                            setAuthUser({ ...authUser, gallery_video: !authUser.gallery_video ? fileUrl.split('//')[1] : fileUrl.split('//')[1] + ', ' + authUser.gallery_video, gallery_photos: authUser.gallery_photos || '' })
                        }
                    })
            }
        }
    }

    return (
        <section className='gallery__wrapper'>
            <div className='user_title'>
                <h1>Галерея</h1>
                <button className='hamburger_btn' onClick={() => {
                    document.body.style.overflow = 'hidden'
                    setStateAsideFilter(true);
                }}><span></span><span></span></button>
            </div>
            <div className='gallery__navigation'>
                <nav>
                    <Link to='/gallery/photo' className={`nav_btn ${currentUrl === 'photo' ? 'active' : ''}`}>Фотографии</Link>
                    <Link to='/gallery/video' className={`nav_btn ${currentUrl === 'video' ? 'active' : ''}`}>Видео</Link>
                    <Link to='/gallery/audio' className={`nav_btn ${currentUrl === 'audio' ? 'active' : ''}`}>Аудио</Link>
                </nav>
                <div>
                    {currentUrl === 'photo' &&
                        <input
                            type='file'
                            id='gallery_upload'
                            accept='image/*'
                            onChange={(e) => handleUpload(e, currentUrl)}
                        />
                    }
                    {currentUrl === 'video' &&
                        <input
                            type='file'
                            id='gallery_upload'
                            accept='video/*'
                            onChange={(e) => handleUpload(e, currentUrl)}
                        />
                    }
                    {currentUrl === 'audio' &&
                        <input
                            type='file'
                            id='gallery_upload'
                            accept='audio/*'
                            onChange={(e) => handleUpload(e, currentUrl)}
                        />
                    }
                    <label htmlFor='gallery_upload'>
                        {`Добавить 
                                ${(currentUrl === 'photo' && 'фотографии')
                            ||
                            (currentUrl === 'video' && 'видео')
                            ||
                            (currentUrl === 'audio' && 'аудио')
                            }
                            `}
                    </label>
                    {/* {currentUrl !== 'audio' && <button>Создать альбом</button>} */}
                </div>
            </div>
            <Outlet />
        </section>
    )
}

export default Gallery;