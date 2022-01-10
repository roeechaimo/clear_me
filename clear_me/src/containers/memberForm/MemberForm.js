import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { onChange, ...rest } = register('organizationId', { required: true });

  const [member, setMember] = useState(null);

  const onSubmit = (data) => {
    if (data?.organizationId) {
      const { showToast } = appContext?.appState;
      if (data?.organizationId === member?.organization_id) {
        return typeof showToast === 'function' && showToast('The value is the same initial value..');
      }

      return apiService.updateMember(member?.id, { organization_id: data?.organizationId }).then((res) => {
        if (res) {
          const { getOrganizationsAndMembers } = appContext?.appState?.api;

          typeof showToast === 'function' && showToast('Member updated!');

          typeof getOrganizationsAndMembers === 'function' && getOrganizationsAndMembers();

          return navigate('/');
        }
      });
    }
  };

  const onInputValueChange = (e) => {
    onChange(e);
  };

  useEffect(() => {
    if (memberId) {
      apiService.getMemeberDetails(Number(memberId)).then((res) => {
        if (res) {
          setMember(res);
        }
      });
    }

    return () => {};
  }, []);

  return (
    <PageWrapper>
      <BackButton />

      <h3>{`Member form ${member?.name ? `- ${member?.name}` : ''}`}</h3>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Organization id</Label>

        <Input {...rest} defaultValue={member?.organization_id} onChange={onInputValueChange} />

        <ErrorText
          isParagragh={true}
          text={`${errors?.organizationId ? "Value can't be empty" : '\0'}`}
          style={theme.fontSizes.small}
        />

        <AppButton onButtonClick={handleSubmit(onSubmit)} buttonText={'Submit update'} />
      </Form>
    </PageWrapper>
  );
}
