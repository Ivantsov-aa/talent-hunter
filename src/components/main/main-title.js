import React from "react";

class MainTitle extends React.Component {
    render() {
        return (
            <section className='main_title__wrapper'>
                <div className='users-counter'>
                    <p>УЖЕ ЗАРЕГИСТРИРОВАЛИСЬ</p>
                    <p>25 025</p>
                </div>
                <h1>TALENT HUNTERS</h1>
                <p>Самый удобный, интуитивный сервис кастингов в Рунете</p>
                <button>Присоединиться</button>
            </section>
        )
    }
}

export default MainTitle;