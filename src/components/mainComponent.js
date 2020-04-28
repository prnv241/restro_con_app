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
import { postComment, fetchDishes, fetchPromos, fetchComments, fetchLeaders, postFeedback } from '../redux/actionCreaters';
import { actions } from 'react-redux-form';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchDishes: () => { dispatch(fetchDishes()) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  fetchLeaders: () => { dispatch(fetchLeaders()) }
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  render() {
    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={() =>
                <Home
                  dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                  dishesLoading={this.props.dishes.isLoading}
                  dishesErrMess={this.props.dishes.errMess}
                  promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                  promosLoading={this.props.promotions.isLoading}
                  promosErrMess={this.props.promotions.errMess}
                  leader={this.props.leaders.leaders.filter((led) => led.featured)[0]}
                  leadersLoading={this.props.leaders.isLoading}
                  leadersErrMess={this.props.leaders.errMess}
                />} />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishid" component={(props) =>
                <DishDetails
                  dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishid, 10))[0]}
                  isLoading={this.props.dishes.isLoading}
                  ErrMess={this.props.dishes.errMess}
                  comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishid, 10))}
                  commentsErrMess={this.props.comments.errMess}
                  postComment={this.props.postComment} />
              } />
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                postFeedback={this.props.postFeedback} />} />
              <Route exact path="/aboutus" component={() => <About
                leaders={this.props.leaders.leaders}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMess={this.props.leaders.errMess}
              />} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
