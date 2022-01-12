import Services from '../services/Services';
import { useQuery } from 'react-query';

const services = new Services();
const apiService = services.api;

export default function useOrganization(organizationId, isEnabled) {
  return useQuery(['organization', 1], () => apiService.getOrganizationDetails(organizationId), {
    enabled: isEnabled,
    refetchOnWindowFocus: false,
  });
}
