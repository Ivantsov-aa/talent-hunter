const ProfilePhotos = ({ gallery }) => {
    return (
        <section className='profile-video__wrapper'>
            {gallery && gallery.split(', ').map((photo, i) => (
                photo !== 'null' && <div className='photo__container'>
                    <img src={`https://${photo.split('...').join('/')}`} alt="feed-content" key={i} />
                </div>
            ))}
        </section>
    )
}

export default ProfilePhotos;