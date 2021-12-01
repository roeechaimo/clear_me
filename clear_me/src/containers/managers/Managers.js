import React, { useContext, useEffect, useState, useCallback } from 'react';
import BackButton from '../../components/backButton/BackButton';
import Table from '../../components/table/Table';
import { AppContext } from '../../contexts/AppContext';
import Manager from './components/manager/Manager';
import './Managers.css';

export default function Managers() {
  const appContext = useContext(AppContext);

  const [managers, setManagers] = useState([]);

  const filterManagers = useCallback(() => {
    const { organizations, members } = appContext?.appState?.data;
    const managers = members
      ?.filter((member) => member?.title?.toLowerCase() === 'manager')
      ?.map((manager) => {
        const organization = organizations?.find(
          (org) => org?.id === manager?.organization_id?.replace('organization_id ', '')
        );
        let organizationName = '-';
        if (organization) {
          return { ...manager, organizationName: organization?.name, existingClient: 'Yes' };
        }

        return { ...manager, organizationName, existingClient: 'No' };
      });

    setManagers(managers);
  }, [appContext?.appState?.data?.members]);

  useEffect(() => {
    filterManagers();

    return () => {};
  }, [appContext?.appState?.data?.members]);

  return (
    <main>
      <BackButton />

      <h3>Managers</h3>

      <Table>
        <thead>
          <tr>
            <td>Name</td>

            <td>Company name</td>

            <td>Phone number</td>

            <td>Existing Client</td>
          </tr>
        </thead>

        <tbody>
          {managers?.map((manager) => (
            <Manager key={manager?.id} manager={manager} />
          ))}
        </tbody>
      </Table>
    </main>
  );
}
