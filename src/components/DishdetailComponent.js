import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem} from 'reactstrap';

class DishDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    const dish = this.props.dish;
    if(dish != null) {
      const comments = this.props.dish.comments.map((com) => {
        return (
          <div key={com.id}>
            <ListGroupItem className="m-1">
              <p>{com.comment}</p>
              <p> -- {com.author}, {com.date}</p>
            </ListGroupItem>
          </div>
        );
      });

      return(
          <div className="row">
            <div className="col-md-5 mt-1">
              <Card>
                <CardImg width="100%" object src={dish.image} alt={dish.name}/>
                <CardBody>
                  <CardTitle heading>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
              </Card>
            </div>
            <div className="col-md-5 mt-1">
              <Card>
                <CardTitle><strong className="d-flex justify-content-center mt-3"><h2>Comments</h2></strong></CardTitle>
                <CardBody>
                  <ListGroup>
                    {comments}
                  </ListGroup>
                </CardBody>
              </Card>
            </div>
          </div>
        )
    } else {
      return ( <div> </div> );
    }
  }
}

export default DishDetails;
