
export const checkDate = (startDate, endDate) => {
    var valid;

    try {
        // checks if date is in valid format
        Date.parse(startDate);
        Date.parse(endDate);

        // checks if start date is after the end date
        if (Date.parse(startDate) > Date.parse(endDate)) {
            valid = false;
        }

        else {
            valid = true;
        }
    } catch (error) {
        valid = false;
    }

    // if both of the above coditions are correct, return valid as true
    return valid;
};

export const checkPrice = (originalPrice, discountPrice) => {
    var valid;

    // checks of discounted price is higher than original
    if (discountPrice > originalPrice) {
        valid = false;
    }
    // checks if either variable is a valid number
    else if (!Number.isNaN(discountPrice) || !Number.isNaN(originalPrice)) {
        valid = false;
    }
    else {
        valid = true;
    }
    // if both of the above coditions are correct, return valid as true
    return valid;
}

export const checkProduct = obj => { 
    var valid;
    
    var productName = obj.name;
    var productDescription = obj.description;
    var productBrand = obj.brand;
    var productPrice = obj.price;
    var productActive = obj.active;
    var productImage = obj.image;
    var productCategory = obj.category;
    var productQuantity = obj.quantity;
    var productWeightValue = obj.weightValue;
    var productWeightType = obj.weightType;

    if (!typeof productName === 'string' || !productName instanceof String) {
        valid = false;
    }

    else if (!typeof productDescription === 'string' || !productDescription instanceof String) {
        valid = false;
    }

    else if (!typeof productBrand === 'string' || !productBrand instanceof String) {
        valid = false;
    }

    else if (!Number.isNaN(productPrice)) {
        valid = false;
    }

    else if (!typeof productActive === 'boolean' || !productActive instanceof Boolean) {
        valid = false;
    }

    else if (!typeof productImage === 'string' || !productImage instanceof String) {
        valid = false;
    }

    else if (!Number.isNaN(productCategory)) {
        valid = false;
    }

    else if (!Number.isNaN(productQuantity)) {
        valid = false;
    }

    else if (!Number.isNaN(productQuantity)) {
        valid = false;
    }

    else if (!Number.isNaN(productWeightValue)) {
        valid = false;
    }

    else if (!Number.isNaN(productWeightType)) {
        valid = false;
    }

    else {
        valid = true;
    }

    return valid;

}