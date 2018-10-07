import React,{Component} from 'react'
import {connect} from 'react-redux'
import {menuDisplayActions,changeActiveTheme} from '../../Actions/topBarActions'
import {faMoon,faSun, faPaperPlane} from '@fortawesome/fontawesome-free-solid'
import {faFacebook,faTwitter,faGithub,faLinkedin,faPiedPiper} from '@fortawesome/fontawesome-free-brands'
import IconedButton from '../iconedButton'
import './main.css'
import {initiateSendMessage} from '../../Actions/messagesHandler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Menu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            light:false,
            dark:false,
            pied:false,
            messageToDev:""
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
    openSocial(network){
        let url = null
        switch(network){
            case "facebook":{
                url = 'https://www.facebook.com/abdulhamidoumer.oumer'
                break
            }

            case "twitter":{
                url = 'https://twitter.com/Aotwitts3'
                break
            }

            case "github":{
                url = 'https://github.com/abdulhamidOumer'
                break
            }

            case "linkedin":{
                url = 'https://www.linkedin.com/in/abdulhamid-mohammed-3a9485108/'
                break
            }
            default:
                break
        }

        const openUrl = window.open(url, '_blank')
        openUrl.focus()
    }
    setWrapperRef(node) {
      this.wrapperRef = node;
    }

    handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
          this.props.dispatch(menuDisplayActions('HIDE'));
      }
    }

    sendMessageToDev(){
        const message = this.state.messageToDev
        this.props.dispatch(initiateSendMessage(message))
    }

    handleInput(event){
        const message = event.target.value
        this.setState({
            messageToDev:message
        })
    }

    render(){
        return(
            <div className='top-menu' ref={this.setWrapperRef}>
                <h3 className='title-discriptions no-border'>Themes</h3>
                
                <div className='center-container'>
                    <IconedButton onClick={this.changeTheme.bind(this,"LIGHT")} icon={faSun} discription='Light Mode' active={this.state.light}/>
                    <IconedButton onClick={this.changeTheme.bind(this,"DARK")} icon={faMoon} discription='Dark Mode'  active={this.state.dark}/>
                    <IconedButton onClick={this.changeTheme.bind(this,"PIED")} icon={faPiedPiper} discription='Pied Piper'  active={this.state.pied}/>
                </div>

                <h3 className='title-discriptions'>Contact</h3>
                
                <div className='direct-message'>
                    <textarea value={this.state.messageToDev} onChange={this.handleInput.bind(this)} placeholder='Direct Message' className='message-input'></textarea>
                    <button className='send-messenger-button' onClick={this.sendMessageToDev.bind(this)}>
                        <label>Send To Developer</label>
                        <FontAwesomeIcon icon={faPaperPlane} className='messenger-icon'/>
                    </button>
                </div>

                <div className='center-container'>
                    <IconedButton onClick={this.openSocial.bind(this,'facebook')} icon={faFacebook} active/>
                    <IconedButton onClick={this.openSocial.bind(this,'twitter')} icon={faTwitter} active/>
                    <IconedButton onClick={this.openSocial.bind(this,'github')} icon={faGithub}  active/>
                    <IconedButton onClick={this.openSocial.bind(this,'linkedin')} icon={faLinkedin} active/>
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