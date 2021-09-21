import React, {useState} from "react";
import axios from "axios";

const EditContact = ({contact}) => {

    const [input, setInput] = useState({
        name: "",
        email: ""
    })

    function handleChange(event) {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        });
    }

    function handleClick(event) {
        event.preventDefault();
        const newContact = {
            contact_id: contact._id,
            name: input.name,
            email: input.email
        }
        axios.put('http://localhost:3001/update', newContact);
    }
    return <div className = "container">
        <h1> Edit Contact </h1>
        <br/>
        <form>
            <div className = 'form-group'>
                <input name="name" onChange={handleChange}  autoComplete="off" value={input.name} className = "form-control" placeholder={contact.name}/>
            </div>
            <br/>
            <div className = 'form-group'>
                <input name="email" onChange={handleChange} className = "form-control" value={input.email} autoComplete="off" placeholder={contact.email}/>
            </div>
            <br/>
            <button onClick={handleClick} className="btn btn-lg btn-info"> Submit </button>
        </form>
    </div>
}

export default EditContact;