import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import AppButton from '../../../../components/appButton/AppButton';

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

const memberButtonStyle = {
  ['paddingBottom']: '0',
  ['paddingTop']: '0',
};

const CloseButtonWrapper = styled.div`
  padding-top: 2%;
  display: flex;
  justify-content: flex-end;
  padding-right: 2%;
`;

const CloseButton = styled.span`
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const ContentSection = styled.div`
  flex-basis: 50%;
`;

const MembersSection = styled(ContentSection)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;

const ModalTitle = styled.h4`
  text-decoration: underline;
`;

const Member = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Prefix = styled.span`
  font-weight: 700;
`;

function ClientModal(props) {
  const { isModalOpen, onModalHide, onEditMember, client = {} } = props;

  const onHide = () => {
    return typeof onModalHide === 'function' && onModalHide();
  };

  const renderDetails = (clientDetails, index) => {
    return (
      <div key={clientDetails?.prefix || index}>
        {client && !!client[clientDetails?.value] && (
          <p>
            <Prefix>{clientDetails?.prefix}</Prefix>

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
      <div key={member?.id || index}>
        <Member>
          <span>{member?.name}</span>

          <AppButton onButtonClick={() => onMemberClick(member)} buttonText={'Edit'} style={memberButtonStyle} />
        </Member>
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
      ariaHideApp={process.env.NODE_ENV !== 'test' ? true : false}
    >
      <div>
        <CloseButtonWrapper>
          <CloseButton onClick={() => onHide()}>X</CloseButton>
        </CloseButtonWrapper>

        <ContentWrapper>
          <ContentSection>
            <ModalTitle>Details</ModalTitle>

            {CLIENT_KEY_MAP.map((client, index) => renderDetails(client, index))}
          </ContentSection>

          <MembersSection>
            <ModalTitle>Members</ModalTitle>

            {client?.members?.map((member, index) => renderMember(member, index))}
          </MembersSection>
        </ContentWrapper>
      </div>
    </ReactModal>
  );
}

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');
// ReactModal.setAppElement('#root');

export default ClientModal;
