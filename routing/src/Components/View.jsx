import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const View = () => {

    const [allEmp,setAllEmp]=useState(()=>{
        let epmloyes = localStorage.getItem("emp");
    
        return epmloyes ? JSON.parse(epmloyes) : [];
      });

      const onDelete=(e,id)=>{
        e.preventDefault();
        setAllEmp(allEmp.filter((emp)=> emp.id!== id));
      }
    
      useEffect(()=>{
          localStorage.setItem("emp",JSON.stringify(allEmp));
        },[allEmp])

  return (
    <div className="container">
    <h2>Submitted Data</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        
        <tbody>
            {allEmp.map((emp,i)=>(
                <tr key={i}>
                <td id="displayName">{emp.name}</td>
                <td id="displayEmail">{emp.email}</td>
                <td><button onClick={(e)=>onDelete(e,emp.id)}>Delete</button> || <Link to={"/edit/"+emp.id}>Edit</Link></td>
            </tr>
            ))}
            
        </tbody>
    </table>
</div>
  )
}

export default View