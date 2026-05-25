import axios from "axios";
const SERVER_URL = 'http://localhost:9000'

// @desc Get All Contacts
// @rout get "http://localhost:9000/contacts"
export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}

// @desc Get Contact with contactId
// @rout get "http://localhost:9000/contacts/:contactId"
export const getContact = (ContactId) => {
    const url = `${SERVER_URL}/contacts/${ContactId}`;
    return axios.get(url)
}

// @desc Get All groups
// @rout get "http://localhost:9000/groups"
export const getAllGroups = () => {
    const url = `${SERVER_URL}/groups`;
    return axios.get(url);
}

// @desc Get group Name with groupId
// @rout get "http://localhost:9000/:groupId"
export const getGroup = (groupId) => {
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);
}

// @desc create New contact
// @rout get "http://localhost:9000/contacts"
export const createContact=(contact)=>{
    const url=`${SERVER_URL}/contacts`;
    return axios.post(url,contact)
}

// @desc Update contact with contactId
// @rout get "http://localhost:9000/contacts/:contactId"
export const updateContact=(contact,contactId)=>{
    const url=`${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url,contact)
}

// @desc Delete Contact with contactId
// @rout get "http://localhost:9000/contacts/:contactId"
export const deleteContact=(contactId)=>{
    const url=`${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url)
}