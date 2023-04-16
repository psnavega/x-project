import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import Cookies from "js-cookie";

export default function Login({onNewUserClick}: {onNewUserClick: any}) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(false); 

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = {
            email: email,
            password
        };

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                
                Cookies.set("token", data.token, { httpOnly: true });
            } else {
                setTimeout(() => {
                    setIsLoading(false);
                    setErrorMessage(true)
                }, 3000)
                // setIsLoading(false);
                // setErrorMessage(true);
                setTimeout(() => {
                    setErrorMessage(false);
                }, 6000)
                console.log('Deu ruim');
            }
        } catch (e: unknown) {
            console.error(e);
        // } finally {
        //     setErrorMessage(false);
        //     setIsLoading(false);
        // }
    }}


    return (
    <>
        <div
        className={`${
          isLoading || errorMessage ? "filter blur-sm" : ""
          } transition-all duration-300`}
        >
            <form className="mt-6" onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Senha
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                <a
                    href="#"
                    className="text-xs text-purple-600 hover:underline"
                    onClick={(e) => {
                        e.preventDefault();
                        onNewUserClick(true);
                    }}
                >
                    Não possui uma conta? <span className="text-black">Registre-se, é de graça!</span>
                </a>
                <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 active:bg-purple-800">
                        Login
                    </button>
                </div>
            </form>

            <p className="mt-8 text-xs font-light text-center text-gray-700">
                {" "}
                Não possui uma conta?{" "}
                <a
                    href="#"
                    className="font-medium text-purple-600 hover:underline"
                    onClick={onNewUserClick}
                >
                    Criar conta
                </a>
            </p>
            </div>
            {isLoading && (
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ zIndex: 9999 }}
                >
                    <Spinner />
                </div>
            )}
            {errorMessage && (
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-500"
                    style={{ zIndex: 9999 }}
                >
                    <div className="bg-red-500 text-white px-4 py-2 rounded-md">
                        Falha na autenticação. Verifique suas credenciais.
                    </div>
                </div>
            )}
        </>
    )
 
}