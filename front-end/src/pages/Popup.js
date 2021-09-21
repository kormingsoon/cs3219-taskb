import React from 'react';
import Modal from 'react-modal';
import ModalButton from '../components/ModalButton';
import EditContact from '../components/EditContact';
import '../css/style.css'

class PopUp extends React.Component {
  constructor(contact) {
    super(contact);
    this.state = { 
        modalOpened: false,

    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({ modalOpened: !prevState.modalOpened }));
  }

  render() {
    const contact = this.props.contact;

    return (
      <div>
        <ModalButton handleClick={this.toggleModal}>
          Edit
        </ModalButton>
        <Modal
          isOpen={this.state.modalOpened}
          onRequestClose={this.toggleModal}
          contentLabel="Modal with image"
        >
       <EditContact contact = {contact}/>
       <br/>
        <button onClick={this.toggleModal}
        className="btn btn-lg btn-info"> Close </button>
        </Modal>
      </div>
    );
  }
}

export default PopUp;