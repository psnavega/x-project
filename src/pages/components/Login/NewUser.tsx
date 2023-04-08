import { useState } from "react"

export default function NewUser({onLoginClick}: {onLoginClick : any}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const formData = {
            email: email,
            name: name,
            password: password,
            age: age
        };
    }


    return (
        <>
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                Criar novo usuário
            </h1>
            <form className="mt-6" onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
                    Nome
                    </label>
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="age" className="block text-sm font-semibold text-gray-800">
                    Idade
                    </label>
                    <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                    Criar conta
                    </button>
                </div>
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    Já possui uma conta? <a href="#" className="font-medium text-purple-600 hover:underline" onClick={onLoginClick}>Fazer login</a>
                </p>

            </form>
        </>
    )
}