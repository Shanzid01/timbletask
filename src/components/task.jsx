import React, {Component} from 'react';
import '../styles/task.css';
import M from 'materialize-css';

class Task extends Component{
        componentDidMount(){
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});
    }
    render(){return(
        <div className="task-details col s12 z-depth-1">
            <ul className="collapsible z-depth-0"><li>
            <div className="collapsible-header">
                <div className='task-name'>{this.props.data.name}</div>
                <span className='tab-creator'>By {this.props.data.creator}</span>
                {(()=>{
                    if(this.props.data.status!=='C'){
                    return (
                        <div className={'priority-status priority-'+this.props.data.priority}>{this.props.data.priority}</div>
                    )
                }})()
                }
                
            </div>
            <div className="collapsible-body">
                <span className="task-details-label">{this.props.data.details}</span><br/>
                <span>Priority: </span>{this.props.data.priority}<br/>
                <span>Created on: </span>{this.props.data.dateCreated}<br/>
                {(()=>{
                    if(this.props.data.status==='C'){
                    return (
                    <div>
                        <span>Completed by: </span>{this.props.data.completedBy}<br/>
                        <span>Completed on: </span>{this.props.data.dateCompleted}<br/>
                        <a className="btn done-btn transparent z-depth-0 waves-effect grey-text"
                        onClick={()=>this.props.renewTask(this.props.data.id)}>
                            <i className="material-icons right">autorenew</i>Renew as pending
                        </a>
                    </div>
                    );
                    }else{
                       return( <a className="btn done-btn transparent z-depth-0 waves-effect grey-text"
                        onClick={()=>this.props.completeTask(this.props.data.id)}>
                            <i className="material-icons right">check</i>Mark as done
                        </a>);
                    }
                })()}
            </div>
            </li>
            </ul>
        </div>
    )};
}

export default Task;