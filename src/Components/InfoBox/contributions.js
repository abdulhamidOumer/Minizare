import React from 'react'
import './main.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithubAlt} from '@fortawesome/fontawesome-free-brands'

const Contributions = ()=>{
    return(
        <div>
            <div className='center-contents-div'>
                <div className='tab-logo-icon'><FontAwesomeIcon icon={faGithubAlt} className='reading-icons'/></div>
                <h3 className='tab-title middle-title'>GitHub Contributions</h3>
            </div>
        
            <p className='tab-paragraph'>
                Any kind of contributions and bug fixes to the <a href='https://github.com/abdulhamidOumer/Minizare' target='_blank' rel="noopener noreferrer">Minizare</a> code base is always welcome.
                Read the instructions below and fix any kind of bugs that are disturbing you, to make code improvments or to add any new features you want.
            </p>
            <ol className='tab-lists'>
                <li>Fork Minizare and clone to your machine if you prefer to do that.</li>
                <li>Minizare is built using react so make sure your development machine have Node.js installed. After that install all the dependencies inside the directory using the <b>npm install</b> command.</li>
                <li>If you want to add new features make sure to branch from the 'develop' branch.</li>
                <li>Don't do your works on 'gh-pages' branch as it is a production build, no changes will be merged.</li>
                <li>Do all your works and test your works.</li>
                <li>Write a good commit messages to every new things you have changed or made.</li>
                <li>Push to your origin repository and create a new pull request</li>
            </ol>
            <p className='tab-paragraph'>
                If you want more guide on contributing for opensource projects read this <a href='https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/' target='_blank' rel="noopener noreferrer">Tutorial</a>
            </p>
        </div>
    )
}

export default Contributions