import '../styles/Banner.css'
import logo from '../assets/pokedex.png'

function Banner() {
    return (
        <div className="banner">
            <img className="logo-pokedex" src={logo} alt="logo-pokedex" />
        </div>
    )
}

export default Banner