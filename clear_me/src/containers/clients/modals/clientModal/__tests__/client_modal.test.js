import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
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
  const mockFn = jest.fn(() => navigate(`/member_form/${member?.id}`));

  render(<ClientModal client={client} onEditMember={mockFn} onModalHide={() => {}} isModalOpen={true} />);

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

test('navigate to member page properly', () => {
  let history = createMemoryHistory();

  const mockFn = jest.fn(() => {
    const route = `/member_form/${client?.members[0]?.id}`;
    history.push(route);

    expect(history.location.pathname).toEqual(`/member_form/1`);
  });

  render(<ClientModal client={client} onEditMember={mockFn} onModalHide={() => {}} isModalOpen={true} />);

  const memberEditButton = screen.getByText(/edit/i);
  fireEvent.click(memberEditButton);

  expect(mockFn).toHaveBeenCalledTimes(1);
});
