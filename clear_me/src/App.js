import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import Toast from './components/toast/Toast';
import Clients from './containers/clients/Clinets';
import Managers from './containers/managers/Managers';
import Map from './containers/map/Map';
import MemberForm from './containers/memberForm/MemberForm';
import { AppContext } from './contexts/AppContext';
import Services from './services/Services';
import THEME from './styles/theme';

const services = new Services();
const appService = services.app;

const theme = THEME;

function App() {
  const queryClient = new QueryClient();

  const [appState, setAppState] = useState({
    showToast: (message) => {
      toast(message);
    },
  });

  const filterMembersByOrganizationId = (organizationId) => {
    const members = queryClient.getQueryData(['members', 1]);

    return appService.filterMembersByOrganizationId(members, organizationId);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ appState, filterMembersByOrganizationId }}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Clients />}></Route>

              <Route path="map" element={<Map />}></Route>

              <Route path="managers" element={<Managers />}></Route>

              <Route path="member_form/:memberId" element={<MemberForm />}></Route>
            </Routes>

            <Toast />
          </BrowserRouter>
        </QueryClientProvider>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
