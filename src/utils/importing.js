import * as XLSX from 'xlsx';
import { adding } from './fetching';

// const transform = products => products.map( product => product);

const importing = (fileTarget, url, token, loadAllProducts) => {

    const files = fileTarget.files, f = files[0];
    const reader = new FileReader();
    reader.onload = e => {
        let workbook = XLSX.read(e.target.result, {type: 'binary'});
        const products = XLSX.utils.sheet_to_json(workbook.Sheets["products"]);
        
        // console.log(products);
        adding(`${url}/admin/product/bulk`, token, products).then(json => loadAllProducts(json));
    }
    reader.readAsBinaryString(f);

}

export default importing;