import React, {Component} from 'react';
import {firebaseApp} from '../helpers/firebase';
import M from 'materialize-css';
import AddTask from "../components/addTask";
import Task from "../components/task";
import '../styles/app.css';
import {taskRef} from '../helpers/firebase';
import {connect} from 'react-redux';
import Date from '../helpers/date';
import Loader from '../helpers/preloader';

class App extends Component{

    constructor(props){
        super(props);
        this.state={
            tasks:[],
            dataLoaded:false,
            userEmail:''
        }
    }
    changeTaskStatus(taskId, status){
        let updateData={
            status,
            dateCompleted: Date.getDateNow(),
            completedBy: firebaseApp.auth().currentUser.displayName+' ('+firebaseApp.auth().currentUser.email+')'
        }
        taskRef.child(taskId).update(updateData);
        M.toast({html:("You " + (status==='C'? 'completed':'renewed')+ " a task."), displayLength:1000});
    }
    
    closeModal(){
        let elems = document.querySelectorAll('.modal')[0];
        let instance = M.Modal.getInstance(elems);
        instance.close();
    }
    componentWillMount(){
        firebaseApp.auth().onAuthStateChanged((user) =>{
            if(!user){
                this.props.history.push('/signin');
            }else{
                this.setState({userEmail:user.email})
            }
        });
        taskRef.on('value', snap=>{
            let allTasks=[];
            snap.forEach(task=>{
                let taskInfo=task.val();
                taskInfo['id']=task.key;
                allTasks.push(taskInfo);
            });
            this.setState({tasks:allTasks, dataLoaded:true});
        });
    }
    componentDidMount(){
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems, {});
        var elems1 = document.querySelectorAll('.tooltipped');
        var instances1 = M.Tooltip.init(elems1, {position:'bottom'});
        var elems2 = document.querySelectorAll('.modal');
        var instances2 = M.Modal.init(elems2, {});
        var elems3 = document.querySelectorAll('.fixed-action-btn');
        var instances3 = M.FloatingActionButton.init(elems3, {});
    }
    logout(){
        firebaseApp.auth().signOut();
    }
    render(){
        return(
            <div>
                <div className="fixed-action-btn">
                    <a href="#add-task-modal" className="btn-floating z-depth-2 btn-large red modal-trigger tooltipped" data-position="left" data-tooltip="Add task">
                        <i className="large waves-effect waves-light material-icons">add</i>
                    </a>
                </div>
                <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper teal">
                        <a href="#" className="brand-logo logo-text left">TimbleTask</a>
                        <div className="right">
                            <a className='dropdown-trigger btn-floating transparent btn-large waves-effect waves-light z-depth-0' href='#' data-target='user-dropdown'><i className="material-icons">person</i></a>
                            <ul id='user-dropdown' className='dropdown-content'>
                                <li className="disabled">Signed in as<br/>{this.state.userEmail}</li>
                                <li> <a onClick={()=>this.logout()} className="transparent waves-effect waves-light z-depth-0">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav></div>
                <div id="add-task-modal" className="modal bottom-sheet">
                    <div className="modal-content">
                        <span className="component-title">Add a new task</span>
                        <AddTask closeModal={()=>this.closeModal()} />
                    </div>
                </div>
                <div className="container all-component-container">
                    {this.state.dataLoaded? null:<Loader />}
                    <div className="component-title">Pending</div>
                    {
                        this.state.tasks.map((value, key)=>{
                            if(value.status=="P"){
                                return <Task key={value.id} completeTask={(taskID)=>this.changeTaskStatus(taskID, 'C')} data={value}/>
                            }
                        })
                    }
                    <br></br>
                    <div className="component-title">Completed</div>
                    {
                        this.state.tasks.map((value, key)=>{
                            if(value.status=="C"){
                                return <Task key={key} renewTask={(taskID)=>this.changeTaskStatus(taskID, 'P')} data={value}/>
                            }
                        })
                    }
                </div>               
            </div>
        )
    };
}
function mapStateToProps(state){
    return state;
}
export default connect(mapStateToProps, null)(App);