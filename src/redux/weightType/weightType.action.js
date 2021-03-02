import { WeightTypeActionTypes } from './weightType.type';

export const fetchAllWeightTypes = weightTypes => ({
    type: WeightTypeActionTypes.FETCH_ALL_WEIGHT_TYPES,
    payload: weightTypes
});

export const addWeightType = weightType => ({
    type: WeightTypeActionTypes.ADD_NEW_WEIGHT_TYPE,
    payload: weightType
});

export const editWeightType = weightType => ({
    type: WeightTypeActionTypes.EDIT_WEIGHT_TYPE,
    payload: weightType
});

export const deleteWeightType = weightType => ({
    type: WeightTypeActionTypes.DELETE_WEIGHT_TYPE,
    payload: weightType
});