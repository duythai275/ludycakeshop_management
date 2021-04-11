// import node_modules
import * as XLSX from 'xlsx';

// import fetch javascript functions
import { adding } from './fetching';

/**
 * For importing products from excel file to database
 * @param {*} fileTarget The encoded destination file
 * @param {*} url API Server URL
 * @param {*} token Authentication
 * @param {*} loadAllProducts For loading all products to Redux store
 */
const importing = (fileTarget, url, token, loadAllProducts) => {

    const files = fileTarget.files, f = files[0];
    const reader = new FileReader();
    reader.onload = e => {
        // read xlsx file
        let workbook = XLSX.read(e.target.result, {type: 'binary'});

        // convert sheet of XLSX to json
        const products = XLSX.utils.sheet_to_json(workbook.Sheets["products"]);
        
        // import bulk of products to server through API
        adding(`${url}/admin/product/bulk`, token, products).then(json => loadAllProducts(json));
    }
    reader.readAsBinaryString(f);

}

export default importing;