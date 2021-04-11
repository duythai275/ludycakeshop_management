// inmport action types
import { WeightTypeActionTypes } from './weightType.type';

/**
 * An action for load/replace all objects into Redux Store
 * @param {*} weightTypes payload
 * @returns action object
 */
export const fetchAllWeightTypes = weightTypes => ({
    type: WeightTypeActionTypes.FETCH_ALL_WEIGHT_TYPES,
    payload: weightTypes
});

/**
 * An action for add an object into Redux Store
 * @param {*} weightType payload
 * @returns action object
 */
export const addWeightType = weightType => ({
    type: WeightTypeActionTypes.ADD_NEW_WEIGHT_TYPE,
    payload: weightType
});

/**
 * An action for edit an object in Redux Store
 * @param {*} weightType payload
 * @returns action object
 */
export const editWeightType = weightType => ({
    type: WeightTypeActionTypes.EDIT_WEIGHT_TYPE,
    payload: weightType
});

/**
 * An action for delete an object in Redux Store
 * @param {*} weightType payload
 * @returns action object
 */
export const deleteWeightType = weightType => ({
    type: WeightTypeActionTypes.DELETE_WEIGHT_TYPE,
    payload: weightType
});