import React,{useState,useEffect} from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-modal';
import { set } from 'mongoose';
import './ContactList.css';
import { Link} from 'react-router-dom';

const Contacts = () => {

    const [list,setList]=useState([]);
    const [newcontact,setNewcontact]=useState({});
    const [modalIsOpen,setIsOpen]=useState(false);
    const [editActivated,setEditActivated]=useState(false);

    useEffect(() => {
      getContacts()}, []);
  

    const getContacts=()=>{

        const fetchData = async () => {
            const result = await axios.get("/home");
                setList(result.data);
            };
            fetchData();
            }
    
    const addContact=()=>{

      axios.get(`/add/${newcontact.firstname}/${newcontact.lastname}/${newcontact.telephone}/${newcontact.email}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });


    }

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

<table className="table table-dark">
<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">First Name</th>
    <th scope="col">Last Name</th>
    <th scope="col">Telephone</th>
    <th scope="col">Email</th>
    <th scope="col"><button type="button" className="btn btn-success" onClick={()=>{setIsOpen(!modalIsOpen)}}>Add New Contact</button></th>
  </tr>
</thead>
<tbody>
        {list.map((el,index)=>(

  <>
  <tr key={index}>
    <th scope="row">{index+1}</th>
    <td>{el.firstname}</td>
    <td>{el.lastname}</td>
    <td>{el.telephone}</td>
    <td>{el.email}</td>
    <td><button type="button" className="btn btn-secondary"><Link   to={`/edit/${el._id}`}> Edit</Link></button>
    
    
    <button type="button" className="btn btn-danger" onClick={()=>{ 
    
    axios.get(`/delete/${el.firstname}`);
          getContacts();
      }}>Delete</button></td>
  </tr>



  
  <Modal  id='modal' isOpen={modalIsOpen} onRequestClose={()=>{setIsOpen(false);
  
setEditActivated(false);


}




} shouldCloseOnOverlayClick={false}>

<h2>New Contact</h2>

<form onSubmit={e=>{

e.preventDefault()

setIsOpen(false);

if (editActivated) {
  
  editContact(el._id);
  setEditActivated(false);
}
else{addContact()}

getContacts();

setNewcontact({});

}}>

<label htmlFor='firstname'>First Name</label> <input type='text' name='firstname' placeholder={editActivated?el.firstname:'Enter First Name'} onChange={e=>{


setNewcontact({firstname:e.target.value})


}}  required/><br/>

<label htmlFor='lastname'>Last Name</label><input type="text" name='lastname' placeholder={editActivated?el.lastname:'Enter last Name'}
onChange={e=>{


setNewcontact({ ...newcontact, lastname:e.target.value})



}}  required/>



<br/>



<label htmlFor="telephone">Telephone</label> <input type='text'  name="telephone" placeholder={editActivated?el.telephone:'Enter your phone number'} 

onChange={e=>{


setNewcontact({ ...newcontact, telephone:e.target.value})



}}/><br/>

<label htmlFor="email">Email</label> <input type='text'  name="email" placeholder={editActivated?el.email:'Enter your Email Adress'} onChange={e=>{


setNewcontact({ ...newcontact, email:e.target.value})



}}/><br/><br/>


<input type="submit" value={editActivated?"edit contact":"add contact"}/>

</form> <br/><br/>

<button onClick={()=>{
  
  setIsOpen(false)
  setEditActivated(false)
  
  
  
  }}>

Fermer le modal

</button>

</Modal>







  </>
        ))} 
</tbody>
</table>

</div>
    )
}

export default Contacts
