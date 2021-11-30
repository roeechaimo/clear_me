import React, { useContext, useState } from 'react';
import Table from '../../components/table/Table';
import { AppContext } from '../../contexts/AppContext';
import Services from '../../services/Services';
import Client from './components/client/Client';
import ClientModal from './modals/clientModal/ClientModal';
import './Clinets.css';
import { Link } from 'react-router-dom';

const services = new Services();
const apiService = services.api;

export default function Clients() {
  const appContext = useContext(AppContext);

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

  const filterMembersByOrganizationId = (organizationId) => {
    return appContext?.filterMembersByOrganizationId(organizationId);
  };

  return (
    <main>
      <ClientModal isModalOpen={isClientModalOpen} client={clickedClient} onModalHide={() => onClientModalHide()} />

      <h3>Organizations</h3>

      <div className="nav-wrapper">
        <div className="button">
          <Link to="/map">
            <span>To map view</span>
          </Link>
        </div>

        <div className="button">
          <Link to="/managers">
            <span>To managers view</span>
          </Link>
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <td>Name</td>

            <td>Headcount</td>

            <td>Public</td>
          </tr>
        </thead>

        <tbody>
          {appContext?.appState?.organizations?.map((client) => (
            <Client key={client?.id} client={client} onClientClick={(client) => onClientClick(client)} />
          ))}
        </tbody>
      </Table>
    </main>
  );
}
