import React, { Component } from 'react';
import ModalBS from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Modal extends React.Component {
  render() {
    return (
      <ModalBS show={true}>
        <ModalBS.Header>Hi </ModalBS.Header>
        <ModalBS.Body>{this.props.children}</ModalBS.Body>
        <ModalBS.Footer>This is the footer</ModalBS.Footer>
      </ModalBS>
    );
  }
};