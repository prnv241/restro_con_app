import React, { Component } from 'react';
import Home from './homeComponent';
import Menu from './menuComponent';
import Contact from './contactComponent';
import About from './aboutComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments'
import { LEADERS } from '../shared/leaders'
import { PROMOTIONS } from '../shared/promotions'
import DishDetails from "./DishdetailComponent";
import Header from './headerComponent';
import Footer from './footerComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    }
  }
  render() {

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={() =>
            <Home
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((led) => led.featured)[0]}
            />} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishid" component={(props) =>
            <DishDetails
              dish={this.state.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishid, 10))[0]}
              comments={this.state.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishid, 10))} />
          } />
          <Route exact path="/contactus" component={() => <Contact />} />
          <Route exact path="/aboutus" component={() => <About leaders={this.state.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
