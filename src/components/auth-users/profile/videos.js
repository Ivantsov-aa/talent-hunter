const ProfileVideo = ({ gallery }) => {
    return (
        <section className='profile-video__wrapper'>
            {gallery && gallery.split(', ').map((video, i) => (
                video !== 'null' && <video className='video_block' src={`https://${video.split('...').join('/')}`} muted loop onMouseLeave={(e) => e.target.pause()} onMouseEnter={(e) => e.target.play()} key={i} />
            ))}
        </section>
    )
}

export default ProfileVideo;