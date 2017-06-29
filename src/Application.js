import React, { Component } from 'react';
import { auth, database } from './firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import NewRestaurant from './NewRestaurant';
import Restaurants from './Restaurants';

import map from 'lodash/map';

import './Application.css';

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      restaurants: null
    };

    this.restaurantRef = database.ref('/restaurants');
  }

  componentDidMount() {
    //onAuthState Change will fire whenever it changed
    //from logedOut to logedIn or vice versa
    auth.onAuthStateChanged((currentUser) => {
      //console.log('Auth Change ', currentUser);
      this.setState({
        currentUser: currentUser
      });
    });

    this.restaurantRef.on('value', (snapshot) => {
      //console.log(snapshot.val());

      this.restaurantRef.on('value', (snapshot) => {
        this.setState({
          restaurants: snapshot.val()
        });
      });
    });
  }

  render() {
    const { currentUser, restaurants } = this.state;

    return (
      <div className="Application">
        <header className="Application--header">
          <h1>Lunch Rush</h1>
        </header>
        
        <div>
          {!currentUser && <SignIn />}
          {currentUser && 
            <div>
              <NewRestaurant />
              <Restaurants restaurants={restaurants} />
              <CurrentUser user={currentUser} />

            
            </div>}
        </div>
      </div>
    );
  }
}

export default Application;
