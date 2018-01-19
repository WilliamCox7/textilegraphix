import { axios } from '../../packages';

export function handleError(error) {
  axios.post('/senderror', error);
}
