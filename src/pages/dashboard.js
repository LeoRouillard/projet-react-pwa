import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from '../firebase';

export default function Dashboard() {
    
    const [date, setDate] = useState(null);
    const [desc, setDesc] = useState(null);
    const [prestataire, setPrestataire] = useState(null);
    const [listPrestataires, setListPrestataires] = useState([]);
    const [listRdv, setListRdv] = useState([]);
    const [success, setSuccess] = useState('');
    const user = auth.currentUser;

    const addRdv = async () => {
        await addDoc(collection(db, 'rdv'), {
            userID : user.uid,
            desc : desc,
            date : date,
            idPrestataire : prestataire
        }).then(getListRdv())
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            addRdv()
            .catch((error) => {
                console.log(error)
            });
        } catch (error) {
            console.log(error)
        }
        setDate('');
        setDesc('');
        setSuccess('Rendez-vous pris !');
    }

    
    async function getListPrestataires() {
        const q = query(collection(db, "prestataires"));
        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((doc) => {
            list.push(doc.id)
        });
        setListPrestataires(list)
    }

    async function getListRdv() {
        const q = query(collection(db, "rdv"), where("userID", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((doc) => {
            list.push({doc:doc.id, data:doc.data()})
        });
        setListRdv(list);
    }

    function handleChangeDate(event) {
        setDate(event.target.value);
    }

    function handleChangeDesc(event) {
        setDesc(event.target.value);
    }

    function handleChangePrestataire(event) {
        setPrestataire(event.target.value);
    }

    useEffect(() => {
        getListPrestataires();
        getListRdv();
    }, [])

    return (
        <div>
            <h2>Dashboard</h2>
            <h3 style={{color: 'green'}}>{success}</h3>
            <p>Prendre un rendez-vous</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="input">
                        Choix d'un prestataire
                        <select name="presta" id="presta-select" defaultValue={listPrestataires[0]} onChange={handleChangePrestataire}>
                            {listPrestataires.map((p) => { return <option key={p}>{p}</option> })}
                        </select>
                    </label>
                </div>
                <div>
                    <label className="input">
                        Date :
                        <input type="datetime-local" name="date" value={date} onChange={handleChangeDate}/>
                    </label>
                </div>
                <div>
                    <label className="input">
                        Description :
                        <input type="text" name="desc" value={desc} onChange={handleChangeDesc}/>
                    </label>
                </div>

                <input type="submit" value="Valider" />
            </form>
            <h2>Liste de mes rendez-vous</h2>
            <table style={{width: 700}}>
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">ID Prestataire</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                {listRdv.map((rdv) => { return <tr key={rdv.doc}>
                            <th scope="row">{rdv.data.date}</th>
                            <td>{rdv.data.idPrestataire}</td>
                            <td>{rdv.data.desc}</td>
                        </tr> 
                    })}
                </tbody>
            </table>
        </div>
    )
}