import LoginCard from "./components/LoginCard"
import Footer from "./components/Footer"

export default function Login() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <LoginCard></LoginCard>
        <Footer></Footer>
    </div>
  )
}
