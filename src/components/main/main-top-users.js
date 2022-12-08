import React from "react";
import Slider from "react-slick";

class MainTopUsers extends React.Component {
    render() {
        const { users, innerWidth } = this.props;
        const settings = {
            arrows: false,
            className: "center",
            centerMode: true,
            infinite: true,
            variableWidth: true,
            slidesToShow: 1,
            speed: 500
        }

        return (
            <section className='main_top-users__wrapper'>
                {innerWidth < 768 ?
                    <Slider {...settings}>
                        {users.map((user, i) => (
                            user.id > 0 && user.id < 6 &&
                            <div className='user__container' key={i}>
                                <div className='user__logo'>
                                    <img src={user.img} alt='top-user-logo' />
                                </div>
                            </div>
                        ))}
                    </Slider>
                    :
                    users.map((user, i) => (
                        user.id > 0 && user.id < 6 &&
                        <div className='user__container' key={i}>
                            <div className='user__logo'>
                                <img src={user.img} alt='top-user-logo' />
                            </div>
                            <div className='user__name'>
                                <p>
                                    {user.name}
                                </p>
                                <p>
                                    {user.talent}
                                </p>
                                {
                                    user.favorite &&
                                    <div>200</div>
                                }
                            </div>
                            <div className='user__content'>
                                {
                                    user.content.map((item, i) => (
                                        item.selected &&
                                        <div key={i}>
                                            <img src={item.logo} alt='platform-logo' />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </section>
        )
    }
}

export default MainTopUsers;