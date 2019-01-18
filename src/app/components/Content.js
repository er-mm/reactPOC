import React from "react";
import fetch from 'isomorphic-fetch';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Logout } from "./Logout";

export class Content extends React.Component {
      constructor() {
        super();
        
      }
      render() {
		  let props = this.props;
		  let indexOfFirstTodo = props.indexOfFirstTodo;
		  let indexOfLastTodo = props.indexOfLastTodo;
		  let allDataArr = props.allDataArr;
		  
		   const currentTodos = allDataArr.slice(indexOfFirstTodo, indexOfLastTodo);
		   console.log('currentTodos arr : ',currentTodos);
		   const renderTodos = currentTodos.map((data, index) => {
		   console.log('data : ',data);
			return (
                  <tr key={index}>
                      {/*<td>{allData._id}</td>*/}
						  <td><label id={data.userName} className="text-primary">{data.userName}</label></td>
							<td><label id={data.password} className="text-primary">{data.password}</label></td>
							<td><label id={data.gender} className="text-primary">{data.gender}</label></td>
                      </tr>
              );
        });

        return (
        		  <div className="container">
          <Logout/>
		   <br/>
		   <table className="table p-3 mb-2 bg-light text-dark">
            <thead>
                <tr>
                    {/*<th>ID</th>*/}
                    <th className="text-primary">User Name</th>
                    <th className="text-primary">Password</th>
                    <th className="text-primary">Gender</th>
                 </tr>
            </thead>
            <tbody>
            {renderTodos}
            </tbody>
        </table>
          </div>
        );
      }
    }