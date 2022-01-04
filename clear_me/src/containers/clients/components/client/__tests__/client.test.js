import { fireEvent, render, screen } from '@testing-library/react';
import Services from '../../../../../services/Services';
import Client from '../Client';

const client = {
  id: '2',
  name: 'David David',
  headcount: '12',
  is_public: true,
};

const serverResponseMock = {
  id: '1',
  created_at: '2020-10-06T20:33:33.956Z',
  name: 'Schulist - Lind',
  headcount: 69,
  is_public: false,
  address_1: '714 Josefa Inlet',
  city: 'South Brendabury',
  zip_code: '69722-8987',
  state: 'MS',
};

const services = new Services();
const apiService = services.api;
const getOrganizationDetails = apiService.getOrganizationDetails;

beforeEach(() => {
  fetch.resetMocks();
});

test('renders client component properly', () => {
  render(
    <table>
      <tbody>
        <Client key={client?.id} client={client} />
      </tbody>
    </table>
  );

  const clientName = screen.getByText(/David David/i);
  const clientHeadCount = screen.getByText(/12/i);
  const checkbox = screen.getByRole('checkbox');

  expect(clientName.innerHTML).toEqual('David David');
  expect(clientHeadCount.innerHTML).toEqual('12');
  expect(checkbox.checked).toEqual(true);
});

test('call getOrganizationDetails properly on client click', async () => {
  render(
    <table>
      <tbody>
        <Client key={client?.id} client={client} onClientClick={(client) => onClientClick(client)} />
      </tbody>
    </table>
  );

  const clientName = screen.getByText(/David David/i);

  const onClientClick = (details) => {
    fetch.mockResponseOnce(JSON.stringify(serverResponseMock));

    getOrganizationDetails(details?.id)
      .then((res) => {
        expect(Number(res?.id)).toEqual(1);
        expect(fetch).toHaveBeenCalledTimes(1);
      })
      .catch((e) => console.log(e));
  };

  fireEvent.click(clientName);
});

test('returns null when exception', async () => {
  fetch.mockReject(() => Promise.reject('returns null when exception: API is down'));

  getOrganizationDetails('1')
    .then((res) => {
      expect(res).toEqual(undefined);
      expect(fetch).toHaveBeenCalledWith(`https://61a689cf8395690017be9324.mockapi.io/api/v1/organization/1`);
    })
    .catch((e) => console.log(e));
});
