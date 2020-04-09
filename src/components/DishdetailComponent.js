import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderComments(dish) {
    if (dish != null) {
      const comments = this.props.dish.comments.map((com) => {
        return (
          <div key={com.id}>
            <li>
              <p>{com.comment}</p>
              <p>
                -- {com.author}, {com.date}
              </p>
            </li>
          </div>
        );
      });
      return (
        <div className="col-12 col-md-5 mt-1">
          <Card>
            <CardTitle>
              <strong className="d-flex justify-content-center mt-5">
                <h4>Comments</h4>
              </strong>
            </CardTitle>
            <CardBody>
              <ul className="list-unstyled">{comments}</ul>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div> </div>;
    }
  }
  renderDish(dish) {
    if (dish != null) {
      return (
        <div className="row">
          <div className="col-12 col-md-5 mt-1">
            <Card>
              <CardImg width="100%" object src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle heading>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          </div>
          {this.renderComments(dish)}
        </div>
      );
    } else {
      return <div> </div>;
    }
  }
  render() {
    return <div>{this.renderDish(this.props.dish)}</div>;
  }
}

export default DishDetails;
