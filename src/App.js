import { useEffect } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AddContact, Contacts, EditContact, Navbar, ViewContact } from "./Components";
import { createContact, deleteContact, getAllContacts, getAllGroups } from "./services/contactService";
import { confirmAlert } from "react-confirm-alert";
import { BACKGROUND, COMMENT, GREEN2, GREENBLUE, GREENBLUELIGHT } from "./helpers/Color";
import { ContactContext } from "./context/contactContext";
import _ from "lodash";
import { useImmer } from "use-immer";
import { toast, ToastContainer } from "react-toastify";







const App = () => {

  const [contacts, setContacts] = useImmer([]);
  const [loading, setLoading] = useImmer(false)
  const [groups, setGroups] = useImmer([]);
  // const [contact, setContact] = useState({})
  const [filteredContact, setFilteredContact] = useImmer([])
  // const [errors, setErrors] = useState([])




  const navigate = useNavigate()

  // let filterTimeout;
  const contactSearch = _.debounce((event) => {
    // clearTimeout(filterTimeout)

    if (!event) return setFilteredContact([...contacts])

    // filterTimeout = setTimeout(() => {
    setFilteredContact(contacts.filter((contact) => {
      return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase());
    }))
    // }, 1000);
  }, 1000)


  // const onContactChange = (e) => {

  //   setContact({ ...contact, [e.target.name]: e.target.value })

  // }

  const createContactForm = async (values) => {
    // e.preventDefault();
    try {
      setLoading((prevLoading) => !prevLoading)



      const { status, data } = await createContact(values)
      if (status === 201) {

        // const allContacts = [...contacts, data]
        // setContacts(allContacts);
        // setFilteredContact(allContacts)
        toast.success("مخاطب با موفقیت اضافه شد✅")
        setContacts((draft) => {
          draft.push(data)
        })
        setFilteredContact((draft) => {
          draft.push(data)
        })


        setLoading((prevLoading) => !prevLoading)
        navigate('/contacts')
      }
    } catch (err) {
      console.log(err.message);
      console.log(err.inner);
      // setErrors(err.inner)
      setLoading(false)


    }


  }


  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts()
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData)
        setFilteredContact(contactsData)
        setGroups(groupsData)
        setLoading(false)

      } catch (error) {
        console.log(error.message);
        setLoading(false)
      }

    }
    fetchData()
  }, [setContacts, setFilteredContact, setGroups, setLoading])

  const removeContact = async (contactId) => {
    //contacts copy
    const contactsBackup = [...contacts];

    try {
      //delete state before server request
      // const updateContacts = allContacts.filter(c => c.id !== contactId)
      // setContacts(updateContacts);
      // setFilteredContact(updateContacts)
      toast.error('مخاطب با موفقیت حذف شد❌')
      
      setContacts((draft) => {
       return draft.filter(dra => dra.id !== contactId)
      })
      setFilteredContact((draft) => {
       return draft.filter(dra => dra.id !== contactId)
      })



      
      //sending delete request to server
      const { status } = await deleteContact(contactId);

      if (status !== 200) {
        setContacts(contactsBackup);
        setFilteredContact(contactsBackup)
      }

    } catch (error) {
      console.log(error.message);
      setContacts(contactsBackup)
      setFilteredContact(contactsBackup)
    }
  }

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div dir='rtl' className='p-4'
            style={{
              backgroundColor: BACKGROUND,
              border: `1px solid ${GREENBLUE}`,
              borderRadius: '1em'
            }}>
            <h1 style={{ color: GREEN2 }}>حذف مخاطب</h1>
            <p style={{ color: GREENBLUELIGHT }}>آیا مطمئنی که میخوای مخاطب {contactFullname} رو حذف کنی؟</p>
            <button
              onClick={() => {
                removeContact(contactId)
                onClose();
              }}
              className='btn mx-2' style={{ backgroundColor: GREENBLUE }}>
              بله، حذفش کن!!            </button>
            <button onClick={onClose}
              className='btn'
              style={{ backgroundColor: COMMENT }}> انصراف</button>
          </div>
        );
      }
    })
  }



  return (
    <ContactContext.Provider
      value={{
        // loading:loading      وقتی اسم با کلید یکی باشه ، نیاز نیست دوباره اسم گذاری بشه
        loading,
        setLoading,
        // contact,
        // setContact,
        contacts,
        groups,
        setContacts,
        filteredContact,
        setFilteredContact,
        // onContactChange,
        deleteContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
        // errors
      }}
    >
      <div className="App">
        <ToastContainer rtl={true} position="top-right" theme="colored" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={'contacts'} />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/Contacts/add" element={<AddContact />} />
          <Route path="/Contacts/edit/:contactId" element={<EditContact />} />
          <Route path="/Contacts/:contactId" element={<ViewContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>


  )
}
export default App










