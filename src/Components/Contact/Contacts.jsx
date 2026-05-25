import { Fragment } from "react/jsx-runtime";
import { BACKGROUND, GREEN, WARNING } from "../../helpers/Color";
import { Contact, Spinner } from "../index";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const Contacts = () => {
    const { loading, deleteContact, filteredContact } = useContext(ContactContext)
    return (
        <Fragment>
            <section className="container">
                <div className="d-grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <Link to={'/contacts/add'} type="button" className="btn float-end m-2" style={{ backgroundColor: GREEN }}>

                                    <i className="fa fa-plus-circle"></i> {' '}
                                    ساخت مخاطب جدید
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            {loading ? <Spinner /> : (
                <section className="container">
                    <div className="row">
                        {filteredContact.length > 0
                            ? (filteredContact.map(c =>
                                <Contact key={c.id} Contact={c}
                                    deleteContact={() => deleteContact(c.id, c.fullname)}
                                />)
                            ): (
                                <div className="text-center py-5" style={{ backgroundColor: BACKGROUND }}>
                                    <p className="h3 py-2" style={{ color: WARNING }}>مخاطب پیدا نشد...</p>
                                    <img src={require("../../assets/no-found.gif")} alt="پیدا نشد..." className="w-25 text-warning" />
                                </div>
                            )
                        }
                    </div>

                </section>
            )}


        </Fragment>
    )
}
export default Contacts