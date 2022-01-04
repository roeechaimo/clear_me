import { render, screen } from '@testing-library/react';
import ClientModal from '../ClientModal';

const client = {
  id: '1',
  created_at: '2020-10-06T20:33:33.956Z',
  name: 'Schulist - Lind',
  headcount: 69,
  is_public: false,
  address_1: '714 Josefa Inlet',
  city: 'South Brendabury',
  zip_code: '69722-8987',
  state: 'MS',
  members: [{ name: 'Jace Bartoletti', id: '1' }],
};

test('renders client modal details properly', () => {
  render(<ClientModal client={client} onEditMember={() => {}} onModalHide={() => {}} isModalOpen={true} />);

  const clientName = screen.getByText(/Schulist - Lind/i);
  const clientAddress = screen.getByText(/714 Josefa Inlet/i);
  const clientCity = screen.getByText(/South Brendabury/i);
  const clientZipCode = screen.getByText(/69722-8987/i);
  const clientState = screen.getByText(/MS/i);
  const clientHeadCount = screen.getByText(69);
  const clientMembers = screen.getByText(/Jace Bartoletti/i);

  expect(clientName.innerHTML).toEqual('Schulist - Lind');
  expect(clientAddress.innerHTML).toEqual('714 Josefa Inlet');
  expect(clientCity.innerHTML).toEqual('South Brendabury');
  expect(clientZipCode.innerHTML).toEqual('69722-8987');
  expect(clientState.innerHTML).toEqual('MS');
  expect(clientHeadCount.innerHTML).toEqual('69');
  expect(clientMembers.innerHTML).toEqual('Jace Bartoletti');
});
