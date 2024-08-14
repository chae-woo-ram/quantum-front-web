import { ReactElement } from 'react';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from 'styled-components';

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  align?: 'left' | 'right' | 'center';
  width?: string;
  render?: (column: TableColumn<T>, item: T) => ReactElement;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

const Table = <T,>({ columns, data }: TableProps<T>) => {
  return (
    <TableContainer>
      <StyledMuiTable aria-label="dynamic table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={String(column.key)} align={column.align || 'left'}>
                {column.title}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map((column) => {
                const value = column.render
                  ? column.render(column, row as T)
                  : (row[column.key as keyof typeof row] as string);

                return (
                  <StyledTableCell
                    key={String(column.key)}
                    align={column.align || 'left'}
                    width={column.width || 'auto'}
                  >
                    {value}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </StyledMuiTable>
    </TableContainer>
  );
};

export default Table;

const StyledMuiTable = styled(MuiTable)`
  & .MuiTableHead-root {
    border-bottom: 2px solid #444;
  }

  & .MuiTableCell-root {
    font-size: 16px;
    letter-spacing: -1px;
  }
`;

const StyledTableCell = styled(TableCell)``;
