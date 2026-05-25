import { Link } from "react-router-dom";
import { BACKGROUND, GREEN2, CYAN, ERROR, GREENBLUE } from "../../helpers/Color";

const Contact = ({ Contact , deleteContact}) => {

    return (
        <div className="col-md-6">
            <div className="card my-2" style={{ backgroundColor: BACKGROUND }}>
                <div className="card-body">
                    <div className="row align-items-center justify-content-around d-flex">
                        <div className="col-md-4 col-sm-4">
                            <div className="card-img">
                                <img src={Contact.photo}
                                    alt={Contact.fullname}
                                    className="img-fluid rounded"
                                    style={{ border: `1px solid ${GREENBLUE}` }} />
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-7">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-dark">
                                    نام و نام خانوادگی:
                                    <span className="fw-bold">{Contact.fullname}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                    شماره موبایل:
                                    <span className="fw-bold">{Contact.mobile}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                    آدرس ایمیل:
                                    <span className="fw-bold">{Contact.email}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-1 col-sm-1 d-flex flex-row flex-sm-column  align-items-center">
                            <Link to={`/contacts/${Contact.id}`} type="button" style={{ backgroundColor: GREEN2 }} className="btn my-1"> <i className="fa fa-eye" ></i></Link>
                            <Link  to={`/contacts/edit/${Contact.id}`} type="button" style={{ backgroundColor: CYAN }} className="btn my-1"> <i className="fa fa-pencil" ></i></Link>
                            <button onClick={deleteContact} type="button" style={{ backgroundColor: ERROR }} className="btn my-1"> <i className="fa fa-trash" ></i></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Contact;