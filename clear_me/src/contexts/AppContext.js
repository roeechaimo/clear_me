import React from 'react';

export const AppContext = React.createContext({
  members: [],
  organizations: [],
  getOrganizationsAndMembers: () => {},
  showToast: () => {},
});
