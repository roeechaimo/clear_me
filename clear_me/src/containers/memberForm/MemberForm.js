import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import AppButton from '../../components/appButton/AppButton';
import BackButton from '../../components/backButton/BackButton';
import ErrorText from '../../components/errorText/ErrorText';
import PageWrapper from '../../components/pageWrapper/PageWrapper';
import { AppContext } from '../../contexts/AppContext';
import Services from '../../services/Services';

const services = new Services();
const apiService = services.api;

const Form = styled.form`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 2%;
`;

const Label = styled.label`
  font-size: 10px;
  margin-bottom: 3px;
`;

export default function MemberForm() {
  const appContext = useContext(AppContext);

  const theme = useTheme();

  const navigate = useNavigate();

  const { memberId } = useParams();

  const [member, setMember] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);

  const onSubmit = () => {
    if (inputValue) {
      setShowError(false);

      const { showToast } = appContext?.appState;
      if (inputValue === member?.organization_id) {
        return typeof showToast === 'function' && showToast('The value is the same initial value..');
      }

      return apiService.updateMember(member?.id, { organization_id: inputValue }).then((res) => {
        if (res) {
          const { getOrganizationsAndMembers } = appContext?.appState?.api;

          typeof showToast === 'function' && showToast('Member updated!');

          typeof getOrganizationsAndMembers === 'function' && getOrganizationsAndMembers();

          return navigate('/');
        }
      });
    }

    return setShowError(true);
  };

  const onInputValueChange = (e) => {
    const { value } = e.target;
    if (!value) {
      setShowError(true);
    } else {
      setShowError(false);
    }

    return setInputValue(value);
  };

  useEffect(() => {
    if (memberId) {
      apiService.getMemeberDetails(Number(memberId)).then((res) => {
        if (res) {
          setMember(res);

          setInputValue(res?.organization_id);
        }
      });      
    }

    return () => {};
  }, []);

  return (
    <PageWrapper>
      <BackButton />

      <h3>{`Member form ${member?.name ? `- ${member?.name}` : ''}`}</h3>

      <Form>
        <Label>Organization id</Label>

        <Input type="text" placeholder="Organization id" value={inputValue} onChange={onInputValueChange} />

        <AppButton onButtonClick={() => onSubmit()} buttonText={'Submit update'} />
      </Form>

      <ErrorText
        isParagragh={true}
        text={`${!!showError ? "Value can't be empty" : ''}`}
        style={theme.fontSizes.small}
      />
    </PageWrapper>
  );
}
