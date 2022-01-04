import { render, screen } from '@testing-library/react';
import Services from '../../../services/Services';
import ClientModal from './../modals/clientModal/ClientModal';

const services = new Services();
const appService = services.app;
const filterMembersByOrganizationId = appService.filterMembersByOrganizationId;

const filteredMembersMock = [
  {
    id: '9',
    created_at: '2020-01-09T15:56:20.167Z',
    name: 'Mr. Oral Glover',
    organization_id: 'organization_id 1',
    title: 'Coordinator',
    phone_number: '(875) 691-7187 x652',
  },
  {
    id: '10',
    created_at: '2020-05-23T13:53:34.027Z',
    name: 'Guillermo Jerde',
    organization_id: 'organization_id 1',
    title: 'Director',
    phone_number: '(095) 450-5157',
  },
];

const members = [
  {
    id: '1',
    created_at: '2020-08-11T16:36:27.612Z',
    name: 'Destin Fahey',
    organization_id: 'organization_id 2',
    title: 'Officer',
    phone_number: '(840) 116-5157 x17522',
    companyID: 'organization_id 1',
  },
  {
    id: '2',
    created_at: '2020-03-09T03:38:36.139Z',
    name: 'Miss Laverne Effertz',
    organization_id: 'organization_id 2',
    title: 'Executive',
    phone_number: '941-079-5733 x931',
  },
  {
    id: '3',
    created_at: '2020-07-28T12:46:25.612Z',
    name: 'Herminia Pfeffer',
    organization_id: 'organization_id 3',
    title: 'Technician',
    phone_number: '512.362.0270 x8191',
  },
  {
    id: '4',
    created_at: '2020-07-18T13:00:13.518Z',
    name: 'Lera Bartoletti',
    organization_id: 'organization_id 4',
    title: 'Planner',
    phone_number: '(233) 488-0579 x999',
  },
  {
    id: '5',
    created_at: '2020-05-28T15:25:57.736Z',
    name: 'Russel Mohr',
    organization_id: 'organization_id 5',
    title: 'Planner',
    phone_number: '(440) 282-5649 x9111',
  },
  {
    id: '6',
    created_at: '2020-06-20T14:29:49.692Z',
    name: 'Fredrick Zieme',
    organization_id: 'organization_id 6',
    title: 'Engineer',
    phone_number: '404-199-7391 x9497',
  },
  {
    id: '7',
    created_at: '2020-10-26T18:06:46.693Z',
    name: 'Summer Cassin',
    organization_id: 'organization_id 6',
    title: 'Executive',
    phone_number: '(881) 653-1645',
  },
  {
    id: '8',
    created_at: '2020-05-10T05:47:17.483Z',
    name: 'Jillian McCullough II',
    organization_id: 'organization_id 8',
    title: 'Facilitator',
    phone_number: '583.607.0686',
  },
  ...filteredMembersMock,
];

let client = {
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

beforeEach(() => {
  jest.clearAllMocks();
});

test('filters client members', () => {
  const mockFn = jest.fn(() => filterMembersByOrganizationId(members, client?.id));
  const filteredMembers = mockFn();
  client = { ...client, members: filteredMembers };

  render(<ClientModal client={client} onEditMember={() => {}} onModalHide={() => {}} isModalOpen={true} />);

  const clientMember_1 = screen.getByText(/Mr. Oral Glover/i);
  const clientMember_2 = screen.getByText(/Guillermo Jerde/i);

  expect(mockFn).toHaveBeenCalled();
  expect(filteredMembers).toEqual(filteredMembersMock);
  expect(clientMember_1.innerHTML).toEqual('Mr. Oral Glover');
  expect(clientMember_2.innerHTML).toEqual('Guillermo Jerde');
});
