import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Header } from "./Header";
import { Home } from "./Home";
import { Registration } from "./Registration";
import { Login } from "./Login";

export class FirstComponent extends React.Component{
	render() {
		return(
			<Router>
			<div className="container">
			<br/>
			<Header/>
			<br/>
			<div className="progress" style={{height: "1px"}} >
				<div className="progress-bar " role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}>
				</div>
			</div>
			<div align="center"><h6>Created By : MM</h6></div>
			<div className="progress">
				<div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}>
				</div>
			</div>
				<br/>
				<div>
				<Route path="/home" component={Home} />
				<Route path="/registerUser" component={Registration} />
				<Route path="/login" component={Login} />
				</div>
				</div>
			</Router>
		);
	} 
}