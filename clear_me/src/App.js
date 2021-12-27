import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Clients from './containers/clients/Clinets';
import Managers from './containers/managers/Managers';
import Map from './containers/map/Map';
import MemberForm from './containers/memberForm/MemberForm';
import { AppContext } from './contexts/AppContext';
import Services from './services/Services';
import { toast } from 'react-toastify';
import Toast from './components/toast/Toast';
import THEME from './styles/theme';
import {ThemeProvider} from 'styled-components';

const services = new Services();
const apiService = services.api;

const theme = THEME;

function App() {
  const getOrganizations = () => {
    apiService.getOrganizations((result) => getMembers(result));
  };

  const [appState, setAppState] = useState({
    data: { members: [], organizations: [] },
    api: { getOrganizationsAndMembers: getOrganizations },
    showToast: (message) => {
      toast(message);
    },
  });

  const filterMembersByOrganizationId = (organizationId) => {
    return appState?.data?.members?.filter((member) => {
      return member?.organization_id?.replace('organization_id ', '') === organizationId;
    });
  };

  const getMembers = useCallback(
    (organizations) => {
      apiService.getMemebers((result) =>
        setAppState({
          ...appState,
          data: {
            organizations,
            members: result,
          },
        })
      );
    },
    [appState]
  );

  useEffect(() => {
    getOrganizations();

    return () => {};
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ appState, filterMembersByOrganizationId }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Clients />}></Route>

            <Route path="map" element={<Map />}></Route>

            <Route path="managers" element={<Managers />}></Route>

            <Route path="member_form/:memberId" element={<MemberForm />}></Route>
          </Routes>

          <Toast />
        </BrowserRouter>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
