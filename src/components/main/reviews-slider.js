import React from "react";
import Slider from "react-slick";

const reviews = [
    {
        name: 'Сариди Даниил',
        text: `Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа 
        на панцирнотвердой спине, он видел, стоило...`,
        img: '/images/main/about-us/review-logo.png'
    },
    {
        name: 'Сариди Даниил',
        text: `Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа 
        на панцирнотвердой спине, он видел, стоило...`,
        img: '/images/main/about-us/review-logo.png'
    },
    {
        name: 'Сариди Даниил',
        text: `Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа 
        на панцирнотвердой спине, он видел, стоило...`,
        img: '/images/main/about-us/review-logo.png'
    },
    {
        name: 'Сариди Даниил',
        text: `Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа 
        на панцирнотвердой спине, он видел, стоило...`,
        img: '/images/main/about-us/review-logo.png'
    },
    {
        name: 'Сариди Даниил',
        text: `Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа 
        на панцирнотвердой спине, он видел, стоило...`,
        img: '/images/main/about-us/review-logo.png'
    },
    {
        name: 'Сариди Даниил',
        text: `Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа 
        на панцирнотвердой спине, он видел, стоило...`,
        img: '/images/main/about-us/review-logo.png'
    }
];

class ReviewsSlider extends React.Component {
    constructor(props) {
        super(props);

        this.sliderRef = React.createRef();
    }

    goToPrev = () => {
        this.sliderRef.current.slickPrev();
    }

    goToNext = () => {
        this.sliderRef.current.slickNext();
    }

    render() {
        const { innerWidth } = this.props;
        const settings = {
            arrows: false,
            infinite: true,
            variableWidth: true,
            slidesToShow: innerWidth <= 1024 ? 2 : 1,
            speed: 500
        };

        return (
            <section className='reviews-slider__wrapper'>
                <Slider {...settings} ref={this.sliderRef}>
                    {reviews.map((review, i) => (
                        <div className='review__container' key={i}>
                            <img src={review.img} alt='review-logo' />
                            <h3>{review.name}</h3>
                            <p>
                                <span></span>
                                {review.text}
                            </p>
                        </div>
                    ))}
                </Slider>
                <div className='slider__control'>
                    <button className='prev-slide' onClick={this.goToPrev}></button>
                    <button className='next-slide' onClick={this.goToNext}></button>
                </div>
            </section >
        )
    }
}

export default ReviewsSlider;