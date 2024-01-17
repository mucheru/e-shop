import React, { Component } from "react";
import withContext from "../withContext";
import { redirect } from "react-router-dom";


class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: "",
      password:""
    };
  }
  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });


  login = (e) =>{

    const {username,password} = this.state;
    if(!username || !password){
      return this.setState({error:"fill all the fields"});
    }

    this.props.context.login(username,password)
    .then((loggedIn)=>{
      if(!loggedIn){
        this.setState({error:"invalid credentials"})
      }
    })

  };


  render (){
    return !this.props.context.user ? (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Login</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.login}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Email: </label>
                <input
                  className="input"
                  type="email"
                  name="username"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Password: </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && (
                <div className="has-text-danger">{this.state.error}</div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    ) : (
      <redirect to="/products" />
    );

  }
}
export default withContext(Login);