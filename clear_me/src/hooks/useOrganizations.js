import Services from '../services/Services';
import { useQuery } from 'react-query';

const services = new Services();
const apiService = services.api;

export default function useOrganizations() {
  return useQuery(['organizations', 1], () => apiService.getOrganizations(), {
    refetchOnWindowFocus: false,
  });
}
