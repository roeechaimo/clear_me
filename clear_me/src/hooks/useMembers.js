import Services from '../services/Services';
import { useQuery } from 'react-query';

const services = new Services();
const apiService = services.api;

export default function useMembers() {
  return useQuery(['members', 1], () => apiService.getMembers(), {
    refetchOnWindowFocus: false,
  });
}
