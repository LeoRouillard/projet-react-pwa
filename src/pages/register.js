import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";

export default function Register() {
    
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            
           // navigate('/login');

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

    return (
        <div>
            <h2>Espace client - Inscription</h2>
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
                <input type="submit" value="Inscription" />
            </form>
        </div>
    )
}