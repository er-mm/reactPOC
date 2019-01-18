import React from "react";
import PropTypes from "prop-types";
import fetch from 'isomorphic-fetch';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class Registration extends React.Component{

    constructor(props){
        super();
        //this.age = props.age;
        this.state={
            fields: {},
           errors: {}
        }
    }

   /*********************************FORM VALIDATION********************************************* */
   
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        //Name
        if(!fields["name"] || typeof fields["name"] == "undefined" || typeof fields["name"] == undefined){
           formIsValid = false;
           errors["name"] = "Cannot be empty";
        }

      //pwd
        if(!fields["pwd"] || typeof fields["pwd"] == "undefined" || typeof fields["pwd"] == undefined){
                   formIsValid = false;
                   errors["pwd"] = "Cannot be empty";
                }

        //gender
        
        if(!fields["gen"] || typeof fields["gen"] == "undefined" || typeof fields["gen"] == undefined){
              formIsValid = false;
              errors["gen"] = "Cannot be empty";
           }else if(fields["gen"].toUpperCase() == 'MALE' || fields["gen"].toUpperCase() == 'FEMALE' || fields["gen"].toUpperCase() == 'OTHERS'){
        		 formIsValid = true;
           }else {
    	  formIsValid = false;
          errors["gen"] = "please type male or female or others only";
      } 
       this.setState({errors: errors});
       return formIsValid;
   }


    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

   
   
  /********************************************************************************************************************** */ 
   
    
     myFunc(e){
         e.preventDefault();
        if(this.handleValidation()){
        var uname = document.getElementById("uname").value;
        var pwd = document.getElementById("pwd").value;
        var gender = document.getElementById("gen").value;
        
    
        var data = {
            "userName" : uname,
            "password" : pwd,
            "gender" : gender
        };
       
        fetch('http://api.prontoitlabs.com/api/v1/user', {
            method: 'POST',
           mode: 'no-cors',
            body: JSON.stringify(data),
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
                'access-control-allow-origin': '*',
                "access-control-allow-credentials": "true",
               //'Content-Type': 'application/x-www-form-urlencoded'
            }
            
        });
        /*.then(res => res.json())
        .then(response => {error['success']='success';console.log('Success:', JSON.stringify(response))})
        .catch(error => error['register']='not register');*/
        
        //alert("DETAILS SUBMITTED SUCCESSFULLY");
        document.getElementById("uname").value = '';
        document.getElementById("pwd").value = '';
        document.getElementById("gen").value = '';

        }
    }   
    render(){
       
        return(
            <div className="container">
            
                <h1 align="center">Create Account</h1>
                <form className="table p-3 mb-2 bg-light text-dark">
                <div className="form-group">
                        <label id="userName" className="text-primary">User Name</label>
                        <input type="text" className="form-control" id="uname" onChange={this.handleChange.bind(this, "name")} autoFocus placeholder="Enter User Name" required/>
                        <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                    </div>
                    <div className="form-group">
                    <label id="password" className="text-primary">Password</label>
                    <input type="password" className="form-control" id="pwd" onChange={this.handleChange.bind(this, "pwd")} placeholder="Enter Password" required/>
                <span style={{color: "red"}}>{this.state.errors["pwd"]}</span>
                </div>

                    <div className="form-group">
                        <label id="gender" className="text-primary">Gender</label>
                        <input type="text" className="form-control" id="gen" onChange={this.handleChange.bind(this, "gen")} placeholder="Enter Gender" required/>
                        <span style={{color: "red"}}>{this.state.errors["gen"]}</span>
                    </div>
                    
                    
                    <button to="/registerUser" type="button" className="btn btn-primary" onClick={this.myFunc.bind(this)}>Submit Details</button>
                </form>
                <span style={{color: "red"}}>{this.state.errors["register"]}</span>
                <span style={{color: "green"}}>{this.state.errors["success"]}</span>
            </div>
        );
    }
}
