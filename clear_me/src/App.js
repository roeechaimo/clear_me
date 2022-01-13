import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Toast from './components/toast/Toast';
import Clients from './containers/clients/Clinets';
import Managers from './containers/managers/Managers';
import Map from './containers/map/Map';
import MemberForm from './containers/memberForm/MemberForm';
import { AppContext } from './contexts/AppContext';
import Services from './services/Services';
import THEME from './styles/theme';

const theme = THEME;

const services = new Services();
const appService = services.app;

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ showToast: appService?.showToast }}>
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
