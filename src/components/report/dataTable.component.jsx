// import React modules
import React from 'react';

// import Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/**
 * Data Table
 * @param {*} props of component
 * @returns component
 */
const DataTable = props => {
    return (
        <TableContainer component={Paper}>
            <Table /*className={classes.table}*/ size="small" >
                <TableHead>
                    <TableRow>
                        <TableCell><strong>{( props.col[0].hasOwnProperty("name") ) ? "Period" : "Data"}</strong></TableCell>
                        {
                            props.col.map ( (column,i) => <TableCell key={i} align="right"><strong>{(column.hasOwnProperty("name")) ? column.name : column}</strong></TableCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.row.map( (r,k) => 
                            <TableRow key={k}>
                                <TableCell component="th" scope="row">{r.name}</TableCell>
                                { 
                                    r.data.map( (val,i) => <TableCell key={i} align="right">{val}</TableCell>)
                                }
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DataTable;