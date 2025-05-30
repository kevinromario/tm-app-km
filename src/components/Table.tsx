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
} from '@fluentui/react-components';

import {
  EditRegular,
  EditFilled,
  DeleteRegular,
  DeleteFilled,
  bundleIcon,
} from '@fluentui/react-icons';
import { Pagination } from './Pagination';
import { useCallback, type Dispatch, type SetStateAction } from 'react';
import type { FieldType } from '../constants';

const EditIcon = bundleIcon(EditFilled, EditRegular);

const DeleteIcon = bundleIcon(DeleteFilled, DeleteRegular);

type ItemType = Record<string, unknown>;

type ColumnType = {
  name: string;
  label: string;
  type: FieldType;
  options?: Array<string>;
  required?: boolean;
};

type TableType = {
  items: ItemType[];
  listColumns: ColumnType[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
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
  page,
  setPage,
  isMultiSelect,
  isEditable,
  isDeletable,
  selectedRows,
  setSelectedRows,
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
        onSelectionChange: (e, data) => setSelectedRows(data.selectedItems),
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
            {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => {
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
                      <TableCell>
                        <TableCellLayout>{item[key]}</TableCellLayout>
                        {(isDeletable || isEditable) &&
                          columns?.length - 1 === index && (
                            <TableCellActions>
                              {isEditable && (
                                <Button
                                  icon={<EditIcon />}
                                  appearance="subtle"
                                  aria-label="Edit"
                                />
                              )}
                              {isDeletable && (
                                <Button
                                  icon={<DeleteIcon />}
                                  appearance="subtle"
                                  aria-label="More actions"
                                />
                              )}
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
      <div>
        <Pagination totalItems={items.length} page={page} setPage={setPage} />
      </div>
    </>
  );
}
