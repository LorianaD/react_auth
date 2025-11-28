import { useState } from "react";
import { register } from "../services/api";
import { useNavigate, Link } from "react-router";

function RegisterForm() {
    
    // etat pour stocker les valeur du form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birth_date, setBirth_date] = useState();
    const [birth_city, setBirth_city] = useState();
    // etat pour stocker les messages d'erreur
    const [message, setMessage] = useState('');
    // etat pour savoir si on est en train d'envoyer une request
    const [loading, setLoading] = useState(false);
    // hook pour naviguer dans une autre page
    const navigate = useNavigate();

    // la fonction utilisé quand on soumet le formulaire
    async function handleSubmit(event) {
        // empeche le rechargement de la page quand on soumet la request
        event.preventDefault();
        // Je change le status du state loading
        setLoading(true);

        try {
            // On appelle notre service api
            const result = await register(email, password, birth_date, birth_city);
            // On affiche le message de succes
            setMessage('Super ! Inscription reussit.');
            // faire une redirection vers login
            setTimeout(()=>{
                navigate('/login');
            }, 1000)

        } catch (error) {
            console.error('erreur:', error);
            setMessage(error);
        } finally {
            setLoading(false);
        }

    }
    return (
        <>
            <h2>Inscription</h2>
            {/* formulaire avec la logique de submit */}
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="email">E-mail : </label>
                    <input type="email" name="email" id="email" value={email} onChange={(e)=>
                        setEmail(e.target.value)}
                        required
                        disabled={loading} // Tant que le loading il est true les imput et le button sont bloqués
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe : </label>
                    <input type="password" name="password" id="password" value={password} onChange={(e)=>
                        setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />                    
                </div>
                <div>
                    <label htmlFor="birth_date">Date d'anniversaire :</label>
                    <input type="date" name="birth_date" id="birth_date" value={birth_date} onChange={(e)=>
                        setBirth_date(e.target.value)}
                        required
                        disabled={loading}                   
                    />
                </div>
                <div>
                    <label htmlFor="birth_city">Lieu de naissance</label>
                    <input type="text" name="birth_city" id="birth_city" value={birth_city} onChange={(e)=>
                        setBirth_city(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <button type="submit">
                    {loading ? "Chargement" : "S'incrire"}
                </button>

            </form>
            {/* Afficher les message de succes et les erreurs */}
            {message}

            <div>Déjà un compte ? <Link to={'/login'}>Se connecter</Link></div>
        </>
    )
}

export default RegisterForm;