import React from 'react';
import ModalBS from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal : this.props.showModal, modalTitle : this.props.modalTitle};
  }

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    return (
      <ModalBS show={this.state.showModal} onHide={e => {this.onClose(e);}} backdrop="static" keyboard={false}>
        <ModalBS.Header closeButton>{this.props.modalTitle ? this.props.modalTitle : ''}</ModalBS.Header>
        <ModalBS.Body>{this.props.children}</ModalBS.Body>
      </ModalBS>
    );
  }
};