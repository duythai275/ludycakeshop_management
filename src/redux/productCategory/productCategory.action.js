import { ProductCategoryActionTypes } from './productCategory.type';

export const fetchAllProductCategories = productCategories => ({
    type: ProductCategoryActionTypes.FETCH_ALL_PRODUCTCATEGORIES,
    payload: productCategories
});