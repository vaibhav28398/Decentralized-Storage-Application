import React, { Component } from "react";

export default class SignUp extends Component {

    constructor(props){
        super(props);
        this.state={
            username: '',
            password: ''
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
    }
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Username" onChange={this.myChangeHandler}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={this.myChangeHandler}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>

        );
    }
}