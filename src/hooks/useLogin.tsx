import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const useFirebaseLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = async (email: string, password: string) => {
        setError(null); // Limpiar errores previos

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuario autenticado:', userCredential.user);

            const userId = userCredential.user.uid;

            // Redirigir al main después del inicio de sesión
            navigate(`/main/${userId}`);
        } catch (error: any) {
            console.error('Error al iniciar sesión:', error);
            if (error.code === 'auth/wrong-password') {
                setError('Incorrect Password.');
            } else if (error.code === 'auth/user-not-found') {
                setError('There is no account associated with that email.');
            } else {
                setError('An error occurred while signing in.');
            }
        }
    };

    return { login, error };
};

export default useFirebaseLogin;
