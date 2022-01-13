import { toast } from 'react-toastify';

export default class AppService {
  filterMembersByOrganizationId = (members, organizationId) => {
    return members?.filter((member) => {
      return member?.organization_id?.replace('organization_id ', '') === organizationId;
    });
  };

  showToast = (message) => toast(message);
}
