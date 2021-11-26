import React, { useEffect, useState } from 'react';
import Services from '../../services/Services';
import { TYPES } from './enums/Types';

const services = new Services();
const apiService = services.api;

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    apiService.getOrginazations((result) => setClients(result));

    return () => {};
  }, []);

  const setClientType = (client) => {
    return client?.is_private ? TYPES.PRIVTE : TYPES.PUBLIC;
  };

  const onClientClick = (client) => {
    return console.log(client);
  };

  const renderClient = (client, index) => {
    return (
      <tr key={client?.id} onClick={() => onClientClick(client)}>
        <td>{index + 1}</td>

        <td>{client?.name}</td>

        <td>{setClientType(client)}</td>

        <td>{client?.headcount}</td>
      </tr>
    );
  };

  return (
    <main>
      <h2>Clients</h2>

      <table>
        <thead>
          <tr>
            <td>#</td>

            <td>Name</td>

            <td>Public / Private</td>

            <td>Headcount</td>
          </tr>
        </thead>

        <tbody>
          {clients?.map((client, index) => {
            return renderClient(client, index);
          })}
        </tbody>
      </table>
    </main>
  );
}
