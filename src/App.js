import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect, NavLink} from 'react-router-dom';
import Characters from './Components/Characters/Characters/Characters';
import Episodes from './Components/Episodes/Episodes/Episodes';
import Locations from './Components/Locations/Locations/Locations';
import WatchList from './Components/WatchList/WatchList';
import './App.scss';

function App() {
  return (
    <div className= 'wrapper'>
        <div className= 'bg-image'>      
          
        <Router className= 'router'>   
               <div className='nav'>
                  <NavLink className='app-link' to='/characters' activeClassName='active-link'>Characters</NavLink>
                  <NavLink className='app-link' to='/episodes' activeClassName='active-link'>Episodes</NavLink>
                  <NavLink className='app-link' to='/locations' activeClassName='active-link'>Locations</NavLink>
                  <NavLink className='app-link' to='/watchList' activeClassName='active-link'>My Watch List</NavLink>                 
               </div>               
      
               <Switch className='switch'>
                  <Route path='/characters' component= {Characters} exact/>
                  <Route path='/episodes' component= {Episodes} exact/>
                  <Route path='/locations' component= {Locations} />
                  <Route path='/watchList' component= {WatchList} exact/>                                    
                  <Route path='/' component= {Characters} exact/>
                  <Redirect to="/characters" />                 
                </Switch>
        </Router>
        </div>
    </div>
  );
}

export default App;

/*<div className= 'wrapper'>
        <div className= 'bg-image'>      
          
        <Router className= 'router'>   
               <div className='nav'>
                  <NavLink className='app-link' to='/main' activeClassName='active-link'>Головна</NavLink>
                  <NavLink className='app-link' to='/posts' activeClassName='active-link'>Публікації</NavLink>
                  <NavLink className='app-link' to='/pictures' activeClassName='active-link'>Галерея</NavLink>
                  <NavLink className='app-link' to='/contacts' activeClassName='active-link'>Contacts</NavLink>                 
               </div>               
      
               <switch className='switch'>
                  <Route path='/main' component= {Main} exact/>
                  <Route path='/posts' component= {Posts} exact/>
                  <Route path='/pictures' component= {Pictures} />
                  <Route path='/contacts' component= {Contacts} exact/>                 
                  <Route path='/contacts/:firstName' component= {Single} />                  
                  <Route path='/' component= {Main} exact/>
                 
                </switch>
        </Router>
        </div>
    </div>*/
