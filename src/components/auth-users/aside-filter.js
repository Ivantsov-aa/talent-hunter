import React from "react";
import { Link } from "react-router-dom";

class AsideFilter extends React.Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        const { stateAsideFilter, setStateAsideFilter } = this.props;
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            setStateAsideFilter(false);
            if (stateAsideFilter) {
                document.body.style.overflowY = 'scroll';
            }
        }
    }

    render() {
        const { stateAsideFilter, setStateAsideFilter, castingsLength } = this.props;

        return (
            <section className={`aside-filter__wrapper ${stateAsideFilter ? 'active' : ''}`} ref={this.setWrapperRef}>
                <Link to='castings/add' onClick={() => {
                    setStateAsideFilter(false)
                    document.body.style.overflowY = 'scroll';
                }}>Добавить кастинг</Link>
                <button>Моя анкета</button>
                <button>Мои кастинги</button>
                <button>Отклики на кастинг</button>
                <button>Избранное</button>
                <button>Как получить алмазы</button>
                <button>Моя анкета для исполнителя</button>
                <button>Экскурсия по сайту</button>
                <button>Правила пользования</button>
            </section>
        )
    }
}

export default AsideFilter;