import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from '../../components/appButton/AppButton';
import Loader from '../../components/loader/Loader';
import PageWrapper from '../../components/pageWrapper/PageWrapper';
import Table from '../../components/table/Table';
import { AppContext } from '../../contexts/AppContext';
import useMembers from '../../hooks/useMembers';
import useOrganization from '../../hooks/useOrganization';
import useOrganizations from '../../hooks/useOrganizations';
import NavWrapper from '../../styles/navWrapper/NavWrapper';
import Client from './components/client/Client';
import ClientModal from './modals/clientModal/ClientModal';

export default function Clients() {
  const appContext = useContext(AppContext);

  const navigate = useNavigate();

  const [clickedClient, setClickedClient] = useState(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

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
  const {
    isLoading: isLoadingOrganization,
    isFetching: isFetchingOrganization,
    error: errorOrganization,
    data: organizationDetails,
    refetch,
  } = useOrganization(clickedClient?.id, !!clickedClient?.id);

  const onClientClick = (client) => {
    setClickedClient(client);
  };

  const onOrganizationDetailsSuccess = (client) => {
    if (client) {
      const filteredMembers = filterMembersByOrganizationId(client?.id);

      setClickedClient({ ...client, members: filteredMembers });

      return setIsClientModalOpen(true);
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

  useEffect(() => {
    if (clickedClient) {
      refetch().then((res) => {
        if (res?.data) {
          setClickedClient({ client: res?.data });

          onOrganizationDetailsSuccess(res?.data);
        }
      });
    }

    return () => {};
  }, [clickedClient]);

  return (
    <PageWrapper>
      <ClientModal
        isModalOpen={isClientModalOpen}
        client={clickedClient}
        onModalHide={() => onClientModalHide()}
        onEditMember={navigateToMemberFormPage}
      />

      <NavWrapper>
        <AppButton onButtonClick={() => navigate('/map')} buttonText={'To map view'} />

        <AppButton onButtonClick={() => navigate('/managers')} buttonText={'To managers view'} />
      </NavWrapper>

      <h3>Organizations</h3>

      {(isLoadingOrganization || isFetchingOrganization) && <Loader isPageLoader={true} />}

      {isLoadingOrganizations || isLoadingMembers || isFetchingOrganizations || isFetchingMembers ? (
        <Loader />
      ) : (
        <Table cursor={'pointer'}>
          <thead>
            <tr>
              <td>Name</td>

              <td>Headcount</td>

              <td>Public</td>
            </tr>
          </thead>

          <tbody>
            {organizations?.map((client) => (
              <Client key={client?.id} client={client} onClientClick={(client) => onClientClick(client)} />
            ))}
          </tbody>
        </Table>
      )}
    </PageWrapper>
  );
}
