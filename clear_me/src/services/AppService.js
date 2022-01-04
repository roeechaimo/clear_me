export default class AppService {
  constructor() {}

  filterMembersByOrganizationId = (members, organizationId) => {
    return members?.filter((member) => {
      return member?.organization_id?.replace('organization_id ', '') === organizationId;
    });
  };
}
