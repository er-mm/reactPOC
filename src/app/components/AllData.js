import React from "react";
import fetch from 'isomorphic-fetch';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Pagination } from "./Pagination";


export class AllData extends React.Component{
    
    constructor(props) {
        super();
        this.state = {
            allData: []
        };
      }
    componentWillMount(){
    	var found = this.props.found;
        this.fetchData(found);
    }
 
    fetchData(found){
    	/*var found = document.cookie.split(';').find(function(element) {
    		   if(element.includes('X-AUTH-TOKEN'))
    		   return element;
    		});

    		found = found.split('=')[1];*/
    	fetch('http://api.prontoitlabs.com/api/v1/user?page=0&size=25', {
    	method: 'GET',
    	mode: 'no-cors',
    	 headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
             'access-control-allow-origin': '*',
             "access-control-allow-credentials": "true",
            //'Content-Type': 'application/x-www-form-urlencoded',
            'X-AUTH-TOKEN':found
            	//var token = window.localStorage.getItem('token');
         }   
        })
      .then(data => data.json())
      .then((data) => { 
        console.log("all data",data);  
        this.setState({ allData: data });
      });
    }
   
    render(){
    	let {allData} = this.state;
    	
        return(
              
               <div className="container">
               <Pagination allData={allData}/>
               </div> 
        );
    }
}