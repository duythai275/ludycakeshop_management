// import node_modules
import { createSelector } from 'reselect';

// get the exact state in store
const selectWeightType = state => state.weightType;

// customize the store
export const selectWeightTypes = createSelector(
    [selectWeightType],
    weightType => weightType.weightTypes
);