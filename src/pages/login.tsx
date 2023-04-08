import LoginCard from "./components/LoginCard"

export default function Login() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <LoginCard></LoginCard>
        <footer className="bg-gray-300 flex justify-center items-center h-16">
          <div>
            <p className="text-white">
              © {new Date().getFullYear()} Patrick Navega. Todos os direitos reservados.
            </p>
          </div>
        </footer>
    </div>
  )
}
