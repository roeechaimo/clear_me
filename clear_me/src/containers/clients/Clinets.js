import React, { useEffect, useState } from 'react';
import Services from '../../services/Services';
import Table from '../../components/table/Table';
import Client from './components/client/Client';
import ClientModal from './modals/clientModal/ClientModal';

const services = new Services();
const apiService = services.api;

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [clickedClient, setClickedClient] = useState(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  useEffect(() => {
    apiService.getOrganizations((result) => setClients(result));

    return () => {};
  }, []);

  const onClientClick = (client) => {
    return apiService.getOrganizationDetails(client?.id, (result) => onOrganizationDetailsSuccess(result));
  };

  const onOrganizationDetailsSuccess = (client) => {
    if (client) {
      setIsClientModalOpen(true);

      return setClickedClient(client);
    }
  };

  const onClientModalHide = () => {
    setIsClientModalOpen(false);

    return setClickedClient(null);
  };

  return (
    <main>
      <ClientModal isModalOpen={isClientModalOpen} client={clickedClient} onModalHide={() => onClientModalHide()} />

      <Table>
        <thead>
          <tr>
            <td>Name</td>

            <td>Headcount</td>

            <td>Public</td>
          </tr>
        </thead>

        <tbody>
          {clients?.map((client) => (
            <Client key={client?.id} client={client} onClientClick={(client) => onClientClick(client)} />
          ))}
        </tbody>
      </Table>
    </main>
  );
}
