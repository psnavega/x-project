import { useState } from "react"
import Spinner from "../Spinner";
import Router from "next/router";

export default function NewUser({onLoginClick}: {onLoginClick : any}) {
    const [ nome, setNome ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ doublePassword, setDoublePassword ] = useState('');
    const [ idade, setIdade ] = useState('');
    const [ passwordError, setPasswordError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ sucessMessage, setSucessMessage ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = {
            email: email,
            nome: nome,
            senha: senha,
            idade: idade,
        };

        if (senha !== doublePassword) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        setIsLoading(true);
        try{
            const response = await fetch('http://localhost:4000/user',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (response.ok) {
                setIsLoading(false);
                setSucessMessage(true);
                setTimeout(() => {
                    Router.reload();
                }, 2000);
            } else {
                setIsLoading(false);
                setErrorMessage(true)
            }
        } catch (e) {
            console.log(e);
            setErrorMessage(true);            
        } finally {
            setTimeout(() => {
                setErrorMessage(false);
                setSucessMessage(false);
            }, 2000)
        }
    }

    const handlePasswordChange = (e: any) => {
        const { value } = e.target;
        setDoublePassword(value);
        if (value !== senha) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }

    const isSubmitDisabled = () => {
        return passwordError || !nome || !email || !senha || !doublePassword || !idade;
    }

    return (
        <>
            <div
            className={`${
            isLoading || errorMessage || sucessMessage ? "filter blur-sm" : ""
            } transition-all duration-300`}
            >
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                Criar novo usuário
            </h1>
            <form className="mt-6" onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="nome" className="block text-sm font-semibold text-gray-800">
                    Nome
                    </label>
                    <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
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
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                    Senha
                    </label>
                    <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="doublepassword" className="block text-sm font-semibold text-gray-800">
                    Repita sua senha
                    </label>
                    <input
                    type="password"
                    value={doublePassword}
                    onChange={handlePasswordChange}
                    className={`block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 ${passwordError ? 'border-red-500' : ''}`}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="idade" className="block text-sm font-semibold text-gray-800">
                    Idade
                    </label>
                    <input
                    type="number"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                <div className="mt-6">
                    <button className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 ${isSubmitDisabled() ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Criar conta
                    </button>
                </div>
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    Já possui uma conta? <a href="#" className="font-medium text-purple-600 hover:underline" onClick={onLoginClick}>Fazer login</a>
                </p>
            </form>
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
                        Falha na criação do usuário. Tente novamente em alguns minutos.
                    </div>
                </div>
            )}
            </div>
            {sucessMessage && (
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-500"
                    style={{ zIndex: 9999 }}
                >
                    <div className="bg-green-500 text-white px-4 py-2 rounded-md">
                        Usuário criado com sucesso, você será redirecionado para a página de login.
                    </div>
                </div>
            )}
        </>
    )
}