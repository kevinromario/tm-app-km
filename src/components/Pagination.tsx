import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import { useState } from 'react';

import {
  bundleIcon,
  ChevronLeftFilled,
  ChevronLeftRegular,
  ChevronRightFilled,
  ChevronRightRegular,
} from '@fluentui/react-icons';

type PaginationType = {
  totalItems: number;
};

const PrevIcon = bundleIcon(ChevronLeftFilled, ChevronLeftRegular);

const NextIcon = bundleIcon(ChevronRightFilled, ChevronRightRegular);

export function Pagination({ totalItems }: PaginationType) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (totalItems >= limit) {
      setPage(page + 1);
    }
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
        <Menu positioning={{ autoSize: true }}>
          <MenuTrigger disableButtonEnhancement>
            <Button>{limit} items per page</Button>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>
                <div onClick={() => setLimit(5)}>5 items per page</div>
              </MenuItem>
              <MenuItem>
                <div onClick={() => setLimit(10)}>10 items per page</div>
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
      <div style={{ marginRight: 10 }}>
        <Button
          icon={<PrevIcon />}
          onClick={handlePrevPage}
          disabled={page <= 1}
        />
      </div>
      <div style={{ marginRight: 10 }}>{page}</div>
      <div style={{ marginRight: 10 }}>
        <Button
          icon={<NextIcon />}
          onClick={handleNextPage}
          disabled={totalItems < limit}
        />
      </div>
    </div>
  );
}
