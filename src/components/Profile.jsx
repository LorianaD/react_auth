import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import { useNavigate } from "react-router";
import '../assets/style/Profile.css';

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function getUser() {
        
        const token = localStorage.getItem("token");
        
        if (!token) {
            navigate('/login');
            return;
        }
        
        try {

            const data = await getProfile(token);
            console.log(data);

            setUser(data.user);

            setLoading(false);
            
        } catch (error) {
            console.error('erreur:', error);
            setError(error.message);

            //gestion au cas ou le token est invalide ou introuvable
            if(error.message.includes('401') || error.message.includes('Token')){
                localStorage.removeItem('token');
                navigate('/login');
            }

        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        getUser();
    }, [navigate]);

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }    

    if(loading) {
        return(
            <div>
                en chargement
            </div>
        )
    }

    return (
        <>
            <h2>Mon profil</h2>
            {user && (
                <div className="user-profile">
                    <p className="user-intem"><strong className="title-intem">id: </strong>{user.id}</p>
                    <p className="user-intem"><strong className="title-intem">E-mail : </strong>{user.email}</p>
                    <p className="user-intem"><strong className="title-intem">Date de naissance : </strong>{new Date(user.birth_date).toLocaleDateString()}</p>
                    <p className="user-intem"><strong className="title-intem">Lieu de naissance : </strong>{user.birth_city}</p>
                    <p className="user-intem"><strong className="title-intem">inscrit le: </strong>{new Date(user.created_at).toLocaleDateString()}</p>
                    <button onClick={handleLogout} className="btn-logout">Déconnexion</button>
                </div>
            )}
        </>
    )
}

export default Profile;