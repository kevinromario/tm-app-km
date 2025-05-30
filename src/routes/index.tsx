import { createFileRoute } from '@tanstack/react-router';

import { Title3, Button, type TableRowId } from '@fluentui/react-components';
import Container from '../components/Container';
import { useEffect, useState } from 'react';
import Table from '../components/Table';
import type { FieldType } from '../constants';

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

type ColumnType = {
  name: string;
  label: string;
  type: FieldType;
  options?: Array<string>;
  required?: boolean;
};

const columnsMock: ColumnType[] = [
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
  const [page, setPage] = useState(1);
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

  return (
    <Container title={renderTitle()} action={renderAction()}>
      <Table
        items={itemsMock}
        listColumns={columnsMock}
        page={page}
        setPage={setPage}
        isEditable
        isDeletable
        isMultiSelect
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </Container>
  );
}
