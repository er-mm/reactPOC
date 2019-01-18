import React from "react";
import fetch from 'isomorphic-fetch';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class Header extends React.Component{
 
    render(){
       
        return(
              <div className="container" align="center">
                  <table>
                  <tbody>
                      <tr>
                    <td><Link to="/home" className="btn btn-primary">Home</Link></td>   
                    <td><Link to="/registerUser" className="btn btn-primary">Register User</Link></td>  
                    <td><Link to="/login" className="btn btn-primary">Login</Link></td>  
                    
                    </tr>
                    </tbody>
                    </table>
              </div>
        );
    }
}