import React, {Component} from 'react';
import {firebaseApp} from '../helpers/firebase';
import M from 'materialize-css';
import {Link} from 'react-router-dom';
import {logUser} from '../redux/actions';
import {connect} from 'react-redux';
import '../styles/global.css';
import '../styles/signin.css';
import Loader from '../helpers/preloader';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false
        }
    }
    login(){
        let user_email=document.getElementById('email-input').value;
        let user_pwd=document.getElementById('password-input').value;
        if(user_email.length>0 && user_pwd.length>0){
            this.setState({isLoading:true});
            firebaseApp.auth().signInWithEmailAndPassword(user_email, user_pwd)
            .catch(err=>{
               M.toast({html: 'Login failed'});
               this.setState({isLoading:false});
               return;
            });
            this.props.logUser(user_email);
        }
    }
    render(){
        firebaseApp.auth().onAuthStateChanged((user) =>{
            if(user){
                this.props.history.push('/app');
            }
        });
        return(
            <div className="container">
                <div className="app-title">TimbleTask</div>
                <div className="signin-form z-depth-4">
                <div className="login-title">Login</div>
                <br></br>
                <div className="row">
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
                        <a id="login-btn" onClick={()=>this.login()} 
                        className="btn login-btn z-depth-0 waves-effect waves-light" >Login
                        </a>
                    }
                    </div>
                    <div className="col s12 center">
                        <Link className="redirect-link" to={'/signup'}>Register instead</Link>
                    </div>
                </div>
                </div>
            </div>
        )
    };
}
export default connect(null, {logUser})(SignIn);