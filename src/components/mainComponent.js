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
import { addComment, fetchDishes } from '../redux/actionCreaters';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={() =>
            <Home
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((led) => led.featured)[0]}
            />} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishid" component={(props) =>
            <DishDetails
              dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishid, 10))[0]}
              isLoading={this.props.dishes.isLoading}
              ErrMess={this.props.dishes.errMess}
              comments={this.props.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishid, 10))}
              addComment={this.props.addComment} />
          } />
          <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
