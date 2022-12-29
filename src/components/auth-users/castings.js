import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Castings = ({ url, token, authUser, setStateAsideFilter }) => {
    const [userCastings, setUserCastings] = useState(null);

    const loadCastings = async () => {
        await fetch(`${url}/getCastingsInfo/${token}`)
            .then(response => response.json())
            .then(result => {
                let castings = result.filter(casting => casting.user_id === authUser.id && casting.contact_name !== 'Владислав' && casting.event_start);
                setUserCastings(castings);
            })
    }

    useEffect(() => {
        loadCastings();
    }, [])

    return (
        <section className='casting__wrapper'>
            <div className='user_title'>
                <h1>Кастинги</h1>
                <button className='hamburger_btn' onClick={setStateAsideFilter}><span></span><span></span></button>
            </div>
            <section className='casting__content'>
                {userCastings &&
                    userCastings.reverse().map(casting => {
                        let media = casting.foto.split(',')[0];
                        return casting.foto &&
                            <div className='casting_block' key={casting.id}>
                                <div className='casting_image'>
                                    <img src={`https://${media}`} alt='casting-logo' />
                                    <img className='brand_logo' src={`https://${authUser.foto}`} alt='brand-logo' />
                                </div>
                                <div className='casting_desc'>
                                    <p>{authUser.name}</p>
                                    {casting.title && <h4>{casting.title}</h4>}
                                    <p>Начало мероприятия: {casting.event_start.split('-').reverse().join('.')}</p>
                                    <p>Даты проведения кастинга:</p>
                                    <p>
                                        {casting.casting_start.split('-').reverse().join('.')} - {casting.casting_end.split('-').reverse().join('.')}
                                    </p>
                                    {/* <p>{casting.service_cost.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ₽</p> */}
                                </div>
                                {/* <p>{casting.title}</p> */}
                                <div className='buttons'>
                                    <Link to={`/castings/${casting.id}`}>Просмотреть</Link>
                                    <button>Завершить</button>
                                </div>
                            </div>
                    })
                }
            </section>
        </section>
    )
}

export default Castings;