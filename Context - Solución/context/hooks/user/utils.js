// services
import {
  fetchProfile
} from '@/src/helpers/index';

const ACTIONS = {
  GET: 'GET',
  LOGOUT: 'LOGOUT',
  REHYDRATE: 'REHYDRATE'
};

/**
 * @returns { Object }
 */
const queryProfile = async () => {
  return await fetchProfile();
};

export {
  ACTIONS,

  queryProfile
};