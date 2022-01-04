import Services from '../../../services/Services';

const member = {
  id: '4',
  created_at: '2020-07-18T13:00:13.518Z',
  name: 'Lera Bartoletti',
  organization_id: 'organization_id 4',
  title: 'Planner',
  phone_number: '(233) 488-0579 x999',
};

const serverResponseMock = {
  id: '4',
  created_at: '2020-07-18T13:00:13.518Z',
  name: 'Lera Bartoletti',
  organization_id: 'organization_id 4',
  title: 'Planner',
  phone_number: '(233) 488-0579 x999',
};

const serverResponseMockUpdate = {
  id: '4',
  created_at: '2020-07-18T13:00:13.518Z',
  name: 'Lera Bartoletti',
  organization_id: 'organization_id 3',
  title: 'Planner',
  phone_number: '(233) 488-0579 x999',
};

const services = new Services();
const apiService = services.api;
const getMemeberDetails = apiService.getMemeberDetails;
const updateMember = apiService.updateMember;

beforeEach(() => {
  fetch.resetMocks();
});

test('call getMemeberDetails properly on member click', async () => {
  fetch.mockResponseOnce(JSON.stringify(serverResponseMock));

  getMemeberDetails(member?.id)
    .then((res) => {
      expect(Number(res?.id)).toEqual(4);
      expect(fetch).toHaveBeenCalledTimes(1);
    })
    .catch((e) => console.log(e));
});

test('returns null when exception', async () => {
  fetch.mockReject(() => Promise.reject('returns null when exception: API is down'));

  getMemeberDetails('4')
    .then((res) => {
      expect(res).toEqual(undefined);
      expect(fetch).toHaveBeenCalledWith(`https://61a689cf8395690017be9324.mockapi.io/api/v1/members/4`);
    })
    .catch((e) => console.log(e));
});

test('call updateMember properly', async () => {
  fetch.mockResponseOnce(JSON.stringify(serverResponseMockUpdate));

  updateMember(member?.id, { organization_id: 'organization_id 3' })
    .then((res) => {
      expect(res?.organization_id).toEqual('organization_id 3');
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('https://61a689cf8395690017be9324.mockapi.io/api/v1/members/4', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ organization_id: 'organization_id 3' }),
      });
    })
    .catch((e) => console.log(e));
});
