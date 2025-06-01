import {
  TableBody,
  TableCell,
  TableRow,
  Table as ContainerTable,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Button,
  TableCellActions,
  TableSelectionCell,
  useTableFeatures,
  useTableSelection,
  type TableRowId,
  type TableColumnDefinition,
  createTableColumn,
  Skeleton,
  SkeletonItem,
  MessageBar,
  MessageBarBody,
  Spinner,
  Text,
} from '@fluentui/react-components';
import { format, parseISO, isValid } from 'date-fns';

import {
  EditRegular,
  EditFilled,
  DeleteRegular,
  DeleteFilled,
  bundleIcon,
} from '@fluentui/react-icons';

import { useCallback, type Dispatch, type SetStateAction } from 'react';
import type { ColumnTable } from '../constants';

const EditIcon = bundleIcon(EditFilled, EditRegular);

const DeleteIcon = bundleIcon(DeleteFilled, DeleteRegular);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCellValue = (value: any) => {
  if (!value) return '-';
  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : '-';
  }
  if (typeof value === 'string') {
    const date = parseISO(value);
    const isDate =
      isValid(date) && value.length >= 10 && !isNaN(date.getTime());

    if (isDate) {
      const hasTime = value.includes('T') || value.includes(':');
      return (
        <Text>
          {hasTime
            ? format(date, 'dd MMMM yyyy HH:mm')
            : format(date, 'dd MMMM yyyy')}
        </Text>
      );
    }

    return <Text>{value.charAt(0).toUpperCase() + value.slice(1)}</Text>;
  }
  return <Text>{value}</Text>;
};

type ItemType = Record<string, unknown>;

type TableType = {
  items: ItemType[];
  listColumns: ColumnTable[];
  handleDeleteRow?: (id?: string) => void;
  handleEditRow?: (index: number) => void;
  // Required for pagination Offset-based
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  //
  isLoading: boolean;
  loadingDeleteRow: boolean;
  // Required for pagination Cursor-based
  hasNextPage: boolean;
  handleFetchNextPage: () => void;
  isFetchingNextPage: boolean;
  //
  error?: string;
  // Optional: whether rows can be deleted
  isDeletable?: boolean;
  // Optional: whether rows can be edited
  isEditable?: boolean;
  // Enable multi-row selection mode
  isMultiSelect?: boolean;
  // Required if isMultiSelect is true: holds the selected row IDs
  selectedRows?: Set<TableRowId>;
  // Required if isMultiSelect is true: updates the selected row IDs
  setSelectedRows?: React.Dispatch<React.SetStateAction<Set<TableRowId>>>;
};

export default function Table({
  items,
  listColumns,
  isMultiSelect,
  isEditable,
  isDeletable,
  selectedRows,
  setSelectedRows,
  isLoading,
  error,
  hasNextPage,
  handleFetchNextPage,
  isFetchingNextPage,
  handleDeleteRow,
  loadingDeleteRow,
  handleEditRow,
}: TableType) {
  const columns: TableColumnDefinition<ItemType>[] = listColumns.map((item) => {
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
  } = useTableFeatures({ columns: columns, items }, [
    useTableSelection({
      selectionMode: isMultiSelect ? 'multiselect' : 'single',
      ...(selectedRows && { selectedItems: selectedRows }),
      ...(setSelectedRows && {
        onSelectionChange: (_e, data) => setSelectedRows(data.selectedItems),
      }),
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

  if (isLoading) {
    return (
      <Skeleton
        animation="pulse"
        aria-label="Loading Content"
        style={{ marginTop: 10 }}
      >
        <SkeletonItem size={120} />
      </Skeleton>
    );
  }

  if (error) {
    return (
      <MessageBar
        key={'error'}
        intent={'error'}
        style={{ minHeight: 'fit-content', padding: '10px', marginTop: 10 }}
      >
        <MessageBarBody>{error}</MessageBarBody>
      </MessageBar>
    );
  }

  return (
    <>
      <ContainerTable arial-label="Default table" style={{ minWidth: '510px' }}>
        <TableHeader>
          <TableRow>
            {isMultiSelect && (
              <TableSelectionCell
                checked={
                  allRowsSelected ? true : someRowsSelected ? 'mixed' : false
                }
                onClick={toggleAllRows}
                onKeyDown={toggleAllKeydown}
                checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
              />
            )}
            {listColumns.map((column) => (
              <TableHeaderCell key={column.name}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        {rows.length ? (
          <TableBody>
            {rows.map(
              ({ item, selected, onClick, onKeyDown, appearance }, idx) => {
                return (
                  <TableRow
                    key={item?.id}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    aria-selected={selected}
                    appearance={appearance}
                  >
                    {isMultiSelect && (
                      <TableSelectionCell
                        checked={selected}
                        checkboxIndicator={{ 'aria-label': 'Select row' }}
                      />
                    )}
                    {listColumns.map((column, index) => {
                      const key: keyof typeof item = column.name;
                      return (
                        <TableCell key={`${column.name}-${idx}`}>
                          <TableCellLayout>
                            {renderCellValue(item[key])}
                          </TableCellLayout>
                          {(isDeletable || isEditable) &&
                            columns?.length - 1 === index && (
                              <TableCellActions>
                                {isEditable && (
                                  <Button
                                    icon={<EditIcon />}
                                    appearance="subtle"
                                    aria-label="Edit"
                                    onClick={() =>
                                      handleEditRow && handleEditRow(idx)
                                    }
                                  />
                                )}
                                {isDeletable && (
                                  <Button
                                    disable={loadingDeleteRow}
                                    icon={
                                      loadingDeleteRow ? (
                                        <Spinner size="tiny" />
                                      ) : (
                                        <DeleteIcon />
                                      )
                                    }
                                    appearance="subtle"
                                    aria-label="More actions"
                                    onClick={() =>
                                      handleDeleteRow &&
                                      handleDeleteRow(item?.id as string)
                                    }
                                  />
                                )}
                              </TableCellActions>
                            )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              },
            )}
          </TableBody>
        ) : null}
      </ContainerTable>
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
      {hasNextPage && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginRight: 10,
          }}
        >
          <Button
            appearance="primary"
            isLoading={isFetchingNextPage}
            icon={isFetchingNextPage ? <Spinner size="tiny" /> : null}
            onClick={() => handleFetchNextPage()}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </>
  );
}
