import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useSigninCheck } from 'reactfire';
import { useEffect } from 'react';

const authSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid mail').required('E-mail is required'),
    password: yup.string().required('Password is required'),
});

interface User {
    email: string;
    password: string;
}

export const Login = () => {
    const { status, data: signInCheckResult } = useSigninCheck({
        suspense: true
    });

    const { user } = signInCheckResult || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/workspace');
        }
    }, [user, navigate]);


    const { register, handleSubmit, formState: { errors }, setError } = useForm<User>(
        {
            resolver: yupResolver(authSchema),
            defaultValues: {
                email: '',
                password: '',
            }
        }
    );

    const auth = getAuth();

    const onSubmit = (data: User) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                navigate('/workspace');
                return true
            }).catch(async (err) => {
                console.log('err', err);
                const formError = { type: "server", message: "Username or Password Incorrect" }
                setError('password', formError)
                return false
            })
    }


    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-3 bg-neutral-100 p-6 w-96">
                    <h1 className="text-teal-600 font-semibold text-6xl mb-1"> Login </h1>

                    <input type="text" placeholder="Email" className="rounded-md p-3" {...register("email")} />
                    {errors.email ? <span className="text-red-600">{errors.email.message}</span> : null}

                    <input type="password" placeholder="Senha" className="rounded-md p-3" {...register("password")} />
                    {errors.password ? <span className="text-red-600">{errors.password.message}</span> : null}

                    <button className="bg-teal-500 rounded text-white hover:bg-teal-400 p-2"> Entrar </button>
                </div>
            </form>
        </div>
    )
}

export default Login