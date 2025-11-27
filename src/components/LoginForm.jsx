import { useState } from "react";
import { useNavigate } from "react-router";

function LoginForm() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        
    }
    
    return (
        <>
            <h2>Se connecter</h2>

        </>
    )
}

export default LoginForm;