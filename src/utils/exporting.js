// import node_modules
import * as XLSX from 'xlsx';

// import fetch javascript functions
import { getAllWithAuth } from './fetching';

/**
 * For exporting all products from database to excel through API
 * @param {*} url API Server URL
 * @param {*} token AUthentication
 * @returns no returns
 */
const exporting = (url, token) => getAllWithAuth(`${url}/admin/product`, token).then(arr => {
    let workbook = {
        Sheets: {
            products: null
        },
        SheetNames: ["products"]
    };
    workbook.Sheets["products"] = XLSX.utils.json_to_sheet(arr);
    XLSX.writeFile(workbook, "products.xlsx");
})

export default exporting;