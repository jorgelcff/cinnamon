import { UserPopup } from '../components/UserPopup';
import { User } from '@/interfaces';
import './storiesGlobals.css';
import { testUser } from './sampledata/SampleData';

export default {
  title: 'Components/UserPopup',
  component: UserPopup
};

export const Default = () => {
  return <UserPopup user={testUser} keycloak={undefined} />;
};
