import React, { useState, useEffect } from "react";
import Login from "../login/Login";

function Main() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        if (loggedIn === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div>
            {isLoggedIn ? (
                <div>Main Content</div>
            ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
            )}
        </div>
    );
}

export default Main;
