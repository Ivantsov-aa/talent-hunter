import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProfileCastings = ({ url, token, authUser }) => {
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
        <section className='casting__content'>
            {userCastings &&
                userCastings.sort((a, b) => b.id - a.id).map(casting => {
                    let media = casting.foto.split(',')[0];
                    return casting.foto &&
                        <Link to={`/castings/${casting.id}`} className='casting_block' key={casting.id}>
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
                            {/* <p>{casting.title}</p>
                            <div className='buttons'>
                                <Link to={`/castings/${casting.id}`}>Просмотреть</Link>
                                <button>Завершить</button>
                            </div> */}
                        </Link>
                })
            }
        </section>
    )
}

export default ProfileCastings;