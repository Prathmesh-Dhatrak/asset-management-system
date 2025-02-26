import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist';
import { RootState } from './rootReducer';

export const rootPersistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};