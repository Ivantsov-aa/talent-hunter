import React from "react";

class Castings extends React.Component {
    render() {
        const { setStateAsideFilter } = this.props;
        return (
            <section className='casting__wrapper'>
                <div className='user_title'>
                    <h1>Кастинги</h1>
                    <button className='hamburger_btn' onClick={setStateAsideFilter}><span></span><span></span></button>
                </div>
                <section className='favorites__content'>
                    <div className='favorite_block'>
                        <div>
                            <img src='/images/logoGradient.png' alt='favorite-logo' />
                            <p>
                                Кастинг моделей для участия в пок...
                                <span>
                                    Количество откликов: 125
                                </span>
                            </p>
                        </div>
                        <div>
                            <button>Просмотреть</button>
                            <button>Редактировать</button>
                        </div>
                    </div>
                    <div className='favorite_block'>
                        <div>
                            <img src='/images/logoGradient.png' alt='favorite-logo' />
                            <p>
                                Кастинг моделей для участия в пок...
                                <span>
                                    Количество откликов: 125
                                </span>
                            </p>
                        </div>
                        <div>
                            <button>Просмотреть</button>
                            <button>Редактировать</button>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}

export default Castings;