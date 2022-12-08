import React from "react";
import { Link } from "react-router-dom";

class CastingBlock extends React.Component {
    state = {
        chosenCasting: null,
        fullDesc: false
    }

    componentDidMount() {
        const { castings, urlLocation } = this.props;
        const currentUrl = urlLocation.split('/').pop();

        castings.forEach(casting => casting.id === +currentUrl && this.setState({ chosenCasting: casting }));
    }

    updateChosenCasting = () => {
        const { castings, urlLocation } = this.props;
        const currentUrl = urlLocation.split('/').pop();

        castings.forEach(casting => casting.id === +currentUrl && this.setState({ chosenCasting: casting }));
    }

    render() {
        const { chosenCasting, fullDesc } = this.state;
        const { setStateAsideFilter, castings, urlLocation } = this.props;

        const currentUrl = urlLocation.split('/').pop();
        if (chosenCasting && chosenCasting.id !== +currentUrl) {
            this.updateChosenCasting();
        }

        return (
            chosenCasting &&
            <section className='casting__wrapper'>
                <div className='user_title'>
                    <h1>Кастинг</h1>
                    <button className='hamburger_btn' onClick={setStateAsideFilter}><span></span><span></span></button>
                </div>
                <section className='grid__wrapper'>
                    <section className='casting_title'>
                        <div className='casting_image'>
                            <img src={chosenCasting.main_pic} alt='casting-logo' />
                            <img className='brand_logo' src={chosenCasting.brand_logo} alt='brand-logo' />
                        </div>
                        <div>
                            <h3>{chosenCasting.title}</h3>
                            <p>{chosenCasting.brand}</p>
                            <div>
                                <button>Редактировать</button>
                                <button>Смотреть все отклики</button>
                            </div>
                        </div>
                    </section>
                    <section className='short_desc'>
                        <p>{chosenCasting.date}</p>
                        <p>{chosenCasting.place}</p>
                        <p>{chosenCasting.task}</p>
                    </section>
                    <section className={`casting_desc ${fullDesc ? 'full' : ''}`}>
                        <div className='responses'>
                            <div>
                                <p>Отклики:</p>
                                <p>125 <span>+5</span></p>
                            </div>
                            <div>
                                <img src='/images/users/jiao.png' alt='user-logo' />
                                <img src='/images/users/jim.png' alt='user-logo' />
                                <img src='/images/users/marcus.png' alt='user-logo' />
                                <img src='/images/users/mary.png' alt='user-logo' />
                            </div>
                        </div>
                        <div className='full_desc'>
                            <p>
                                Нужны почти 100 моделей. <br />
                                Парни, девушки, с опытом и без.<br />
                                Готовые на стрижки и окрашивания.<br />
                                Можно просто с окрашиванием, цвет после показа вернём ваш.<br />
                                Цвет и длина волос любая.<br />
                                Все образы обсуждаются с вами.<br />
                            </p>
                            <h4>Общие требования:</h4>
                            <p>
                                любой типаж<br />
                                волосы любой длины, от очень коротких до очень длинных<br />
                                цвет волос любой<br />
                                возраст 18-30 лет<br />
                                рост от 160 девушки, рост от 170 парни<br />
                                размер одежды 40/42 девушки, размер одежды 48/50/52 парни<br />
                            </p>
                            <h4>Даты работы:</h4>
                            <p>
                                Очный кастинг ЗАВТРА 28 июня в 17.00<br />
                                В ночь с 30 июня на 1 июля выезд в город Ярославль, утром завтрак и далее подготовка волос, днём обеды, вечером обратно в мск<br />
                                2 июля вечером на 2 часа репетиция проходки<br />
                                3 июля показ, обеды на площадке<br />
                            </p>
                            <h4>Оплата за проект:</h4>
                            <p>
                                7.000, оплата сразу после показа наличными<br />
                                Проезд/проживание/питание оплачивает заказчик<br />
                                Подписание релиза<br />
                            </p>
                        </div>
                        {!fullDesc && <button onClick={() => this.setState({ fullDesc: true })}>Показать полностью</button>}
                    </section>
                    <section className='casting__photos'>
                        {chosenCasting.pictures.map((pic, i) => (
                            <img src={pic} alt='casting-pic' key={i} />
                        ))}
                    </section>
                </section>
                <section className='similar_castings'>
                    <h3>Похожие кастинги:</h3>
                    <section className='flex__wrapper'>
                        {castings.map((casting, i) => (
                            casting.id !== chosenCasting.id &&
                            <Link to={`/castings/${casting.id}`} key={i}>
                                <img src={casting.main_pic} alt='similar-casting' />
                                <p>{casting.task}</p>
                                <p>{casting.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ₽</p>
                            </Link>
                        ))}
                    </section>
                </section>
            </section>
        )
    }
}

export default CastingBlock;