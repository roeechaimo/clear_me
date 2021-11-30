export default function Manager({ manager = {} }) {
  return (
    <tr>
      <td>{manager?.name}</td>

      <td>{manager?.organizationName}</td>

      <td>{manager?.phone_number}</td>
    </tr>
  );
}
