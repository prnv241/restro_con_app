import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from "reactstrap";
import { Link } from 'react-router-dom';

const MapComments = (props) => {
  const comment = props.comments.map((com) => {
    return (
      <div key={com.id}>
        <li>
          <p>{com.comment}</p>
          <p>
            -- {com.author}, {new Intl.DateTimeFormat('en-US').format(new Date(Date.parse(com.date)))}
          </p>
        </li>
      </div>
    );
  });
  return (
    <>{comment}</>
  );
}

function RenderComments(props) {
  return (
    <Card>
      <CardTitle>
        <strong className="d-flex justify-content-center mt-5">
          <h4>Comments</h4></strong>
      </CardTitle>
      <CardBody>
        <ul className="list-unstyled">
          <MapComments comments={props.comments} />
        </ul>
      </CardBody>
    </Card>
  );
}

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg width="100%" object src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle heading>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

const DishDetails = (props) => {
  if (props.dish != null) {
    console.log("here")
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 mt-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 mt-1">
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div> </div>
    );
  }
}

export default DishDetails;
