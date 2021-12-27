import React from 'react';

export const AppContext = React.createContext({
  data: {
    members: [],
    organizations: [],
  },
  api: {
    getOrganizationsAndMembers: () => {},
  },
  showToast: () => {},
});
