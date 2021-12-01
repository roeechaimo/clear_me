import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from '../../components/appButton/AppButton';
import Table from '../../components/table/Table';
import { AppContext } from '../../contexts/AppContext';
import Services from '../../services/Services';
import './Clinets.css';
import Client from './components/client/Client';
import ClientModal from './modals/clientModal/ClientModal';

const services = new Services();
const apiService = services.api;

export default function Clients() {
  const appContext = useContext(AppContext);

  const navigate = useNavigate();

  const [clickedClient, setClickedClient] = useState(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const onClientClick = (client) => {
    return apiService.getOrganizationDetails(client?.id, (result) => onOrganizationDetailsSuccess(result));
  };

  const onOrganizationDetailsSuccess = (client) => {
    if (client) {
      setIsClientModalOpen(true);

      const filteredMembers = filterMembersByOrganizationId(client?.id);

      return setClickedClient({ ...client, members: filteredMembers });
    }
  };

  const onClientModalHide = () => {
    setIsClientModalOpen(false);

    return setClickedClient(null);
  };

  const navigateToMemberFormPage = (member) => {
    setIsClientModalOpen(false);

    return navigate(`/member_form/${member?.id}`);
  };

  const filterMembersByOrganizationId = (organizationId) => {
    return appContext?.filterMembersByOrganizationId(organizationId);
  };

  return (
    <main>
      <ClientModal
        isModalOpen={isClientModalOpen}
        client={clickedClient}
        onModalHide={() => onClientModalHide()}
        onEditMember={navigateToMemberFormPage}
      />

      <div className="nav-wrapper">
        <AppButton onButtonClick={() => navigate('/map')} buttonText={'To map view'} />

        <AppButton onButtonClick={() => navigate('/managers')} buttonText={'To managers view'} />
      </div>

      <h3>Organizations</h3>

      <Table>
        <thead>
          <tr>
            <td>Name</td>

            <td>Headcount</td>

            <td>Public</td>
          </tr>
        </thead>

        <tbody>
          {appContext?.appState?.data?.organizations?.map((client) => (
            <Client key={client?.id} client={client} onClientClick={(client) => onClientClick(client)} />
          ))}
        </tbody>
      </Table>
    </main>
  );
}
