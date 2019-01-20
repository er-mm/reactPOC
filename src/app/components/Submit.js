import React from "react";
import fetch from 'isomorphic-fetch';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class Submit extends React.Component{
 
    render(){
       
        return(
              <div className="container" align="center">
                 <h1>Registration
                     <b><span className="badge badge-light">SUCCESS</span></b> 
                    
                    Want to register again? Click Registration button
                </h1>
              </div>
        );
    }
}