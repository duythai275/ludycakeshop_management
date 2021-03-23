
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

