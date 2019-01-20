import React from "react";
import PropTypes from "prop-types";
import fetch from 'isomorphic-fetch';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AllData } from "./AllData";

export class Login extends React.Component{

    constructor(props){
        super();
        //this.age = props.age;
        this.state={
            fields: {},
           errors: {},
           path:'/login',
           flag:false,
           cookie:''
        }
    }

   /*********************************FORM VALIDATION********************************************* */
  
   
   componentWillMount(){
	   if(document.cookie==null || document.cookie==undefined || document.cookie=='undefined' || document.cookie==''){
		   
	   }else{
		   var found = document.cookie.split(';').find(function(element) {
			   if(element.includes('X-AUTH-TOKEN') && element!= undefined){
				   return element;
			   }else{
				   return 'noToken';
			   }
			   
			});

			found = found.split('=')[1];
			
	   }
       this.verifyToken(found);
   }
   
   verifyToken(found){
	  // var tokenData = {'X-AUTH-TOKEN':found};
	   fetch('http://api.prontoitlabs.com/api/v1/user/verify-token', {
           method: 'POST',
          mode: 'no-cors',
           //body: JSON.stringify(data),
           credentials: 'same-origin',
           headers: {
               Accept: 'application/json',
              // 'Content-Type': 'application/json',
               'access-control-allow-origin': '*',
               "access-control-allow-credentials": "true",
               'X-AUTH-TOKEN':found,
              'Content-Type': 'application/x-www-form-urlencoded'
              
           }
           
       }).then(res => res.json())
       .then(response => {
    	   console.log('Success:', response.status);
    	//if(response.status == 1){
    		 console.log('Success:', response);
    	       this.setState({flag:true,cookie:found})
    	
    	   
       })
       .catch(error => console.log('Error:', error));
   }
   
  
   
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["name"]){
           formIsValid = false;
           errors["name"] = "Cannot be empty";
        }

      //pwd
        if(!fields["pwd"]){
                   formIsValid = false;
                   errors["pwd"] = "Cannot be empty";
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
        	let fields = this.state.fields;
      //  var uname = document.getElementById("uname").value;
       // var pwd = document.getElementById("pwd").value;
        	var uname = fields["name"];
        	var pwd = fields["pwd"];
        var data = {
            "userName" : uname,
            "password" : pwd,
        };
       
        fetch('http://api.prontoitlabs.com/api/v1/user/login', {
            method: 'POST',
           mode: 'no-cors',
            body: JSON.stringify(data),
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'access-control-allow-origin': '*',
                "access-control-allow-credentials": "true"
               //'Content-Type': 'application/x-www-form-urlencoded'
            }
            
        })
        .then(response => {//error['success']='success';
        console.log('Success:', JSON.stringify(response));
        this.setState({ flag:true })
        })
        .catch(error => {//error['register']='not able to login';
        	console.log('Error:', error)}
        );
        }
        
      /*  if(error['success']=='success'){

            fetchData(){
            	fetch('http://api.prontoitlabs.com/api/v1/user?page=0&size=25', {
            	method: 'GET',
            	mode: 'cors',
            	 headers: {
                     Accept: 'application/json',
                    // 'Content-Type': 'application/json',
                     'access-control-allow-origin': '*',
                     "access-control-allow-credentials": "true",
                    'Content-Type': 'application/x-www-form-urlencoded'
                 }   
                })
              .then(data => data.json())
              .then((data) => { 
                console.log("all data",data);  
                this.setState({ allData: data });
            }); 
            }
        }*/
        //alert("DETAILS SUBMITTED SUCCESSFULLY");
        document.getElementById("uname").value = '';
        document.getElementById("pwd").value = '';

        }
      
    render(){
    	  let { allData, errors,flag,cookie } = this.state;
    	 
        return(
            <div className="container">
           {flag ?
        		   <AllData found={cookie}/>
        		   :
        			   <div className="container">
           <h1 align="center">Login Account</h1>
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

               <button to={this.state.path} type="button" className="btn btn-primary" onClick={this.myFunc.bind(this)}>Login</button>
           </form>
           <span style={{color: "red"}}>{this.state.errors["register"]}</span>
           <span style={{color: "green"}}>{this.state.errors["success"]}</span>
           </div>
              } 
            </div>
        );
    }
}
