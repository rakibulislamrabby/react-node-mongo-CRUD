import React from 'react';

const AddUser = () => {
    const handleAddUSer = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const user = { name, email };

        //send data to server
        fetch("http://localhost:5000/user", {
            method: "POST",
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(user)

        })
            .then(res => res.json())
            .then(data => {
                console.log("success", data)
                alert("Added Successfully")
            })

    }
    return (
        <div>
            <h2>Add New User</h2>
            <form onSubmit={handleAddUSer}>
                <input type="text" placeholder='Your Name' name='name' required />
                <br />
                <input type="text" placeholder='Your Email' name='email' required />
                <br />
                <button>Add User</button>
            </form>
        </div>
    );
};

export default AddUser;