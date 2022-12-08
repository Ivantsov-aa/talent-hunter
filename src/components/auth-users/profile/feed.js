import React from "react";

class ProfileFeed extends React.Component {
    render() {
        return (
            <section className='profile-feed__wrapper'>
                <div className='photo__container'>
                    <img src='/images/users/photos/jiao-photo.png' alt="feed-content" />
                </div>
                <div className='photo__container'>
                    <img src='/images/users/photos/jim-photo.png' alt="feed-content" />
                </div>
                <div className='photo__container'>
                    <img src='/images/users/photos/stiven-photo.png' alt="feed-content" />
                </div>
                <div className='photo__container'>
                    <img src='/images/users/photos/denzel-photo.png' alt="feed-content" />
                </div>
                <div className='photo__container'>
                    <img src='/images/users/photos/paul-photo.png' alt="feed-content" />
                </div>
            </section>
        )
    }
}

export default ProfileFeed;