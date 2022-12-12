import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";

export default function Login() {
    
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const data = await signInWithEmailAndPassword(auth, email, password);
            setUser(data)
            console.log(user)
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    function handleClick() {
        navigate('/register');
    }
    return (
        <div>
            <h2>Espace client</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="input">
                        Email :
                        <input type="text" name="email" onChange={handleChangeEmail}/>
                    </label>
                </div>
                <div>
                    <label className="input">
                        Mot de passe:
                        <input type="password" name="password" onChange={handleChangePassword}/>
                    </label>
                </div>
                <input type="submit" value="Connexion" />
            </form>
            <button type="button" onClick={handleClick}>
                S'inscrire
            </button>
        </div>
    )
}