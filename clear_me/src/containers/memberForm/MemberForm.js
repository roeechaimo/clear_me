import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import AppButton from '../../components/appButton/AppButton';
import BackButton from '../../components/backButton/BackButton';
import ErrorText from '../../components/errorText/ErrorText';
import Loader from '../../components/loader/Loader';
import PageWrapper from '../../components/pageWrapper/PageWrapper';
import { AppContext } from '../../contexts/AppContext';
import useMember from '../../hooks/useMember';

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

  const [submitedValue, setSubmitedValue] = useState(null);

  const { error: errorMemberDetails, data: member } = useMember(memberId);
  const { error: errorMemberUpdate, refetch: updateMember } = useMember(memberId, submitedValue);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { onChange, ...rest } = register('organizationId', { required: true });

  const onSubmit = (data) => {
    if (data?.organizationId) {
      const { showToast } = appContext?.appState;
      if (data?.organizationId === member?.organization_id) {
        return typeof showToast === 'function' && showToast('The value is the same initial value..');
      }

      return setSubmitedValue({ organization_id: data?.organizationId });
    }
  };

  const onInputValueChange = (e) => {
    onChange(e);
  };

  useEffect(() => {
    if (submitedValue) {
      const { showToast } = appContext?.appState;

      updateMember().then((res) => {
        if (res?.data) {
          typeof showToast === 'function' && showToast('Member updated!');

          return navigate('/');
        }
      });
    }

    return () => {};
  }, [submitedValue]);

  useEffect(() => {
    if (member) {
      setValue('organizationId', member?.organization_id);
    }

    return () => {};
  }, [member]);

  return (
    <PageWrapper>
      <BackButton />

      {!member ? (
        <Loader />
      ) : (
        <>
          {' '}
          <h3>{`Member form ${member?.name ? `- ${member?.name}` : ''}`}</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Label>Organization id</Label>

            <Input {...rest} onChange={onInputValueChange} defaultValue={member?.organization_id} />

            <ErrorText
              isParagragh={true}
              text={`${errors?.organizationId ? "Value can't be empty" : '\0'}`}
              style={theme.fontSizes.small}
            />

            <AppButton onButtonClick={handleSubmit(onSubmit)} buttonText={'Submit update'} />
          </Form>
        </>
      )}
    </PageWrapper>
  );
}
