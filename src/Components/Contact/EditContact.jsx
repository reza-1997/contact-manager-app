import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import Spinner from "../Spinner";
import {  getContact, updateContact } from "../../services/contactService";
import { COMMENT, GREEN, GREENBLUE } from "../../helpers/Color";
import { ContactContext } from "../../context/contactContext";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { contactSchema } from "../../validations/contactValidation";
import {useImmer} from 'use-immer'
import { toast } from "react-toastify";


const EditContact=()=>{

    const {contactId}=useParams();
    const navigate=useNavigate();

    const [contact,setContact]=useImmer({})

    const{loading,setLoading,setFilteredContact,setContacts,groups}=useContext(ContactContext)

    useEffect(()=>{
        const fetchData=async()=>{
try {
        setLoading(true)
    const{data:dataContact}=await getContact(contactId)
    
    setLoading(false);
    setContact(dataContact);

} catch (error) {
    console.log(error.message);
    setLoading(false)
    
}
        }
        fetchData()
    },[contactId, setContact, setLoading])

//     const setContactInfo=(e)=>{
// setContact({...contact,[e.target.name]: e.target.value})
//     }

    
    const submitForm=async(values)=>{
        
try {
    setLoading(true)
    const {data,status}=await updateContact(values,contactId)
    if (status===200) {
        setLoading(false)
        toast.info("اطلاعات مغاطب ویرایش شد🪒")
        
// const allContacts=[...contacts]
// const contactIndex=allContacts.findIndex((contact)=> contact.id===parseInt(contactId) )
// console.log(allContacts[contactIndex]);

//     allContacts[contactIndex]={...data}

//     setContacts(allContacts)
//     setFilteredContact(allContacts)
setContacts((draft)=>{
        const contactIndex=draft.findIndex((contact)=>contact.id===(contactId));
        draft[contactIndex]={...data}
    })
    setFilteredContact((draft)=>{
        const contactIndex=draft.findIndex((contact)=>contact.id===(contactId))
        draft[contactIndex]={...data}
    })
        navigate('/contacts')

    }
} catch (error) {
    console.log(error.message);
    setLoading(false)
}
    }



return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="p-3">
                        <img
                            src={require("../../assets/man-taking-note.png")}
                            alt=""
                            height="400px"
                            style={{
                                position: "absolute",
                                zIndex: "-1",
                                top: "130px",
                                left: "100px",
                                opacity: "50%",
                            }}
                        />
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p
                                        className="h4 fw-bold text-center"
                                        style={{ color: GREEN }}
                                    >
                                        ویرایش مخاطب 
                                    </p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: GREEN }} />
                            <div className="row mt-5">
                                <div className="col-md-4">
                             <Formik
                                                                     initialValues={contact}
                                                                     validationSchema={contactSchema}
                                                                     onSubmit={(values) => {
                                                                         console.log(values);
                                                                         submitForm(values)
                                                                     }
                             
                             
                                                                     }
                                                                 >
                             
                                                                     <Form >
                                                                         <div className="mb-2">
                                                                             <Field
                                                                                 name="fullname"
                                                                                 type="text"
                                                                                 className="form-control"
                                                                                 placeholder="نام و نام خانوادگی"
                                                                             />
                                                                             <ErrorMessage className="text-danger"
                                                                                 component='div' name="fullname"/>
                                                                         </div>
                             
                             
                                                                         <div className="mb-2">
                                                                             <Field
                                                                                 name="photo"
                                                                                 type="text"
                                                                                 className="form-control"
                                                                                 placeholder="آدرس تصویر"
                                                                             />
                                                                             <ErrorMessage className="text-danger"
                                                                                 component='div' name="photo"/>
                             
                                                                         </div>
                             
                             
                                                                         <div className="mb-2">
                                                                             <Field
                                                                                 name="mobile"
                                                                                 type="number"
                                                                                 className="form-control"
                                                                                 placeholder="شماره موبایل"
                                                                             />
                                                                             <ErrorMessage className="text-danger"
                                                                                 component='div' name="mobile"/>
                             
                                                                         </div>
                             
                             
                                                                         <div className="mb-2">
                                                                             <Field
                                                                                 type="email"
                                                                                 name="email"
                                                                                 className="form-control"
                                                                                 placeholder="آدرس ایمیل"
                                                                             />
                                                                             <ErrorMessage className="text-danger"
                                                                                 component='div' name="email"/>
                             
                                                                         </div>
                             
                             
                                                                         <div className="mb-2">
                                                                             <Field
                                                                                 type="text"
                                                                                 name="job"
                                                                                 className="form-control"
                                                                                 placeholder="شغل"
                                                                             />
                             
                                                                         </div>
                             
                                                                         <div className="mb-2">
                                                                             <Field
                                                                                 name="group"
                                                                                 as='select'
                                                                                 className="form-control"
                                                                             >
                                                                                 <option value="">انتخاب گروه</option>
                                                                                 {
                                                                                     groups.length > 0 &&
                                                                                     groups.map((group) => (
                                                                                         <option key={group.id} value={group.id}>
                                                                                             {group.name}
                                                                                         </option>
                                                                                     ))
                                                                                 }
                                                                             </Field>
                                                                             <ErrorMessage className="text-danger"
                                                                                 component='div' name="group"/>
                             
                                                                         </div>
                             
                             
                                                                         <div className="mx-2">
                                                                             <input
                                                                                 type="submit"
                                                                                 className="btn"
                                                                                 style={{ backgroundColor: GREENBLUE }}
                                                                                 value="ویرایش مخاطب"
                                                                             />
                                                                             <Link
                                                                                 to={"/contacts"}
                                                                                 className="btn mx-2"
                                                                                 style={{ backgroundColor: COMMENT }}
                                                                             >
                                                                                 انصراف
                                                                             </Link>
                                                                         </div>
                                                                     </Form>
                             
                                                                 </Formik>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>

    )
}
export default EditContact











