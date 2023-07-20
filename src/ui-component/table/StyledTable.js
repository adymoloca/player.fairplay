import React, { useState, useEffect, useCallback } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Avatar, TablePagination, Typography } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/styles';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { skeletonTable } from 'ui-component/loadingSkeleton/skeletonTable/SkeletonTable';
import { ReportProblem } from '@mui/icons-material';

// translation
import { useTranslation } from 'react-i18next';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#fff",
        color: '#616161',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        background: "#F9F9FC",
    },
    '&:nth-of-type(even)': {
        background: "#fff",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 2,
    },
}));

const StyledTable = (props) => {

    const theme = useTheme();
    const { t } = useTranslation();
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const { name, data, loading, pagination, noContentMessage, searchTable } = props;

    const handlerRows = useCallback (() =>{ 
        const thisData = loading === true ? Array(3).fill(skeletonTable) : data?.rows;
        setRows(thisData)
    }, [data, loading])

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    useEffect(() => {
        setColumns(data?.columns);
        handlerRows();
    }, [data, handlerRows])

    useEffect(()=>{
        loading && setPage(0);
    }, [loading])

    return (
        <>
            <Box width={'100%'}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns?.map((item, index) => {
                                    return <StyledTableCell sx={{ width: item.width, borderRadius: `${searchTable && index === 0 ? '0px' : (index === 0 ? '10px' : '0px')} ${index === columns.length - 1 ? '10px' : '0px'} 0px 0px` }} align={item.align} key={`${name}-table-header-cell-${index}`}>
                                        {t(item.label)}
                                    </StyledTableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        {data?.rows?.length < 1 && loading === false ? (
                            <TableBody>
                                <StyledTableRow >
                                    <TableCell colSpan={columns?.length} align={'center'} sx={{background: '#fff', height: '300px'}}>
                                        <ReportProblem fontSize='large' sx={{ color: `${theme.palette.primary.main}`}} />
                                        <Typography variant='body1' fontSize={'1.6em'}> {noContentMessage} ...</Typography>
                                    </TableCell>
                                </StyledTableRow>
                            </TableBody>
                        ) : (
                        <TableBody>
                            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return <StyledTableRow key={`${name}-table-body-row-${index}`}>
                                    {columns?.map((column, index2) => {
                                        if (column.key === 'avatar')
                                            return <StyledTableCell sx={{ width: column.width, paddingLeft: 5 }} align={column.align} key={`${name}-table-body-avatar-cell-${index2}-${index}`}>
                                                <Avatar src={row[column.key]} />
                                            </StyledTableCell>
                                        else
                                            return <StyledTableCell sx={{ width: column.width }} align={column.align} key={`${name}-table-body-cell-${index2}-${index}`}>
                                                {row[column.key]}
                                            </StyledTableCell>
                                    })}
                                </StyledTableRow>
                            })}
                            <TableRow>
                                {pagination && <TablePagination
                                    rowsPerPage={rowsPerPage}
                                    rowsPerPageOptions={[5, 10, 15]}
                                    count={rows?.length}
                                    page={page}
                                    onPageChange={(e, newPage) => setPage(newPage)}
                                    onRowsPerPageChange={handleChangeRowsPerPage} 
                                    sx={{ backgroundColor: '#fff'}}/>}
                            </TableRow>
                        </TableBody>)
                        }
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

StyledTable.defaultProps = {
    name: '',
    data: { rows: [], columns: [] },
    loading: false,
    searchTable: false,
}

StyledTable.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.exact({
        rows: PropTypes.array,
        columns: PropTypes.array
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    noContentMessage: PropTypes.string.isRequired,
    searchTable: PropTypes.bool,
}

export default StyledTable;