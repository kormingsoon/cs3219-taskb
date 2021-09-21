import React, {useState} from "react";
import axios from "axios";

function CreateContact() {

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
            name: input.name,
            email: input.email
        }
        axios.post('http://localhost:3001/create', newContact);
    }

    return <div className = "container">
        <h1> Create Contact </h1>
        <br/>
        <form>
            <div className = 'form-group'>
                <input name="name" onChange={handleChange}  autoComplete="off" value={input.name} className = "form-control" placeholder="Name"/>
            </div>
            <br/>
            <div className = 'form-group'>
                <input name="email" onChange={handleChange} className = "form-control" value={input.email} autoComplete="off" placeholder="Email"/>
            </div>
            <br/>
            <button onClick={handleClick} className="btn btn-lg btn-info"> Submit </button>
        </form>
    </div>
}

export default CreateContact;