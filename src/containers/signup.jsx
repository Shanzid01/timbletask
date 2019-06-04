import React, {Component} from 'react';
import {firebaseApp} from '../helpers/firebase';
import M from 'materialize-css';
import {Link} from 'react-router-dom';
import {logUser} from '../redux/actions';
import {connect} from 'react-redux';
import '../styles/global.css';
import '../styles/signin.css';
import Loader from '../helpers/preloader';

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false
        }
    }
    signup(){
        let user_name=document.getElementById('name-input').value;
        let user_email=document.getElementById('email-input').value;
        let user_pwd=document.getElementById('password-input').value;
        if(user_email.length>0 && user_pwd.length>0 && user_name.length>0){
            this.setState({isLoading:true});
            this.setState({userName:user_name});
            firebaseApp.auth().createUserWithEmailAndPassword(user_email, user_pwd)
            .catch(()=>{
               M.toast({html: 'Registration failed'});
               return;
            });
            this.props.logUser(user_email);
        }
    };
    componentWillMount(){
        let appContext=this;
        firebaseApp.auth().onAuthStateChanged((user) =>{
            if(user){
                console.log(appContext.state.userName)
                firebaseApp.auth().currentUser.updateProfile({
                    displayName:appContext.state.userName
                }).then(function() {
                    appContext.setState({isLoading:false});
                    appContext.props.history.push('/app');
                }).catch((err)=>{
                    console.log(err)
                    this.setState({isLoading:false});
                });
            }
        });
    }
    render(){
        return(
            <div className="container">
                <div className="app-title">TimbleTask</div>
                <div className="signin-form z-depth-4">
                <div className="login-title register-title">Register</div>
                <br></br>
                <div className="row">
                    <div className="col s12">
                        <div className="input-field">
                            <input id="name-input" type="text" required className="validate col s12" />
                            <label for="name-input">Name</label>
                        </div>
                    </div>
                    <div className="col s12">
                        <div className="input-field">
                            <input id="email-input" type="email" required className="validate col s12" />
                            <label for="email-input">Email</label>
                        </div>
                    </div>
                    <div className="col s12">
                         <div className="input-field">
                            <input id="password-input" type="password" required className="validate col s12" />
                            <label for="password-input">Password</label>
                        </div>
                    </div>
                    <div className="col s12 center">
                    {this.state.isLoading? <Loader specialClass="float-fix signin-loader" />:
                        <a id="login-btn" onClick={()=>this.signup()} 
                        className="btn blue login-btn z-depth-0 waves-effect waves-light" >Submit
                        </a>
                    }
                    </div>
                    <div className="col s12 center">
                        <Link className="redirect-link" to={'/signin'}>Login instead</Link>
                    </div>
                </div>
                </div>
            </div>
        )
    };
}

export default connect(null, {logUser})(SignUp);