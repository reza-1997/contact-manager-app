import SearchContact from "./Contact/SearchContact"
import { GREENBLUE } from "../helpers/Color"
import { useLocation } from "react-router-dom"
import Colorfully from "./hoc/Colorfully"
import { RiContactsBook3Fill } from "react-icons/ri";


const Navbar = () => {
    const location = useLocation()

    return (
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg"
        // style={{ backgroundColor: BACKGROUND }}
        >
            <div className="container">
                <div className="row w-100">
                    <div className="col my-2">
                        <div className="navbar-brand">
                            <RiContactsBook3Fill style={{ color: GREENBLUE, fontSize: 30 }} />  وب اپلیکیشین مدیریت {''}
                            <span style={{ color: GREENBLUE }}>مخاطبین</span>
                        </div>
                    </div>
                    <div className="col">
                        {location.pathname === '/contacts' ?
                            (<SearchContact />)
                            : null}

                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Colorfully(Navbar)