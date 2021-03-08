import * as XLSX from 'xlsx';
import { adding } from './fetching';

const importing = (filePath, url, token) => {
    let products = []
    const workbook = XLSX.readFile(filePath);

    XLSX.utils.sheet_to_json(workbook.Sheets["Products"], {raw: true}).forEach( product => {
        // Check validation
        // Code here
        
        products.push(product);
    });

    adding(`${url}/admin/product/bulk`, token, products)
    .then(json => console.log(json.length));
}

export default importing;