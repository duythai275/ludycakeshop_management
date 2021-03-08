import * as XLSX from 'xlsx';
import { getAllWithAuth } from './fetching';

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