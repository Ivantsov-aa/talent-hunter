import React from "react"

const arrayMusic = [
    {
        id: 1,
        name: 'Angel',
        src: '/audio/Poets Of The Fall - Angel.mp3'
    },
    {
        id: 2,
        name: 'War',
        src: '/audio/Poets Of The Fall - War.mp3'
    },
    {
        id: 3,
        name: 'Where Do We Draw The Line',
        src: '/audio/Poets Of The Fall - Where Do We Draw The Line.mp3'
    }
];

class GalleryMusic extends React.Component {
    state = {
        playAudio: null
    }

    onPlay = (id) => {
        const players = document.querySelectorAll('audio');

        players.forEach(player => {
            if (+player.dataset.id === id) {
                player.play();
            } else {
                player.pause();
            }
        })

        this.setState({ playAudio: id })
    }

    onPause = (e) => {
        const track = e.currentTarget.parentElement.previousSibling;
        track.pause();

        this.setState({ playAudio: null })
    }

    render() {
        const { playAudio } = this.state;

        return (
            <section className='gallery__container'>
                <section className='gallery__category'>
                    <h3>МОИ АУДИОЗАПИСИ</h3>
                    <section className='audio__container'>
                        {arrayMusic.map((music, i) => (
                            <section className={`audio_track ${music.id === +playAudio ? 'active' : ''}`} key={i}>
                                <div className='audio_title'>
                                    <img src='/images/users/jiao.png' alt='user-logo' />
                                    <p>{music.name}</p>
                                </div>
                                <audio data-id={music.id} preload='metadata' src={music.src} />
                                <div className='audio__controls'>
                                    <button onClick={(e) => +playAudio !== music.id ? this.onPlay(music.id) : this.onPause(e)}>
                                        {music.id === playAudio ?
                                            <svg width="82" height="82" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0V81.974H27.3247V0H0ZM54.6494 0V81.974H81.974V0H54.6494Z" fill="#fff" />
                                            </svg>
                                            :
                                            <svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.756664 1.42764L12.9798 10.4093L0.756664 19.391L0.756664 1.42764Z" fill="#8B8B8B" stroke="url(#paint0_linear_428_10133)" />
                                            </svg>
                                        }
                                    </button>
                                    <button>
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M24.7799 7.016C24.7809 6.85818 24.7506 6.70174 24.6909 6.55564C24.6313 6.40954 24.5433 6.27665 24.4322 6.1646L19.3478 1.0802C19.2357 0.969057 19.1029 0.881129 18.9567 0.821454C18.8106 0.761778 18.6542 0.731529 18.4964 0.732442C18.3386 0.731529 18.1821 0.761778 18.036 0.821454C17.8899 0.881129 17.757 0.969057 17.645 1.0802L14.2514 4.4738L1.14465 17.5805C1.03351 17.6926 0.945582 17.8255 0.885907 17.9716C0.826231 18.1177 0.795983 18.2741 0.796895 18.4319V23.5163C0.796895 23.8344 0.923234 24.1394 1.14812 24.3643C1.373 24.5892 1.67801 24.7155 1.99605 24.7155H7.08045C7.24825 24.7246 7.41609 24.6984 7.57309 24.6385C7.73009 24.5786 7.87275 24.4863 7.99181 24.3677L21.0266 11.261L24.4322 7.92736C24.5416 7.81114 24.6308 7.67737 24.696 7.53164C24.7076 7.43605 24.7076 7.33942 24.696 7.24384C24.7016 7.18802 24.7016 7.13178 24.696 7.07596L24.7799 7.016ZM6.5888 22.3172H3.1952V18.9236L15.1028 7.016L18.4964 10.4096L6.5888 22.3172ZM20.1872 8.7188L16.7936 5.3252L18.4964 3.63439L21.878 7.016L20.1872 8.7188Z" fill="#8B8B8B" />
                                        </svg>
                                    </button>
                                    <button>
                                        <svg width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.79244 22.6324C10.1559 22.6324 10.5045 22.4881 10.7615 22.231C11.0185 21.974 11.1629 21.6254 11.1629 21.262V13.0392C11.1629 12.6757 11.0185 12.3272 10.7615 12.0702C10.5045 11.8131 10.1559 11.6688 9.79244 11.6688C9.42897 11.6688 9.08039 11.8131 8.82338 12.0702C8.56637 12.3272 8.42198 12.6757 8.42198 13.0392V21.262C8.42198 21.6254 8.56637 21.974 8.82338 22.231C9.08039 22.4881 9.42897 22.6324 9.79244 22.6324ZM23.497 6.18692H18.0152V4.81646C18.0152 3.72605 17.582 2.68031 16.811 1.90927C16.04 1.13824 14.9942 0.705078 13.9038 0.705078H11.1629C10.0725 0.705078 9.02675 1.13824 8.25571 1.90927C7.48468 2.68031 7.05152 3.72605 7.05152 4.81646V6.18692H1.56968C1.20621 6.18692 0.857628 6.33131 0.600617 6.58832C0.343606 6.84533 0.199219 7.19391 0.199219 7.55738C0.199219 7.92085 0.343606 8.26943 0.600617 8.52644C0.857628 8.78345 1.20621 8.92784 1.56968 8.92784H2.94014V24.0029C2.94014 25.0933 3.3733 26.139 4.14433 26.9101C4.91537 27.6811 5.96111 28.1143 7.05152 28.1143H18.0152C19.1056 28.1143 20.1514 27.6811 20.9224 26.9101C21.6934 26.139 22.1266 25.0933 22.1266 24.0029V8.92784H23.497C23.8605 8.92784 24.2091 8.78345 24.4661 8.52644C24.7231 8.26943 24.8675 7.92085 24.8675 7.55738C24.8675 7.19391 24.7231 6.84533 24.4661 6.58832C24.2091 6.33131 23.8605 6.18692 23.497 6.18692ZM9.79244 4.81646C9.79244 4.45299 9.93683 4.10441 10.1938 3.8474C10.4508 3.59039 10.7994 3.446 11.1629 3.446H13.9038C14.2673 3.446 14.6159 3.59039 14.8729 3.8474C15.1299 4.10441 15.2743 4.45299 15.2743 4.81646V6.18692H9.79244V4.81646ZM19.3857 24.0029C19.3857 24.3664 19.2413 24.7149 18.9843 24.972C18.7273 25.229 18.3787 25.3734 18.0152 25.3734H7.05152C6.68805 25.3734 6.33947 25.229 6.08246 24.972C5.82545 24.7149 5.68106 24.3664 5.68106 24.0029V8.92784H19.3857V24.0029ZM15.2743 22.6324C15.6377 22.6324 15.9863 22.4881 16.2433 22.231C16.5004 21.974 16.6447 21.6254 16.6447 21.262V13.0392C16.6447 12.6757 16.5004 12.3272 16.2433 12.0702C15.9863 11.8131 15.6377 11.6688 15.2743 11.6688C14.9108 11.6688 14.5622 11.8131 14.3052 12.0702C14.0482 12.3272 13.9038 12.6757 13.9038 13.0392V21.262C13.9038 21.6254 14.0482 21.974 14.3052 22.231C14.5622 22.4881 14.9108 22.6324 15.2743 22.6324Z" fill="#8B8B8B" />
                                        </svg>
                                    </button>
                                    <button>
                                        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23.8587 5.9299C23.7852 5.75467 23.6778 5.59568 23.5427 5.46206L19.0959 1.25197C18.9577 1.12112 18.7951 1.01878 18.6173 0.950778C18.4395 0.88278 18.2501 0.850458 18.0599 0.855661C17.6757 0.866167 17.3113 1.02888 17.0471 1.30799C16.9162 1.4462 16.8139 1.60882 16.7459 1.78658C16.6779 1.96434 16.6456 2.15375 16.6508 2.344C16.6613 2.72822 16.824 3.09253 17.1031 3.35679L19.0297 5.16673L5.19306 5.54509C4.04509 5.57648 2.9566 6.06262 2.16706 6.89656C1.37751 7.7305 0.951585 8.84393 0.982976 9.9919L1.14079 15.7632C1.15125 16.1458 1.3133 16.5087 1.59128 16.7718C1.86926 17.035 2.2404 17.177 2.62306 17.1665C3.00572 17.1561 3.36855 16.994 3.63173 16.716C3.89491 16.4381 4.03689 16.0669 4.02642 15.6843L3.86861 9.91299C3.85814 9.53034 4.00012 9.15919 4.2633 8.88121C4.52648 8.60323 4.88931 8.44119 5.27197 8.43072L19.1086 8.05237L17.2838 9.96489C17.1522 10.1027 17.0493 10.2652 16.9808 10.4431C16.9124 10.6209 16.8798 10.8105 16.885 11.001C16.8902 11.1914 16.9331 11.379 17.0112 11.5528C17.0892 11.7266 17.2009 11.8833 17.3398 12.0137C17.4777 12.1453 17.6402 12.2482 17.818 12.3167C17.9958 12.3851 18.1854 12.4177 18.3759 12.4125C18.5664 12.4072 18.7539 12.3644 18.9277 12.2863C19.1016 12.2083 19.2582 12.0966 19.3886 11.9577L23.5987 7.51086C23.7263 7.37005 23.8249 7.20543 23.8887 7.02644C24.0234 6.67123 24.0126 6.27722 23.8587 5.9299Z" fill="#8B8B8B" />
                                        </svg>
                                    </button>
                                </div>
                            </section>
                        ))}
                    </section>
                </section>
            </section>
        )
    }
}

export default GalleryMusic;