export default function Footer() {
    return(
        <footer className="bg-gray-300 flex justify-center items-center h-16">
          <div>
            <p className="text-white">
              © {new Date().getFullYear()} Patrick Navega. Todos os direitos reservados.
            </p>
          </div>
        </footer>
    );
}