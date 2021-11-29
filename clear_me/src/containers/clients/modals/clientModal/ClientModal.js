import React from 'react';
import ReactModal from 'react-modal';
import './ClientModal.css';

const CLIENT_KEY_MAP = [
  { value: 'name', prefix: 'Name: ' },
  { value: 'address_1', prefix: 'Address: ' },
  { value: 'city', prefix: 'City: ' },
  { value: 'zip_code', prefix: 'Zip code: ' },
  { value: 'state', prefix: 'State: ' },
  { value: 'headcount', prefix: 'Headcount: ' },
];

const customStyles = {
  content: {
    position: 'absolute',
    top: '10%',
    left: '25%',
    width: '50%',
    backgroundColor: '#ffffff',
    paddingLeft: '2%',
    // TODO - handle this
    border: '1px solid #000000',
  },
};

function ClientModal(props) {
  const { isModalOpen, onModalHide, client = {} } = props;

  const onHide = () => {
    return typeof onModalHide === 'function' && onModalHide();
  };

  const renderDetails = (clientDetails, index) => {
    return (
      <div key={clientDetails?.prefix || index} className="details-wrapper">
        {client && !!client[clientDetails?.value] && (
          <p>
            <span className="client-prefix">{clientDetails?.prefix}</span>

            <span>{client[clientDetails?.value]}</span>
          </p>
        )}
      </div>
    );
  };

  return (
    <ReactModal
      isOpen={isModalOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={() => onHide()}
      style={customStyles}
      className="app-modal"
    >
      <div>
        <div className="close-button">
          <span onClick={() => onHide()}>X</span>
        </div>

        {CLIENT_KEY_MAP.map((client, index) => renderDetails(client, index))}
      </div>
    </ReactModal>
  );
}

ReactModal.setAppElement('#root');

export default ClientModal;
