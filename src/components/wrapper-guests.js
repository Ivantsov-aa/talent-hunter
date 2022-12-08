import React from "react";

import Footer from "./footer";
import Header from "./header";
import Main from "./main";

const WrapperForGuests = ({ store, innerWidth, setStateAsideFilter, isLogged }) => {
    return (
        <>
            <Header
                innerWidth={innerWidth}
                isLogged={isLogged}
                setStateAsideFilter={setStateAsideFilter}
            />
            <main>
                <Main store={store} innerWidth={innerWidth} />
            </main>
            <Footer
                innerWidth={innerWidth}
            />
        </>
    )

}

export default WrapperForGuests;