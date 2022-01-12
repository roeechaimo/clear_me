import Services from '../services/Services';
import { useQuery } from 'react-query';

const services = new Services();
const apiService = services.api;

export default function useMember(memberId, params) {
  const options = { enabled: !!memberId, refetchOnWindowFocus: false };
  let key = 'member';
  let apiFunc = () => apiService.getMemeberDetails(memberId);
  if (params) {
    key = 'memberUpdate';
    apiFunc = () => apiService.updateMember(memberId, params);
  }

  return useQuery([key, memberId], apiFunc, options);
}
