import React, { useEffect, useState } from 'react';
import Services from '../../services/Services';
import Table from '../../components/table/Table';
import Client from './components/client/Client';

const services = new Services();
const apiService = services.api;

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    apiService.getOrginazations((result) => setClients(result));

    return () => {};
  }, []);

  const onClientClick = (client) => {
    return console.log(client);
  };

  return (
    <main>
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
