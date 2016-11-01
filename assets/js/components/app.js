import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';
import SonidosLibresPlayerContent from '../containers/sonidosLibresPlayerContent';


const App = ({children}) => {
    return(
        <div >
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css"/>
            <Navbar/>
            <div className="navbarMarginTopForContainer">
                {children}
            </div>
            <div className="twitter">
              <SonidosLibresPlayerContent />
            </div>
        </div>
    )
}

export default App;
