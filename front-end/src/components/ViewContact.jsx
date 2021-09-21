import React, {useEffect, useState} from "react";
import axios from "axios";
import ModalButton from "./ModalButton";
import PopUp from "../pages/Popup";
import '../css/style.css'

export default function ViewContact(){
    const [contacts, setContacts] = useState([{
        id: "",
        name: "",
        email: ""
    }])

    useEffect( () => {
        fetch("http://localhost:3001/retrieve").then( res => {
            if (res) {
                return res.json()
            }
        }).then(jsonRes => setContacts(jsonRes))
    })

    function handleDelete(contactId) {
        axios.delete(`http://localhost:3001/delete`, {params: {contactId}});
    }

    function handleUpdate(contactId) {
        return (<ModalButton/>);
        // axios.patch(`http://localhost:3001/update`, {params: {contactId}});
    }

    return <div className ='container'>
        <h1> Contact List </h1>
        {contacts.map (contact => 
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>ID:</td>
                            <td> {contact._id} </td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td> {contact.name} </td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td> {contact.email} </td>
                        </tr>
                        <tr>
                            <td><PopUp contact = {contact}/></td>
                            <td>                     <button onClick={() => handleDelete(contact._id)} className="btn btn-lg btn-info"> Delete </button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )}
    </div>
}