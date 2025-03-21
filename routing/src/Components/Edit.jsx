import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';

const Edit = () => {

  let id = useParams();
  
  console.log(id);
  
  const [allEmp,setAllEmp]=useState(()=>{
    let epmloyes = localStorage.getItem("emp");
    
    return epmloyes ? JSON.parse(epmloyes) : [];
  })
  
  const [emp,setEmp]=useState(
    ()=>{
      console.log(id.index)
      let indexData = allEmp.findIndex((v,i)=>v.id==parseInt(id.index));
      return allEmp[indexData];
    }
  );
  console.log(emp);
  
  useEffect(()=>{
    localStorage.setItem("emp",JSON.stringify(allEmp));
  },[allEmp])
  



  const onInputChange=(e)=>{
    setEmp({...newEmp,[e.target.name]:e.target.value});
  }

  const onFormSubmit=(e)=>{
    e.preventDefault();
    
    let newId = allEmp.length > 0 ? Math.max(...allEmp.map((prod) => prod.id) )+ 1 : 1
    if(!newEmp.name || !newEmp.email){
      alert("Fill all field");
      return;
    }
    setAllEmp([...allEmp,{...newEmp , id:newId}]);
    newEmp.name="";
    newEmp.email="";
    
  }

  return (
    <div className="container">
        <h2>Enter Your Details</h2>
        <form onSubmit={(e)=>onFormSubmit(e)} id="dataForm">
            <label htmlFor="name">Name:</label>
            <input onChange={(e)=>onInputChange(e)} name="name" type="text" id="name" value={emp.name?emp.name:""} required />
            
            <label htmlFor="email">Email:</label>
            <input onChange={(e)=>onInputChange(e)} name="email" type="email" id="email" value={emp.email?emp.email:""}  required />
            
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Edit