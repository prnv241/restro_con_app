import React, { Component } from 'react';
import Home from './homeComponent';
import Menu from './menuComponent';
import Contact from './contactComponent';
import About from './aboutComponent';
import DishDetails from "./DishdetailComponent";
import Header from './headerComponent';
import Footer from './footerComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {
  render() {

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={() =>
            <Home
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((led) => led.featured)[0]}
            />} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishid" component={(props) =>
            <DishDetails
              dish={this.props.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishid, 10))[0]}
              comments={this.props.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishid, 10))} />
          } />
          <Route exact path="/contactus" component={() => <Contact />} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
