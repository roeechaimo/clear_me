export default function Client({ client = {}, onClientClick = null }) {
  return (
    <tr onClick={() => onClientClick(client)}>
      <td>{client?.name}</td>

      <td>{client?.headcount}</td>

      <td>
        <input type="checkbox" checked={client?.is_public || false} disabled />
      </td>
    </tr>
  );
}
