import React, {Component} from 'react';
import logo from './logo.png';
import './style.css';
import MainContainer from './containers/MainContainer'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Elecctro's TODO App</h1>
                </header>

                <MainContainer/>
            </div>
        );
    }
}

export default App;