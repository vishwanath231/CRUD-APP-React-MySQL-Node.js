import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';


const App = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [data, setData] = useState([]);

    //Get User details
    const [userId, setUserId] = useState("");
    const [getName, setGetName] = useState("");
    const [getEmail, setGetEmail] = useState("");

    //show and hide 
    const [show, setShow] = useState(false);


    //Name Event
    const nameHandler = (e) => {
        setName(e.target.value);
    }

    //Email Event
    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    // Create User 
    const addUser = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/create', {
            name: name,
            email: email
        }).then(() => {
            setData([...data, {
                name: name,
                email: email
            }]);
        });

        e.target.reset();
    }

    



    // Get the all User Data
    useEffect(() => {
       axios.get('http://localhost:5000/user')
        .then((response) => 
            setData(response.data)
        )
    }, [])


    //Delete the user
    const deleteUser = (id) => {
        axios.delete(`http://localhost:5000/delete/${id}`)
        .then((response) => {
            setData(data.filter((val)=> {
                return val.id !== id;
            }))
        })
    }
    

    // Select the Id
    const selectUpdateUser = (id,name,email) => {
        axios.get(`http://localhost:5000/selectUpdate/${id}`)
        .then(() => {
            setUserId(id);
            setShow(true);
            setGetName(name);
            setGetEmail(email);
        })
    }

    // Update the user
    const updateUser = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:5000/update`, {
            id: userId,
            name: name,
            email: email
        }).then(() => {
            setData(data.map((val) => {
                return val.id === userId ? {
                    id: val.id,
                    name: name,
                    email: email
                } : val
            }));
            setShow(false);
        });

        e.target.reset();
    }

    const hideUpdate = () => {
        setShow(false);
    }


    return (
        <>
            <div className="container">
                <header>
                    <p>[MySQL]ERN 👉🏻 CRUD</p>
                </header>
                <div className="grid">

                    {
                        show ? (
                            <div className="form__container update">
                                <div className="title">Update</div>
                                <form className="form" onSubmit={updateUser}>
                                    <input type="hidden" value={userId} />
                                    <div className="form__div">
                                        <label>Name</label>
                                        <input type="text" id="name"  onChange={nameHandler} required/>
                                    </div>
                                    <div className="form__div">
                                        <label>Email</label>
                                        <input type="email"  onChange={emailHandler} required/>
                                    </div>
                                    <button type="submit">Update</button>
                                    <div className="retrunRegister" onClick={hideUpdate}>New Register</div>
                                </form>
                                <p>Name : {getName}</p>
                                <p>Email : {getEmail}</p>
                            </div>
                            
                        ) : (
                            <div className="form__container register">
                                <div className="title">Register</div>
                                <form className="form" onSubmit={addUser}>
                                    <div className="form__div">
                                        <label>Name</label>
                                        <input type="text" id="name" onChange={nameHandler} required/>
                                    </div>
                                    <div className="form__div">
                                        <label>Email</label>
                                        <input type="email" onChange={emailHandler} required/>
                                    </div>
                                    <button type="submit">submit</button>
                                </form>
                            </div>
                        )
                    }
                    
                    <div className="recordContainer">
                        <div className="title">Record</div>
                        <table>
                            <thead >
                                <tr>
                                    <th>SNO</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr>
                                            <td data-column="S.NO">{index + 1 }.</td>
                                            <td data-column="Name">{item.name}</td>
                                            <td data-column="Email">{item.email}</td>
                                            <td data-column="Update"><button onClick={() => {selectUpdateUser(item.id, item.name, item.email)}} ><FontAwesomeIcon icon={faPencilAlt} className="updateIcon"  /></button></td>
                                            <td data-column="Delete"><button onClick={() => {deleteUser(item.id)}} ><FontAwesomeIcon icon={faTrash} className="deleteIcon" /></button></td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;
