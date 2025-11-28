import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../services/api.js";


function LoginForm() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {

        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const result = await login(email, password);

            // Je stock mon token dans le localstorage de mon client
            localStorage.setItem('token', result.token);

            setMessage('Connexion reussite !');

            setTimeout(()=>{
                navigate('/profile');
            }, 3000)

        } catch (error) {
            console.error('erreur:', error);
            setMessage(error);
        } finally {
            setLoading(false);
        }

    }
    
    return (
        <>
            <h2>Se connecter</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="email">E-mail : </label>
                    <input type="email" name="email" id="email" value={email} onChange={(e)=>
                        setEmail(e.target.value)}
                        required
                        disabled={loading}
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

                <button type="submit">
                    {loading ? "Chargement" : "Se connecter"}
                </button>

            </form>
            {message}

            <div>Pas encore inscrit ? <Link to={'/register'}>S'inscrire.'</Link></div>
        </>
    )
}

export default LoginForm;