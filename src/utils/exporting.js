import * as XLSX from 'xlsx';
import { getAllWithAuth } from './fetching';

const exporting = (filePath, url, token) => {
    let workbook = {
        Sheets: {},
        SheetNames: ["products"]
    }

    getAllWithAuth(`${url}/api/admin/product`, token).then(arr => {
        workbook.Sheets["products"] = XLSX.utils.json_to_sheet(arr);
        XLSX.writeFile(workbook, filePath);
    });
}

export default exporting;