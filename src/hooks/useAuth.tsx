import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../utils/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const useFirebaseAuth = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const register = async (email: string, password: string, username: string, accountAmount: string) => {
        setError(null); // Limpiar errores previos
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const accountAmountNumber = parseInt(accountAmount);

            // Guardar datos adicionales en Firestore
            await setDoc(doc(db, 'users', user.uid), {
                username: username,
                accountAmount: accountAmountNumber,
                email: user.email,
            });

            console.log('Usuario registrado:', user);

            // Redirigir al main después del registro
            navigate(`/main/${user.uid}`);
        } catch (error: any) {
            console.error('Error al registrar:', error);
            if (error.code === 'auth/email-already-in-use') {
                setError('This email is already in use.');
            } else if (error.code === 'auth/weak-password') {
                setError('The password is too weak.');
            } else {
                setError('An error occurred while signing up.');
            }
        }
    };

    return { register, error };
};

export default useFirebaseAuth;
