import React, { Component, PropTypes } from 'react';
import Restaurant from './Restaurant';
import map from 'lodash/map';
import './Restaurants.css';
import { database } from './firebase';

class Restaurants extends Component {
  constructor(props) {
    super(props);

    this.restaurantsRef = database.ref('/restaurants');

    this.handleSelect = this.handleSelect.bind(this);
    this.handleDeselect = this.handleDeselect.bind(this);
  }

  handleSelect(key) {
    const currentUser = this.props.user;

    this.restaurantsRef
      .child(key)
      .child('votes')
      .child(currentUser.uid)
      .set(currentUser.displayName);
    // database.ref('./restaurants');
    //alert('hello!');
  }

  handleDeselect(key) {
    const currentUser = this.props.user;
    
    this.restaurantsRef
      .child(key)
      .child('votes')
      .child(currentUser.uid)
      .remove();
  }

  render () {
    const { restaurants, user } = this.props;
    
    return (
      <section className="Restaurants">
        { 
          map(restaurants, (restaurant, key) => {
            return (
              <Restaurant 
                key={key}
                {...restaurant} 
                currentUser={user}
                handleDeselect={ () => this.handleDeselect(key) }
                handleSelect={ () => this.handleSelect(key) }
              />
            );  
        }

            ) }
      </section>
    );
  }
}

Restaurants.propTypes = {
  user: PropTypes.object,
  restaurantsRef: PropTypes.object,
  restaurants: PropTypes.object
};

export default Restaurants;
