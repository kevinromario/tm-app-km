import type { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  title?: ReactNode;
  action?: ReactNode;
};

export default function Container({ children, title, action }: ContainerProps) {
  const titleOrActionExist = title || action;
  return (
    <div>
      {titleOrActionExist && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px',
            borderBottom: 'solid 1px lightGray',
          }}
        >
          {title && <div>{title}</div>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
