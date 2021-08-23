import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  DashboardCreateModeElementType,
  DashboardModeType,
  AnyDashboardElement,
  IDashboardCreatingElement,
  BasicCoords,
} from '../../types/dashboard.types';

interface DashboardState {
  elements: AnyDashboardElement[];
  creatingElement: IDashboardCreatingElement | null;
  selectedElementId: string | null;
  movingElementId: string | null;
  movingElementStartCoords: BasicCoords | null;
  movingElementMouseStartCoords: BasicCoords | null;
  mode: DashboardModeType;
  createModeElementType: DashboardCreateModeElementType;
}

const initialState: DashboardState = {
  elements: [],
  creatingElement: null,
  selectedElementId: null,
  movingElementId: null,
  movingElementStartCoords: null,
  movingElementMouseStartCoords: null,
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
      state.selectedElementId = action.payload ? action.payload.id : null;
    },

    setCreatingElementDimensions: (
      state,
      action: PayloadAction<{ point2: BasicCoords }>
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
        state.selectedElementId = null;
      }
    },

    setCreateModeElementType: (
      state,
      action: PayloadAction<DashboardCreateModeElementType>
    ) => {
      state.createModeElementType = action.payload;
    },

    setMovingElement: (
      state,
      action: PayloadAction<{
        startCoords: BasicCoords;
        mouseStartCoords: BasicCoords;
        element: AnyDashboardElement;
      } | null>
    ) => {
      state.movingElementId = action.payload ? action.payload.element.id : null;
      state.movingElementStartCoords = action.payload
        ? action.payload.startCoords
        : null;
      state.movingElementMouseStartCoords = action.payload
        ? action.payload.mouseStartCoords
        : null;
    },

    moveElement: (state, action: PayloadAction<BasicCoords>) => {
      if (
        state.movingElementId &&
        state.movingElementMouseStartCoords &&
        state.movingElementStartCoords
      ) {
        const id = state.movingElementId;

        const found = state.elements.findIndex((el) => el.id === id);
        if (found >= 0) {
          const startX = state.movingElementStartCoords.x;
          const startY = state.movingElementStartCoords.y;
          const mouseX = state.movingElementMouseStartCoords.x;
          const mouseY = state.movingElementMouseStartCoords.y;

          state.elements[found].x = action.payload.x + startX - mouseX;
          state.elements[found].y = action.payload.y + startY - mouseY;
        }
      }
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
  setMovingElement,
  moveElement,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
