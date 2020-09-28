import React,{useState,useEffect} from 'react'
import axios from "axios";
import { Route,Redirect,Link } from 'react-router-dom';

const Edit = (props) => {

    const [newcontact,setNewcontact]=useState({})
    const [submitted,setSubmitted]=useState(false)
    const [contactToEdit,setcontactToEdit]=useState({})

    useEffect(() => {
        getContacts()}, []);
    

    const getContacts=()=>{

        const fetchData = async () => {
            const result = await axios.get(`/find/${props.match.params.id}`);
                setcontactToEdit(result.data);
            };
            fetchData();
            }

            getContacts()
            
            
















    const editContact=(id) =>{

     
        axios.get(`/edit/${id}/${newcontact.firstname}/${newcontact.lastname}/${newcontact.telephone}/${newcontact.email}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        }







    return (
        <div>
        <h2>New Contact</h2>

<form onSubmit={e=>{

e.preventDefault();

editContact(props.match.params.id);

setNewcontact({})

setSubmitted(true)

}}>

<label htmlFor='firstname'>First Name</label> <input type='text' name='firstname' placeholder={contactToEdit.firstname} onChange={e=>{



setNewcontact({firstname:e.target.value})


}}  required/><br/>

<label htmlFor='lastname'>Last Name</label><input type="text" name='lastname' placeholder={contactToEdit.lastname}  onChange={e=>{


setNewcontact({ ...newcontact, lastname:e.target.value})



}}  required/>



<br/>



<label htmlFor="telephone">Telephone</label> <input type='text'  name="telephone" placeholder={contactToEdit.telephone} onChange={e=>{


setNewcontact({ ...newcontact, telephone:e.target.value})



}}/><br/>

<label htmlFor="email">Email</label> <input type='text'  name="email"  placeholder={contactToEdit.email} onChange={e=>{


setNewcontact({ ...newcontact, email:e.target.value})



}}/><br/><br/>










<input type="submit" value="Edit contact"/>

</form> 



<Link  to='/'>Return to list</Link>

<Route
        
        render={() => !submitted ?
        null
        : <Redirect to='/'/>} />
            
</div>
    )
}

export default Edit
