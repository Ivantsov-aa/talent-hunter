import React from "react";
import MainAboutUs from "./main/main-about";

import MainTitle from "./main/main-title";
import MainTopUsers from "./main/main-top-users";

class Main extends React.Component {
    render() {
        const { innerWidth } = this.props;
        const { users } = this.props.store;
        return (
            <>
                <MainTitle />
                <MainTopUsers users={users} innerWidth={innerWidth} />
                <MainAboutUs innerWidth={innerWidth} />
            </>
        )
    }
}

export default Main;