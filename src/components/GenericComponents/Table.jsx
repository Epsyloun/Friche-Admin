import React from 'react';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

//Styled Components
  const StyledPaper ={
    width: '100%',
    overflow: 'hidden',
    animation: 'fade-in ease 0.5s'
  }
  const StyledTableContainer = { maxHeight: 'auto' }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.headTable,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
      },
    }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
      backgroundColor: theme.palette.action.hover,

    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function TableComponent({columns, rows, setPedidoId, setOpenEoD}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //se obtiene el id del pedido
  function handlerTableClick(index){
    setPedidoId(index)
    setOpenEoD(true)
  }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper sx={StyledPaper}>
            <TableContainer sx={StyledTableContainer}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead >
                    <StyledTableRow>
                        {columns.map((column) => (
                        <StyledTableCell
                            align="left"
                            key={column.id}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </StyledTableCell>
                        ))}
                    </StyledTableRow>
                    </TableHead>
                <TableBody>
                {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                    return (
                        <StyledTableRow hover tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <StyledTableCell onClick={() => handlerTableClick(row.id)}   key={column.id} align="left">
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </StyledTableCell>
                            );
                        })}
                        </StyledTableRow>
                    );
                    })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
export {TableComponent};