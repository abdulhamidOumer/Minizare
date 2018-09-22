import React,{Component} from 'react'
import {connect} from 'react-redux'
import {menuDisplayActions,changeActiveTheme} from '../../Actions/topBarActions'
import {faMoon,faSun} from '@fortawesome/fontawesome-free-solid'
import {faFacebook,faTwitter,faGithub,faLinkedin, faFacebookMessenger,faPiedPiper} from '@fortawesome/fontawesome-free-brands'
import IconedButton from '../iconedButton'
import './main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Menu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            light:false,
            dark:false,
            pied:false
        }
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.checkActiveTheme()
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
      
    componentDidUpdate(prevProps){
        if(this.props.theme !== prevProps.theme){
            this.checkActiveTheme()
        }
    }

    checkActiveTheme(){
        switch(this.props.theme){
            case "LIGHT":{
                this.setState({light:true,dark:false,pied:false});
                break;
            }

            case "DARK":{
                this.setState({dark:true,light:false,pied:false});
                break;
            }

            case "PIED":{
                this.setState({dark:false,light:false,pied:true});
                break;
            }

            default:{
                break;
            }
          }
      }

    changeTheme(theme){
        console.log("HERE")
        this.props.dispatch(changeActiveTheme(theme))
    }
      
      setWrapperRef(node) {
        this.wrapperRef = node;
      }
    
      handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.dispatch(menuDisplayActions('HIDE'));
        }
      }

    render(){
        return(
            <div className='top-menu' ref={this.setWrapperRef}>
                <h3 className='title-discriptions no-border'>Themes</h3>
                
                <div className='center-container'>
                    <IconedButton onClick={this.changeTheme.bind(this,"LIGHT")} icon={faSun} discription='Light Mode' active={this.state.light}/>
                    <IconedButton onClick={this.changeTheme.bind(this,"DARK")} icon={faMoon} discription='Night Mode'  active={this.state.dark}/>
                    <IconedButton onClick={this.changeTheme.bind(this,"PIED")} icon={faPiedPiper} discription='Pied Piper'  active={this.state.pied}/>
                </div>

                <h3 className='title-discriptions'>Contact</h3>
                
                <div className='direct-message'>
                    <textarea placeholder='Message' className='message-input'></textarea>
                    <button className='send-messenger-button'>
                        <label>Send Via Messenger</label>
                        <FontAwesomeIcon icon={faFacebookMessenger} className='messenger-icon'/>
                    </button>
                </div>

                <div className='center-container'>
                    <IconedButton icon={faFacebook} discription='Facebook' active/>
                    <IconedButton icon={faTwitter} discription='Twitter' active/>
                    <IconedButton icon={faGithub} discription='GitHub' active/>
                    <IconedButton icon={faLinkedin} discription='LinkedIn' active/>
                </div>

            </div>
        )
    }
}

Menu = connect(store=>{
    return{
        theme:store.theme
    }
})(Menu)

export default Menu