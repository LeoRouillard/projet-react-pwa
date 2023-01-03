import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";

export default function Login() {
    
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            console.log("we are being triggered :D");
            setSupportsPWA(true);
            setPromptInstall(e);
          };
          window.addEventListener("beforeinstallprompt", handler);
      
          return () => window.removeEventListener("transitionend", handler);
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const data = await signInWithEmailAndPassword(auth, email, password);
            console.log(data)
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

    function handleRegister() {
        navigate('/register');
    }

    function installApp(event) {
        event.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    
  
    }

    return <div>
            <h2>Espace client - Connexion</h2>
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
            <button type="button" onClick={handleRegister}>
                Vous n'avez pas de compte ? S'inscrire
            </button>
            <button type="button" onClick={installApp}>
                Installer
            </button>
        </div>
}