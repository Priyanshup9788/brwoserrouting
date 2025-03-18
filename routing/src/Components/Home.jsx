import React, { useEffect, useState } from 'react'

const Home = () => {

  const [allEmp,setAllEmp]=useState(()=>{
    let epmloyes = localStorage.getItem("emp");

    return epmloyes ? JSON.parse(epmloyes) : [];
  })

  const [newEmp,setNewEmp]=useState(
    {
      name:"",email:""
    }
  );

  useEffect(()=>{
    localStorage.setItem("emp",JSON.stringify(allEmp));
  },[allEmp])

  const onInputChange=(e)=>{
    setNewEmp({...newEmp,[e.target.name]:e.target.value});
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
    newEmp.email=""
  }

  return (
    <div className="container">
        <h2>Enter Your Details</h2>
        <form onSubmit={(e)=>onFormSubmit(e)} id="dataForm">
            <label htmlFor="name">Name:</label>
            <input onChange={(e)=>onInputChange(e)} name="name" type="text" id="name" value={newEmp.name} required />
            
            <label htmlFor="email">Email:</label>
            <input onChange={(e)=>onInputChange(e)} name="email" type="email" id="email" value={newEmp.email} required />
            
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Home