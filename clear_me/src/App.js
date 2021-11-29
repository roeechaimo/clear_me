import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Clients from './containers/clients/Clinets';
import Map from './containers/map/Map';
import { AppContext } from './contexts/AppContext';
import Services from './services/Services';

const services = new Services();
const apiService = services.api;

function App() {
  const [appState, setAppState] = useState({
    members: [],
    organizations: [],
  });

  const filterMembersByOrganizationId = (organizationId) => {
    return appState?.members?.filter((member) => {
      return member?.organization_id?.replace('organization_id ', '') === organizationId;
    });
  };

  const getMembers = useCallback(
    (organizations) => {
      apiService.getMemebers((result) =>
        setAppState({
          ...appState,
          organizations,
          members: result,
        })
      );
    },
    [appState]
  );

  useEffect(() => {
    apiService.getOrganizations((result) => getMembers(result));

    return () => {};
  }, []);

  return (
    <AppContext.Provider value={{ appState, filterMembersByOrganizationId }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Clients />}></Route>

          <Route path="map" element={<Map />}></Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
