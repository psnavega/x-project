import { useState } from "react"
import NewUser from "./Login/newUser";
import Login from "./Login/Login";

export default function LoginCard() {
    const [showNewUser, setShowNewUser] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);

    function handleNewUserClick() {
        setShowNewUser(true);
        setShowLoginForm(false);
    }

    function handleLogin() {
        setShowNewUser(false);
        setShowLoginForm(true);
    }

    return (
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            { showNewUser ? (
            <NewUser onLoginClick={handleLogin}/>
            ) : ( <Login onNewUserClick={handleNewUserClick}/>)}
        </div>
    )
}