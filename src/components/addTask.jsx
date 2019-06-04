import React, { Component } from "react";
import M from 'materialize-css';
import {taskRef, firebaseApp} from '../helpers/firebase';
import Date from '../helpers/date';
import Loader from '../helpers/preloader';

class AddTask extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false
        }
    }
    componentDidMount(){
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, {});
    }
    addNewTask(){
        let taskName=document.getElementById('task-name-input').value;
        let taskDetails=document.getElementById('task-detail-input').value;
        let taskPriority=document.getElementById('task-priority-input');
        if(taskName.length>0 && taskDetails.length>0){
            let taskData={
                name:taskName,
                details:taskDetails,
                priority:taskPriority.options[taskPriority.selectedIndex].value
            }
            document.getElementById('task-name-input').value='';
            document.getElementById('task-detail-input').value='';
            document.getElementById('task-priority-input').value='0';
        
            let newData={
                name:taskData.name,
                details:taskData.details,
                priority: taskData.priority,
                creator:firebaseApp.auth().currentUser.displayName,
                dateCreated: Date.getDateNow(),
                status: 'P'
            }
            this.setState({isLoading:true});
            taskRef.push(newData)
            .then(()=>{
                this.setState({isLoading:false});
                this.props.closeModal();
            });
        }
    }
    render(){return(
        <div>
        <div className="row">
            <br></br>
            <div className="col s12">
                <input type="text" placeholder="Task name" id="task-name-input"></input>
                <textarea id="task-detail-input" placeholder="Task details" className="materialize-textarea"></textarea>
                <select id="task-priority-input">
                    <option value="None" disabled defaultValue>Task priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            </div><div className="row">
            <div className="col s12">
            {this.state.isLoading? <Loader specialClass="float-fix" />:
                <a onClick={()=>this.addNewTask()} id="submit-btn" className="btn teal waves-effect waves-light">
                    <i className="material-icons left">save</i>Save
                </a>
            }
            </div>
        </div>
        </div>
    )}
}
export default AddTask;