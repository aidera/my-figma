import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  DashboardCreateModeElementType,
  DashboardModeType,
  AnyDashboardElement,
  IDashboardCreatingElement,
} from '../../types/dashboard.types';

interface DashboardState {
  elements: AnyDashboardElement[];
  creatingElement: IDashboardCreatingElement | null;
  selectedElement: AnyDashboardElement | null;
  mode: DashboardModeType;
  createModeElementType: DashboardCreateModeElementType;
}

const initialState: DashboardState = {
  elements: [],
  creatingElement: null,
  selectedElement: null,
  mode: 'select' as DashboardModeType,
  createModeElementType: null as DashboardCreateModeElementType,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<AnyDashboardElement>) => {
      state.elements.unshift(action.payload);
      state.creatingElement = null;
    },

    updateElementPosition: (
      state,
      action: PayloadAction<{ id: string; from: number; to: number }>
    ) => {
      if (state.elements.length) {
        const elementToMove = state.elements.find(
          (element) => element.id === action.payload.id
        );
        if (elementToMove) {
          state.elements.splice(action.payload.from, 1);
          state.elements.splice(action.payload.to, 0, elementToMove);
        }
      }
    },

    setCreatingElement: (
      state,
      action: PayloadAction<IDashboardCreatingElement | null>
    ) => {
      state.creatingElement = action.payload;
    },

    setSelectedElement: (
      state,
      action: PayloadAction<AnyDashboardElement | null>
    ) => {
      state.selectedElement = action.payload;
    },

    setCreatingElementDimensions: (
      state,
      action: PayloadAction<{ point2: { x: number; y: number } }>
    ) => {
      if (state.creatingElement) {
        state.creatingElement.point2 = action.payload.point2;
      }
    },

    setMode: (state, action: PayloadAction<DashboardModeType>) => {
      state.mode = action.payload;
      if (action.payload !== 'create') {
        state.createModeElementType = null;
        state.creatingElement = null;
      }
      if (action.payload !== 'select') {
        state.selectedElement = null;
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

export const {
  addElement,
  updateElementPosition,
  setCreatingElement,
  setSelectedElement,
  setCreatingElementDimensions,
  setMode,
  setCreateModeElementType,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
