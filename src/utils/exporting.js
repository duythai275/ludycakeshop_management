import * as XLSX from 'xlsx';
import { getAllWithAuth } from './fetching';

const exporting = (filePath, url, token) => {
    let workbook = {
        Sheets: {},
        SheetNames: []
    }

    getAllWithAuth(`${url}/api/admin/product`, token).then(arr => {
        workbook.Sheets["products"] = XLSX.utils.json_to_sheet(arr);
        workbook.SheetNames.push("products");

        XLSX.writeFile(workbook, filePath);
    });
}

export default exporting;