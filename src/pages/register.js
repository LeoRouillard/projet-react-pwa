import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { db, auth } from '../firebase';
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore"; 

export default function Register() {
    
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [adresse, setAdresse] = useState(null);
    const [prenom, setPrenom] = useState(null);
    const [nom, setNom] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const addUser = async (user) => {
        await addDoc(collection(db, 'users'), {
            id: user.uid,
            email: user.email,
            adresse: adresse,
            prenom: prenom,
            nom: nom
        })
        navigate("/"); 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                addUser(user)
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
              });
        } catch (error) {
            setError(error.message)
        }
    }

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    function handleChangeAdresse(event) {
        setAdresse(event.target.value);
    }

    function handleChangePrenom(event) {
        setPrenom(event.target.value);
    }

    function handleChangeNom(event) {
        setNom(event.target.value);
    }

    return (
        <div>
            <h2>Espace client - Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="input">
                        Nom :
                        <input type="text" name="nom" onChange={handleChangeNom}/>
                    </label>
                </div>
                <div>
                    <label className="input">
                        Prénom :
                        <input type="text" name="prenom" onChange={handleChangePrenom}/>
                    </label>
                </div>
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
                <div>
                    <label className="input">
                        Adresse :
                        <input type="text" name="adresse" onChange={handleChangeAdresse}/>
                    </label>
                </div>
                <input type="submit" value="Inscription" />
            </form>
        </div>
    )
}