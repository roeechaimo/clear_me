import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppButton from '../../components/appButton/AppButton';
import BackButton from '../../components/backButton/BackButton';
import { AppContext } from '../../contexts/AppContext';
import Services from '../../services/Services';
import './MemberForm.css';

const services = new Services();
const apiService = services.api;

export default function MemberForm() {
  const appContext = useContext(AppContext);

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
      apiService.getMemeberDetails(Number(memberId), (res) => {
        if (res) {
          setMember(res);

          setInputValue(res?.organization_id);
        }
      });
    }

    return () => {};
  }, []);

  return (
    <main>
      <BackButton />

      <h3>{`Member form ${member?.name ? `- ${member?.name}` : ''}`}</h3>

      <form className="member-form">
        <label>Organization id</label>
        
        <input type="text" placeholder="Organization id" value={inputValue} onChange={onInputValueChange} />

        <AppButton onButtonClick={() => onSubmit()} buttonText={'Submit update'} />
      </form>

      {<p className="error">{`${!!showError ? "Value can't be empty" : ''}`}</p>}
    </main>
  );
}
