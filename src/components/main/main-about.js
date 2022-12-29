import React from "react";
import Slider from "react-slick";
import ReviewsSlider from "./reviews-slider";
import { Link } from "react-router-dom";

const benefits = [
    'Тут мы придумаем 5 уникальных приемуществ над конкурентами, а не стандартный подход',
    'Тут мы придумаем 5 уникальных приемуществ над конкурентами, а не стандартный подход',
    'Тут мы придумаем 5 уникальных приемуществ над конкурентами, а не стандартный подход',
    'Тут мы придумаем 5 уникальных приемуществ над конкурентами, а не стандартный подход',
    'Тут мы придумаем 5 уникальных приемуществ над конкурентами, а не стандартный подход'
];

class MainAboutUs extends React.Component {
    constructor(props) {
        super(props);

        this.sliderRef = React.createRef();
        this.sliderBenefitsRef = React.createRef();
    }

    goToPrev = (val) => {
        if (val === 'slider') {
            this.sliderRef.current.slickPrev();
        } else {
            this.sliderBenefitsRef.current.slickPrev();
        }
    }

    goToNext = (val) => {
        if (val === 'slider') {
            this.sliderRef.current.slickNext();
        } else {
            this.sliderBenefitsRef.current.slickNext();
        }
    }

    render() {
        const { innerWidth } = this.props;

        const settings = {
            arrows: false,
            className: "center",
            centerMode: true,
            infinite: true,
            variableWidth: true,
            slidesToShow: 3,
            speed: 500
        }

        const settingsBenefits = {
            arrows: false,
            className: "center",
            centerMode: true,
            infinite: true,
            variableWidth: true,
            slidesToShow: 1,
            speed: 500
        }

        return (
            <section className='main__about-us__wrapper'>
                <section className="presentation__wrapper">
                    <h2>
                        TALENT HUNTERS - это более 35 000 анкет артистов и моделей всех возрастов
                    </h2>
                    <p>
                        Если вы профессиональный актер или любитель, ведущий или вокалист, аниматор или модель,
                        если вы хотите пройти кастинг на роль в популярном сериале или фильме, рекламе и телепередаче, то Talent Hunter поможет реализовать ваши самые интересные задумки.
                    </p>
                </section>
                <section className='slider__wrapper'>
                    <Slider {...settings} initialSlide={1} ref={this.sliderRef}>
                        <div className='about-us__container'>
                            <img src='/images/main/about-us/about-us-1.png' alt='about-1' />
                        </div>
                        <div className='about-us__container'>
                            <img src='/images/main/about-us/about-us-2.png' alt='about-us-2' />
                        </div>
                        <div className='about-us__container'>
                            <img src='/images/main/about-us/about-us-3.png' alt='about-us-3' />
                        </div>
                        <div className='about-us__container'>
                            <img src='/images/main/about-us/about-us-1.png' alt='about-1' />
                        </div>
                        <div className='about-us__container'>
                            <img src='/images/main/about-us/about-us-2.png' alt='about-us-2' />
                        </div>
                        <div className='about-us__container'>
                            <img src='/images/main/about-us/about-us-3.png' alt='about-us-3' />
                        </div>
                    </Slider>
                    <div className='slider__control'>
                        <button className='prev-slide' onClick={() => this.goToPrev('slider')}></button>
                        <button className='next-slide' onClick={() => this.goToNext('slider')}></button>
                    </div>
                </section>
                <div className='presentation__wrapper'>
                    <section className='customers__wrapper'>
                        <div className='customers__description'>
                            <h2>TALENT HUNTERS - это качественные заказчики</h2>
                            <p>Если вы профессиональный актер или любитель, ведущий или вокалист, аниматор или модель, если вы хотите пройти кастинг на роль в популярном сериале или фильме, рекламе и телепередаче, то Talent Hunter поможет реализовать ваши самые интересные задумки. </p>
                            <Link to='/registration'>Присоединиться</Link>
                        </div>
                        <div className='customers_bg'>
                            <img src='/images/main/about-us/talent-bg-1.png' alt='talent-bg-1' />
                            <img src='/images/main/about-us/talent-bg-2.png' alt='talent-bg-2' />
                        </div>
                    </section>
                    <section className='castings__wrapper'>
                        <div className='castings_bg'>
                            <img src='/images/main/about-us/castings-bg.png' alt='castings-bg' />
                        </div>
                        <div className='castings__description'>
                            <h2>TALENT HUNTERS - это качественные заказчики</h2>
                            <p>Если вы профессиональный актер или любитель, ведущий или вокалист, аниматор или модель, если вы хотите пройти кастинг на роль в популярном сериале или фильме, рекламе и телепередаче, то Talent Hunter поможет реализовать ваши самые интересные задумки. </p>
                            <Link to='/registration'>Присоединиться</Link>
                        </div>
                    </section>
                </div>
                <section className='benefits__wrapper'>
                    <h2>TALENT HUNTERS - это</h2>
                    <div className='benefits__list'>
                        {innerWidth < 768 ?
                            <>
                                <Slider {...settingsBenefits} ref={this.sliderBenefitsRef}>
                                    {
                                        benefits.map((item, i) => (
                                            <div className='benefit__container' key={i}>
                                                <div className='benefit_logo'></div>
                                                <p>{item}</p>
                                            </div>
                                        ))
                                    }
                                </Slider>
                                <div className='slider__control'>
                                    <button className='prev-slide' onClick={this.goToPrev}></button>
                                    <button className='next-slide' onClick={this.goToNext}></button>
                                </div>
                            </>
                            :
                            benefits.map((item, i) => (
                                <div className='benefit__container' key={i}>
                                    <div className='benefit_logo'></div>
                                    <p>{item}</p>
                                </div>
                            ))
                        }
                    </div>
                </section>
                <section className='reviews__wrapper'>
                    <div className='reviews_bg'>
                        <img src='/images/main/about-us/reviews-bg.png' alt='castings-bg' />
                    </div>
                    <div className='reviews__description'>
                        <h2>Имея за плечами большой опыт, мы помогаем осуществить мечты каждого из вас.</h2>
                        <p>Самое главное в работе нашего кастинг-сервиса – внимание к каждому пользователю, предоставление ему широких возможностей для реализации, соединение актера и кастинг-директора.</p>
                        <ReviewsSlider innerWidth={innerWidth} />
                    </div>
                </section>
                <section className='performers__wrapper'>
                    <div className='performers__description'>
                        <h2>TALENT HUNTERS - это лучшие исполнители</h2>
                        <p>Если вы профессиональный актер или любитель, ведущий или вокалист, аниматор или модель, если вы хотите пройти кастинг на роль в популярном сериале или фильме, рекламе и телепередаче, то Talent Hunter поможет реализовать ваши самые интересные задумки. </p>
                        <Link to='/registration'>Присоединиться</Link>
                    </div>
                    <div className='performers_bg'>
                        <img src='/images/main/about-us/performers-bg.png' alt='talent-bg-1' />
                    </div>
                </section>
            </section>
        )
    }
}

export default MainAboutUs;