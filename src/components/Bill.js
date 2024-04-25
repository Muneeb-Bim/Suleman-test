import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function Bill() {
  const [list, setList] = useState();

  const [data, setData] = useState({
    names: "",
    orderdate: "",
    pname: "",
    uprice: "",
    pquantity: "",
  });
  const [editClick, setEditClick] = useState(false);
  const [editIndex,setEditIndex] = useState("");
  const [verified,setVerified] = useState(false);
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }
  useEffect(()=>{
    if(localStorage.getItem("Items")){
      setList(JSON.parse(localStorage.getItem("Items")))
  }
  },[])
  const handleInputChang = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const saveData = (e) => {
    // e.preventDefault()
    if(editClick){
      let tempData= list;
      Object.assign(tempData[editIndex] , data);
      setData([...tempData]);
      localStorage.setItem("Items",JSON.stringify(tempData));
      setEditClick(false);
      setData({
        names: "",
        orderdate: "",
        pname: "",
        uprice: "",
        pquantity: "",
      });
    }
    else{
      let listItems = JSON.parse(localStorage.getItem("Items")) ?? [];
    listItems.push(data);
    localStorage.setItem("Items",JSON.stringify(listItems));
    setList(listItems)

    setData({
      names: "",
      orderdate: "",
      pname: "",
      uprice: "",
      pquantity: "",
    });   
    setVerified(false);       
    }
  };

  const DeleteItems = (id) => {
    let listItems = JSON.parse(localStorage.getItem("Items")) ?? [];
        listItems.splice(id, 1);
        localStorage.setItem("Items", JSON.stringify(listItems));
    setList(listItems)
  };
const editItems= (index)=> {
  let eItems=list[index]
  // console.log('eItems',eItems)
  setData({
    names: eItems.names,
    orderdate: eItems.orderdate,
    pname: eItems.pname,
    uprice: eItems.uprice,
    pquantity: eItems.pquantity,
  })
  setEditClick(true);
  setEditIndex(index);
}
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="container">
          <h1 className="text-center display-4">
            <b>Billing Form</b>
          </h1>
        <form onSubmit={saveData}>
          <div className="form-group">
            <label>Enter Your Name</label>
            <input
              required
              type="text"
              name="names"
              value={data.names}
              className="form-control"
              placeholder="Enter Name"
              onChange={handleInputChang}
            />
            
            
          </div>
          <div className="form-group">
            <label>Order Date</label>
            <input
              required
              type="date"
              name="orderdate"
              value={data.orderdate}
              className="form-control"
              placeholder="select date"
              onChange={handleInputChang}
            />
           
          </div>
          <div className="form-group">
            <label>Product Name</label>
            <input
              required
              type="text"
              name="pname"
              value={data.pname}
              className="form-control"
              placeholder="Product Name"
              onChange={handleInputChang}
            />
           
          </div>
          <div className="form-group">
            <label>Product Price</label>
            <input
            required
              type="number"
              name="uprice"
              value={data.uprice}
              className="form-control"
              placeholder="Enter Price"
              onChange={handleInputChang}
            />

          </div>
          <div className="form-group">
            <label>Product Quantity</label>
            <input
              required
              type="number"
              name="pquantity"
              value={data.pquantity}
              className="form-control"
              placeholder="Enter Quantity"
              onChange={handleInputChang}
            />
             
          </div>
          <ReCAPTCHA
            sitekey="6Lev4q4oAAAAABA8TXFKGKecocwtK47XpUW_C_wo"
            onChange={onChange}
          />
          <div className="form-group">
            <button type="submit" className="btn btn-primary mt-3" disabled={!verified}>{editClick ? "Update": "Save data"}</button>
          </div>
          </form>
        </div>
        
      </div>
      
      <div className="col-md-6">
        <div className="container">
          <h1 className="text-center display-4">
            <b>See Customers History</b>
          </h1>
          <div className="alert alert-info" name="show">
            
          {list?.map((item,i)=>(
            <div key={i+1}>
              <button id="width" className="btn btn-danger " onClick={()=>DeleteItems(i)}><span>Clear</span></button>
              <button id="width"  className="btn btn-info ml-3 " onClick={()=>editItems(i)}><span> Edit</span></button>
              <h5>Customer Name:</h5>
              {item.names}
              <h5>Date:</h5>
              {item.orderdate}
              <h5>Product Name:</h5>
              {item.pname}
              <h5>Product Price:</h5>
              {item.uprice}
              <h5>Product Quantity:</h5>
              {item.pquantity}
              <hr></hr>

            </div>
          ))
          
          }

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bill;
