// Recupere l'url de l'api dans le fichier .env
const API_URL = import.meta.env.VITE_API_URL;

// logique d'instruction
export async function register(email, password) {
    // faire la req post sur la route /api/auth/register
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type' : `application/json`
        },
        // passer les data au body
        body: JSON.stringify({email, password}),
    });

    // pass la response json
    const data = await response.json();

    // petite gestion d'erreur
    if (!response.ok) {
        throw new Error(data.Error || "l'inscription a échoué");
    }

    return data;
}

// logique de connexion

export async function login(email, password) {
    // faire la request post sur la route api/auth/login
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email, password}),
    })

    // traitement et parse de la response
    const data = await response.json();

    // traitement en cas d'erreur
    if (!response.ok) {
        throw new Error(data.Error || "echec lors de la connexion");
    }

    return data;
}

export async function getProfile(token) {
    // preparation de la requete get sur la route api/auth/profile
    // pour les resultas necessite une connexion, on doit passer dans le header le Token
    const response = await fetch(`${API_URL}/api/auth/profil`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            // passer le token dans le format qui est attendu par l'api
            'Authorization' : `Bearer ${token}`
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'erreur lors de la recuperation du profil')
    }

    return data;
}