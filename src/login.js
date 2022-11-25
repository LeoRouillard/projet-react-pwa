import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from './firebase';

export default function Login() {
    
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [user, setUser] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const data = await signInWithEmailAndPassword(auth, username, password);
            setUser(data)
            console.log(user)
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    function handleChangeUsername(event) {
        setUsername(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="input">
                        Nom d'utilisateur :
                        <input type="text" name="username" onChange={handleChangeUsername}/>
                    </label>
                </div>
                <div>
                    <label className="input">
                        Mot de passe:
                        <input type="password" name="password" onChange={handleChangePassword}/>
                    </label>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}