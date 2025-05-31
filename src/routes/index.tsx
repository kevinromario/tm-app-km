import { createFileRoute } from '@tanstack/react-router';

import {
  Title3,
  Button,
  type TableRowId,
  useId,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
  Toaster,
  Spinner,
} from '@fluentui/react-components';
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
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useBulkDeleteTasks } from '../hooks/useBulkDeleteTasks';
import { useUpdateTask } from '../hooks/useUpdateTask';

export const Route = createFileRoute('/')({
  component: Index,
});

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
    tasksList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingFetchData,
    error: errorFetchTaskList,
  } = useGetTasksList();

  const {
    mutateAsync: addTask,
    isPending,
    error: errorAddNewTask,
  } = useAddNewTask();

  const {
    mutateAsync: updateTask,
    isPending: loadingUpdateTask,
    error: errorUpdateTask,
  } = useUpdateTask();

  const { mutateAsync: deleteTask, isPending: loadingDeleteTask } =
    useDeleteTask();

  const { mutateAsync: bulkDeleteTasks, isPending: loadingBulkDeleteTasks } =
    useBulkDeleteTasks();

  const [page, setPage] = useState(1);
  const [isAddTask, setIsAddTask] = useState(false);
  const [isEditTask, setIsEditTask] = useState(false);
  const [initialData, setInitialData] = useState<FormDataType>({});
  const [taskSelected, setTaskSelected] = useState(0);
  const [selectedRows, setSelectedRows] = useState(
    () => new Set<TableRowId>([]),
  );

  useEffect(() => {
    setTaskSelected(Array.from(selectedRows).length);
  }, [selectedRows]);

  const handleFetchNextPage = () => {
    fetchNextPage();
  };

  const handleBulkDeleteTasks = async () => {
    try {
      const selectedTasks = Array.from(selectedRows);
      if (selectedTasks.length === 0) {
        throw new Error('No selected task');
      }
      const selectedTasksid = selectedTasks.map(
        (task) => tasksList[task as number].id as string,
      );
      await bulkDeleteTasks({ listId: selectedTasksid });

      notify('Successfully Bulk Delete Task', 'success');
      handleResetSelected();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify(error.message, 'error');
    }
  };

  const handleDeleteRow = async (taskId?: string) => {
    try {
      if (!taskId) {
        throw new Error('Task Id not found');
      }
      await deleteTask({ taskId });
      notify('Successfully Delete Task', 'success');
      handleResetSelected();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify(error.message, 'error');
    }
  };

  const handleSubmitNewTask = async (props: FormDataType) => {
    try {
      await addTask({
        ...props,
        organizationId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setIsAddTask(false);
      notify('Successfully Create a New Task', 'success');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // do nothing
    }
  };

  const toasterId = useId('toaster');
  const { dispatchToast } = useToastController(toasterId);
  const notify = (
    message: string,
    intent: 'error' | 'info' | 'warning' | 'success',
  ) =>
    dispatchToast(
      <Toast>
        <ToastTitle>{intent}</ToastTitle>
        <ToastBody>{message}</ToastBody>
      </Toast>,
      { intent, position: 'top-end' },
    );

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
          <Button
            disable={loadingBulkDeleteTasks}
            style={{ marginLeft: '10px' }}
            onClick={handleBulkDeleteTasks}
            icon={loadingBulkDeleteTasks ? <Spinner size="tiny" /> : null}
          >
            {loadingBulkDeleteTasks
              ? 'Loading...'
              : `Delete ${taskSelected} Task`}
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

  const handleEditTask = (index: number) => {
    setInitialData(tasksList[index]);
    setIsEditTask(true);
  };

  const handleSubmitEditTask = async (props: FormDataType) => {
    try {
      const updatedFields = Object.entries(props).reduce(
        (acc, [key, value]) => {
          if (value !== initialData[key]) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Partial<typeof props>,
      );

      if (Object.keys(updatedFields).length === 0) {
        throw new Error('No changes detected');
      }

      await updateTask({
        ...updatedFields,
        updatedAt: new Date().toISOString(),
        taskId: initialData.id,
      });

      setIsEditTask(false);
      setInitialData({});
      notify('Successfully Update Task', 'success');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify(error.message, 'error');
    }
  };

  useEffect(() => {
    handleResetSelected();
  }, [isEditTask]);

  return (
    <Container title={renderTitle()} action={renderAction()}>
      <Toaster toasterId={toasterId} />
      <Filter listColumns={columnsMock} />
      <Table
        items={tasksList || []}
        listColumns={columnsMock}
        page={page}
        setPage={setPage}
        isEditable
        isDeletable
        handleDeleteRow={handleDeleteRow}
        isMultiSelect
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        isLoading={isLoadingFetchData}
        error={errorFetchTaskList?.message}
        hasNextPage={hasNextPage}
        handleFetchNextPage={handleFetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        loadingDeleteRow={loadingDeleteTask}
        handleEditRow={handleEditTask}
      />
      <div style={{ display: 'none' }}>
        <Dialog
          isOpen={isEditTask}
          setIsOpen={setIsEditTask}
          btnText="Edit Task"
          title="Edit Task"
          listColumns={columnsMock}
          initialData={initialData}
          onSubmit={handleSubmitEditTask}
          loading={loadingUpdateTask}
          error={errorUpdateTask?.message}
        />
      </div>
    </Container>
  );
}
