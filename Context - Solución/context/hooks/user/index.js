// modules
import {
  useState,
  useEffect
} from 'react';

// cart hook utils
import {
  // const
  ACTIONS,

  // functions
  queryProfile
 } from './utils';

// custom hook
const useUser = () => {
  // state
  const [ user, setUser ] = useState(null);

  // didmount
  useEffect(() => {
    rehydrateProfile();
  }, []);
  
  // aux functions
  const rehydrateProfile = async () => {
    // verify if token exists in localstorage
    if (!localStorage.getItem('token')) {
      return null;
    }

    const user = await queryProfile();

    if (!user) {
      return setUser(null);
    }

    return setUser(user);
  };

  const userDispatch = (action) => {
    switch (action) {
      case ACTIONS.LOGOUT: {
        (() => {
          localStorage.removeItem('token');

          setUser(null);
        })();

        break;
      }

      case ACTIONS.REHYDRATE: {
        rehydrateProfile();

        break;
      }

      // list user profile
      case ACTIONS.GET:
      default: {
        return user;
      }
    };
  };

  return {
    userDispatch
  };
};

export default useUser;