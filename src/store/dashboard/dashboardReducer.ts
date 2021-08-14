import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  DashboardCreateModeElementType,
  DashboardModeType,
} from '../../types/dashboard.types';

interface DashboardState {
  mode: DashboardModeType;
  createModeElementType: DashboardCreateModeElementType;
}

const initialState: DashboardState = {
  mode: 'select' as DashboardModeType,
  createModeElementType: null as DashboardCreateModeElementType,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<DashboardModeType>) => {
      state.mode = action.payload;
      if (action.payload !== 'create') {
        state.createModeElementType = null;
      }
    },
    setCreateModeElementType: (
      state,
      action: PayloadAction<DashboardCreateModeElementType>
    ) => {
      state.createModeElementType = action.payload;
    },
  },
});

export const { setMode, setCreateModeElementType } = dashboardSlice.actions;

export default dashboardSlice.reducer;
