import React from "react";
import CreateContact from "../components/CreateContact";
import ViewContact from "../components/ViewContact"

function Home() {
    return (
    <div>
        <CreateContact/>
        <br></br>
        <ViewContact/>
    </div>);
}

export default Home;