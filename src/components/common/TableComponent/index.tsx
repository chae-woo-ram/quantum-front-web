import { ReactElement } from 'react';
import {
  Box,
  Table as MuiTable,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  align?: 'left' | 'right' | 'center';
  render?: (column: TableColumn<T>, item: T) => ReactElement;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

const Table = <T,>({ columns, data }: TableProps<T>) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 650 }} aria-label="dynamic table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={String(column.key)} align={column.align || 'left'}>
                  {column.title}
                </TableCell>
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
                    <TableCell key={String(column.key)} align={column.align || 'left'}>
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
};

export default Table;
