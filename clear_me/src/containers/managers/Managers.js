import React, { useCallback, useEffect, useState } from 'react';
import BackButton from '../../components/backButton/BackButton';
import PageWrapper from '../../components/pageWrapper/PageWrapper';
import Table from '../../components/table/Table';
import useMembers from '../../hooks/useMembers';
import useOrganizations from '../../hooks/useOrganizations';
import Manager from './components/manager/Manager';

export default function Managers() {
  const {
    isLoading: isLoadingOrganizations,
    isFetching: isFetchingOrganizations,
    error: errorOrganizations,
    data: organizations,
  } = useOrganizations();
  const {
    isLoading: isLoadingMembers,
    isFetching: isFetchingMembers,
    error: errorMembers,
    data: members,
  } = useMembers();

  const [managers, setManagers] = useState([]);

  const filterManagers = useCallback(() => {
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
  }, [members, organizations]);

  useEffect(() => {
    filterManagers();

    return () => {};
  }, [members, filterManagers]);

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
}
