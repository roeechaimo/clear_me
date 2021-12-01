import React from 'react';
import ReactModal from 'react-modal';
import AppButton from '../../../../components/appButton/AppButton';
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
    left: '22.5%',
    width: '50%',
    backgroundColor: '#ffffff',
    paddingLeft: '2%',
    paddingRight: '2%',
    border: '1px solid #000000',
    borderRadius: '5px',
  },
};

function ClientModal(props) {
  const { isModalOpen, onModalHide, onEditMember, client = {} } = props;

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

  const onMemberClick = (member) => {
    return typeof onEditMember === 'function' && onEditMember(member);
  };

  const renderMember = (member, index) => {
    return (
      <div key={member?.id || index} className="member-wrapper">
        <div>
          <span>{member?.name}</span>

          <AppButton onButtonClick={() => onMemberClick(member)} buttonText={'Edit'} />
        </div>
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

        <div className="client-modal-content-wrapper">
          <div>
            <h4 className="client-modal-title">Details</h4>

            {CLIENT_KEY_MAP.map((client, index) => renderDetails(client, index))}
          </div>

          <div>
            <h4 className="client-modal-title">Members</h4>

            {client?.members?.map((member, index) => renderMember(member, index))}
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

ReactModal.setAppElement('#root');

export default ClientModal;
