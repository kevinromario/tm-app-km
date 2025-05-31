import { createFileRoute } from '@tanstack/react-router';

import { Title3, Button, type TableRowId } from '@fluentui/react-components';
import Container from '../components/Container';
import { useEffect, useState } from 'react';
import Table from '../components/Table';
import {
  organizationId,
  type ColumnType,
  type FormDataType,
} from '../constants';
import Filter from '../components/Filter';
import Dialog from '../components/Dialog';
import { useGetTasksList } from '../hooks/useGetTasksList';
import { useAddNewTask } from '../hooks/useAddNewTask';

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

const columnsMock: ColumnType[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
    filterable: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text-area',
    filterable: true,
  },
  {
    name: 'dueDate',
    label: 'Due Date',
    type: 'date',
    filterable: true,
  },
  {
    name: 'priority',
    label: 'Priority',
    type: 'select',
    options: ['low', 'medium', 'high'],
    required: true,
    filterable: true,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: ['todo', 'in-progress', 'completed'],
    required: true,
    filterable: true,
  },
  { name: 'tags', label: 'Tags', type: 'array', filterable: true },
];

function Index() {
  const {
    data: taskList,
    isLoading: isLoadingFetchData,
    error: errorFetchTaskList,
  } = useGetTasksList();
  const {
    mutateAsync: addTask,
    isPending,
    isSuccess,
    error: errorAddNewTask,
  } = useAddNewTask();
  console.log(errorAddNewTask);
  const [page, setPage] = useState(1);
  const [isAddTask, setIsAddTask] = useState(false);
  const [taskSelected, setTaskSelected] = useState(0);
  const [selectedRows, setSelectedRows] = useState(
    () => new Set<TableRowId>([]),
  );

  useEffect(() => {
    setTaskSelected(Array.from(selectedRows).length);
  }, [selectedRows]);

  useEffect(() => {
    if (isSuccess) {
      console.log('berhasil');
    }
  }, [isSuccess]);

  const handleSubmitNewTask = async (props: FormDataType) => {
    try {
      await addTask({ ...props, organizationId });
      setIsAddTask(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // do nothing
    }
  };

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
    return (
      <Dialog
        isOpen={isAddTask}
        setIsOpen={setIsAddTask}
        btnText="Add New Task"
        title="Add New Task"
        listColumns={columnsMock}
        onSubmit={handleSubmitNewTask}
        loading={isPending}
        error={errorAddNewTask?.message}
      />
    );
  };

  return (
    <Container title={renderTitle()} action={renderAction()}>
      <Filter listColumns={columnsMock} />
      <Table
        items={taskList || []}
        listColumns={columnsMock}
        page={page}
        setPage={setPage}
        isEditable
        isDeletable
        isMultiSelect
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        isLoading={isLoadingFetchData}
        error={errorFetchTaskList?.message}
      />
    </Container>
  );
}
