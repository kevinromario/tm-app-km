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
} from '@fluentui/react-components';
import Container from '../components/Container';

export const Route = createFileRoute('/')({
  component: Index,
});

type ItemType = {
  [key: string]: string | Date | string[];
};

const items: ItemType[] = [
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

const columns = [
  { columnKey: 'title', label: 'Title', type: 'string', required: true },
  {
    columnKey: 'description',
    label: 'Description',
    type: 'string',
  },
  {
    columnKey: 'dueDate',
    label: 'Due Date',
    type: 'date',
  },
  {
    columnKey: 'priority',
    label: 'Priority',
    type: 'select',
    options: ['low', 'medium', 'high'],
    required: true,
  },
  {
    columnKey: 'status',
    label: 'Status',
    type: 'select',
    options: ['todo', 'in-progress', 'completed'],
    required: true,
  },
  { columnKey: 'tags', label: 'Tags', type: 'array' },
];

function Index() {
  const renderTitle = () => {
    return <Title3>List Task</Title3>;
  };
  const renderAction = () => {
    return <Button appearance="primary">Add Task</Button>;
  };
  return (
    <Container title={renderTitle()} action={renderAction()}>
      <Table arial-label="Default table" style={{ minWidth: '510px' }}>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.columnKey}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            return (
              <TableRow key={item.id}>
                {columns.map((column, index) => {
                  const key: keyof typeof item = column.columnKey;
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
      </Table>
    </Container>
  );
}
