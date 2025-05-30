import { createFileRoute } from '@tanstack/react-router';
import {
  EditRegular,
  EditFilled,
  DeleteRegular,
  DeleteFilled,
  bundleIcon,
} from '@fluentui/react-icons';

const EditIcon = bundleIcon(EditFilled, EditRegular);

const DeleteIcon = bundleIcon(DeleteFilled, DeleteRegular);

import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Title3,
  Button,
  TableCellActions,
  type TableColumnDefinition,
  createTableColumn,
  useTableFeatures,
  useTableSelection,
  type TableRowId,
  TableSelectionCell,
} from '@fluentui/react-components';
import Container from '../components/Container';
import { useCallback, useEffect, useState } from 'react';
import { Pagination } from '../components/Pagination';

export const Route = createFileRoute('/')({
  component: Index,
});

type ItemType = Record<string, unknown>;

const itemsMock: ItemType[] = [
  {
    id: '0000000000000',
    organizationId: '00000000000',
    title: 'Meeting Notes',
    description: 'Meeting with Tenant',
    dueDate: new Date().toDateString(),
    priority: 'high',
    status: 'todo',
    tags: ['sales'],
  },
  {
    id: '0000000000000',
    organizationId: '00000000000',
    title: 'Meeting Notes',
    description: 'Meeting with Tenant',
    dueDate: new Date().toDateString(),
    priority: 'high',
    status: 'todo',
    tags: ['sales'],
  },
  {
    id: '0000000000000',
    organizationId: '00000000000',
    title: 'Meeting Notes',
    description: 'Meeting with Tenant',
    dueDate: new Date().toDateString(),
    priority: 'high',
    status: 'todo',
    tags: ['sales'],
  },
  {
    id: '0000000000000',
    organizationId: '00000000000',
    title: 'Meeting Notes',
    description: 'Meeting with Tenant',
    dueDate: new Date().toDateString(),
    priority: 'high',
    status: 'todo',
    tags: ['sales'],
  },
  {
    id: '0000000000000',
    organizationId: '00000000000',
    title: 'Meeting Notes',
    description: 'Meeting with Tenant',
    dueDate: new Date().toDateString(),
    priority: 'high',
    status: 'todo',
    tags: ['sales'],
  },
  {
    id: '0000000000000',
    organizationId: '00000000000',
    title: 'Meeting Notes',
    description: 'Meeting with Tenant',
    dueDate: new Date().toDateString(),
    priority: 'high',
    status: 'todo',
    tags: ['sales'],
  },
  {
    id: '0000000000000',
    organizationId: '00000000000',
    title: 'Meeting Notes',
    description: 'Meeting with Tenant',
    dueDate: new Date().toDateString(),
    priority: 'high',
    status: 'todo',
    tags: ['sales'],
  },
  {
    id: '0000000000000',
    organizationId: '00000000000',
    title: 'Meeting Notes',
    description: 'Meeting with Tenant',
    dueDate: new Date().toDateString(),
    priority: 'high',
    status: 'todo',
    tags: ['sales'],
  },
  {
    id: '0000000000000',
    organizationId: '00000000000',
    title: 'Meeting Notes',
    description: 'Meeting with Tenant',
    dueDate: new Date().toDateString(),
    priority: 'high',
    status: 'todo',
    tags: ['sales'],
  },
  {
    id: '0000000000000',
    organizationId: '00000000000',
    title: 'Meeting Notes',
    description: 'Meeting with Tenant',
    dueDate: new Date().toDateString(),
    priority: 'high',
    status: 'todo',
    tags: ['sales'],
  },
];

const columnsMock = [
  { name: 'title', label: 'Title', type: 'string', required: true },
  {
    name: 'description',
    label: 'Description',
    type: 'string',
  },
  {
    name: 'dueDate',
    label: 'Due Date',
    type: 'date',
  },
  {
    name: 'priority',
    label: 'Priority',
    type: 'select',
    options: ['low', 'medium', 'high'],
    required: true,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: ['todo', 'in-progress', 'completed'],
    required: true,
  },
  { name: 'tags', label: 'Tags', type: 'array' },
];

function Index() {
  const [taskSelected, setTaskSelected] = useState(0);
  const [selectedRows, setSelectedRows] = useState(
    () => new Set<TableRowId>([]),
  );

  useEffect(() => {
    setTaskSelected(Array.from(selectedRows).length);
  }, [selectedRows]);

  const handleResetSelected = () => {
    setSelectedRows(() => new Set<TableRowId>([]));
  };

  const renderTitle = () => {
    return <Title3>List Task</Title3>;
  };
  const renderAction = () => {
    if (taskSelected > 0) {
      return (
        <div>
          <Button appearance="primary" onClick={handleResetSelected}>
            Back
          </Button>
          <Button style={{ marginLeft: '10px' }}>
            Delete {taskSelected} Task
          </Button>
        </div>
      );
    }
    return <Button appearance="primary">Add Task</Button>;
  };

  const columns: TableColumnDefinition<ItemType>[] = columnsMock.map((item) => {
    return createTableColumn<ItemType>({
      columnId: item.name,
    });
  });

  const {
    getRows,
    selection: {
      allRowsSelected,
      someRowsSelected,
      toggleAllRows,
      toggleRow,
      isRowSelected,
    },
  } = useTableFeatures({ columns: columns, items: itemsMock }, [
    useTableSelection({
      selectionMode: 'multiselect',
      selectedItems: selectedRows,
      onSelectionChange: (e, data) => setSelectedRows(data.selectedItems),
    }),
  ]);

  const rows = getRows((row) => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ') {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ('brand' as const) : ('none' as const),
    };
  });

  const toggleAllKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        toggleAllRows(e);
        e.preventDefault();
      }
    },
    [toggleAllRows],
  );

  return (
    <Container title={renderTitle()} action={renderAction()}>
      <Table arial-label="Default table" style={{ minWidth: '510px' }}>
        <TableHeader>
          <TableRow>
            <TableSelectionCell
              checked={
                allRowsSelected ? true : someRowsSelected ? 'mixed' : false
              }
              onClick={toggleAllRows}
              onKeyDown={toggleAllKeydown}
              checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
            />
            {columnsMock.map((column) => (
              <TableHeaderCell key={column.name}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        {rows.length ? (
          <TableBody>
            {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => {
              return (
                <TableRow
                  key={item?.id}
                  onClick={onClick}
                  onKeyDown={onKeyDown}
                  aria-selected={selected}
                  appearance={appearance}
                >
                  <TableSelectionCell
                    checked={selected}
                    checkboxIndicator={{ 'aria-label': 'Select row' }}
                  />
                  {columnsMock.map((column, index) => {
                    const key: keyof typeof item = column.name;
                    return (
                      <TableCell>
                        <TableCellLayout>{item[key]}</TableCellLayout>
                        {columns?.length - 1 === index && (
                          <TableCellActions>
                            <Button
                              icon={<EditIcon />}
                              appearance="subtle"
                              aria-label="Edit"
                            />
                            <Button
                              icon={<DeleteIcon />}
                              appearance="subtle"
                              aria-label="More actions"
                            />
                          </TableCellActions>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        ) : null}
      </Table>
      {!rows.length ? (
        <div
          style={{
            padding: 10,
            textAlign: 'center',
            borderBottom: '1px solid lightGray',
          }}
        >
          No Data
        </div>
      ) : null}
      <div>
        <Pagination totalItems={itemsMock.length} />
      </div>
    </Container>
  );
}
