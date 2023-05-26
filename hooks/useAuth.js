import { useSelector } from 'react-redux';
import { selectEmail, selectLogin, selectStateChange, selectUserId } from '../redux/auth/selectors';

export const useAuth = () => {
  return {
    login: useSelector(selectLogin),
    userId: useSelector(selectUserId),
    stateChange: useSelector(selectStateChange),
    email: useSelector(selectEmail),
  };
};