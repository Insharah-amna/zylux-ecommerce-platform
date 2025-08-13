import {ReactNode} from 'react';

export interface TableHeaderItem {
  label: string;
  value: string;
}

export interface CustomTableProps {
  tableHeaders: TableHeaderItem[];
  tableBody: ReactNode;
}
