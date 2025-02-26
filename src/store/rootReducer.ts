import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import assetReducer from './slices/assets';
import uiReducer from './slices/ui';

const rootReducer = combineReducers({
    auth: authReducer,
    assets: assetReducer,
    ui: uiReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;