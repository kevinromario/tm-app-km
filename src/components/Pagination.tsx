import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text,
} from '@fluentui/react-components';
import { useState, type Dispatch, type SetStateAction } from 'react';

import {
  bundleIcon,
  ChevronLeftFilled,
  ChevronLeftRegular,
  ChevronRightFilled,
  ChevronRightRegular,
} from '@fluentui/react-icons';
import { pageSizeList } from '../constants';

type PaginationType = {
  totalItems: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
};

const PrevIcon = bundleIcon(ChevronLeftFilled, ChevronLeftRegular);

const NextIcon = bundleIcon(ChevronRightFilled, ChevronRightRegular);

export function Pagination({
  totalItems,
  page,
  setPage,
  pageSize,
  setPageSize,
}: PaginationType) {
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (totalItems >= pageSize) {
      setPage(page + 1);
    }
  };
  const handleChangePage = (x: number) => {
    setPage(x);
  };

  const renderListPage = () => {
    const items: Array<number | string> = [];
    for (let index = 0; index < 5; index++) {
      if (page - index >= 1) {
        items.push(page - index);
      } else {
        break;
      }
    }
    if (page > 6) {
      items.push('...');
    }
    if (page > 5) {
      items.push(1);
    }
    return items.reverse().map((item) => (
      <div style={{ marginRight: 10 }}>
        <Button
          disabled={typeof item !== 'number'}
          icon={<Text>{item}</Text>}
          onClick={() => {
            if (typeof item === 'number') {
              handleChangePage(item);
            }
          }}
        ></Button>
      </div>
    ));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginRight: 10,
      }}
    >
      <div style={{ marginRight: 10 }}>
        <Button
          icon={<PrevIcon />}
          onClick={handlePrevPage}
          disabled={page <= 1}
        />
      </div>
      {renderListPage()}
      <div style={{ marginRight: 10 }}>
        <Button
          icon={<NextIcon />}
          onClick={handleNextPage}
          disabled={totalItems < pageSize}
        />
      </div>
      <div style={{ marginRight: 10 }}>
        <Menu positioning={{ autoSize: true }}>
          <MenuTrigger disableButtonEnhancement>
            <Button>
              <Text>{pageSize} items per page</Text>
            </Button>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              {pageSizeList.map((x) => (
                <MenuItem>
                  <div onClick={() => setPageSize(x)}>{x} items per page</div>
                </MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </div>
  );
}
