import React, { Component } from "react";

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username: "",
            password: "",
            ip: ""
        }
    }

    myChangeHandler=(event)=>{
        let nam=event.target.name;
        let val=event.target.value;
        this.setState({[nam]: val})
    }

    mySubmitHandler=(event)=>{
        event.preventDefault();
        console.log(this.state);
        this.setState({ip: "127.0.0.1"});
        fetch('http://localhost:9000/signinuser', {
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(
            this.state
        ), 
          
        // Adding headers to the request 
        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        } 
      }).then(response => response.text())
      .then(json => {
        alert(json) });
    }
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Enter username" onChange={this.myChangeHandler}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password"  name="password" className="form-control" placeholder="Enter password" onChange={this.myChangeHandler}/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}