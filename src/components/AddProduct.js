import axios from "axios";
import React, { Component } from "react";
import { redirect } from "react-router-dom";
import withContext from "../withContext";


const initState = {

  name: "",
  price: "",
  stock: "",
  shortDesc: "",
  description: ""
    
};

class AddProduct extends Component{


  constructor(props){
    super(props);
    this.state = initState; 
  }

  save = async (e)=>{
    e.preventDefault();
    const { name,price,stock,shortDesc,description} = this.state;

    if(name && price){
      const id = Math.random().toString(36).substring(2) +Date.now().toString(36);

      await axios.post('http://localhost:3001/products',{id,name, price, stock, shortDesc, description });

      this.props.context.AddProduct(
        {
          name,
          price,
          shortDesc,
          description,
          stock: stock || 0
      },
      ()=>this.setState(initState)
      
      );

      this.setState(
        {flash:{status:'is-success',msg:'Product created successfully'}}
      )
    }else{
      this.setState({
        flash:{status:'danger',msg:'Please enter the name and the price'}
      })
    }

  };

  handleChange = e =>this.setState({[e.target.value]:e.target.value,error:""});

  render (){
    const { name, price, stock, shortDesc, description } = this.state;
    const {user} = this.props.context;

    return !(user && user.accessLevel < 1) ?(
      <redirect to= '/'/>
    ):(
      <>
      <div className="hero is-primary">
        <div className=" hero-body container">
          <h4 className="title">Add Product</h4>

        </div>

      </div>
      <br/>
      <br/>


      <form onSubmit={this.save}>
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            <div className="field">
            <label className="label">Product Name: </label>
            <input 
            className="input" 
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            required/>

            </div>

            <div className="field">
            <label className="label">Price: </label>
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  required
                  />

            </div>

            <div className="field">
                <label className="label">Available in Stock: </label>
                <input
                  className="input"
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={this.handleChange}
                />
              </div>

              <div className="field">
                <label className="label">Short Description: </label>
                <input
                  className="input"
                  type="text"
                  name="shortDesc"
                  value={shortDesc}
                  onChange={this.handleChange}
                />
              </div>

              <div className="field">
                <label className="label">Description: </label>
                <textarea
                  className="textarea"
                  type="text"
                  rows="2"
                  style={{ resize: "none" }}
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                />
              </div>

              {this.state.flash && (
                <div className={`notification ${this.state.flash.status}`}>
                  {this.state.flash.msg}

                </div>
              )}

          </div>

          <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.save}
                >
                  Submit
                </button>
              </div>

        </div>

      </form>
      </>
    )


    
  }


}
export default withContext(AddProduct);