import {Table, TableBody, TableHead, TableHeader} from '@/components/ui/table';
import {CustomTableProps} from '@/interfaces/tables';

const CustomTable = ({tableHeaders, tableBody}: CustomTableProps) => {
  return (
    <Table className='table-fixed'>
      <TableHeader className='border-b-2 border-b-gray-200'>
        {tableHeaders.map((header) => (
          <TableHead key={header.value} className={`text-md font-semibold `}>
            {header.label}
          </TableHead>
        ))}
      </TableHeader>
      <TableBody>{tableBody}</TableBody>
    </Table>
  );
};

export default CustomTable;
