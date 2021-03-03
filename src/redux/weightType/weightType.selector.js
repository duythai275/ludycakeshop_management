import { createSelector } from 'reselect';

const selectWeightType = state => state.weightType;

export const selectWeightTypes = createSelector(
    [selectWeightType],
    weightType => weightType.weightTypes
);