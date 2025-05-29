import { Button, Title3 } from '@fluentui/react-components';
import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 30px',
        boxShadow: '0px 7px 7px 1px lightGray',
      }}
    >
      <Title3>Task Management App</Title3>
      <div>
        <div style={{ columnGap: '15px', display: 'flex' }}>
          <Link to="/">
            {({ isActive }) => {
              return (
                <Button appearance={isActive ? 'primary' : 'subtle'}>
                  Dashboard
                </Button>
              );
            }}
          </Link>{' '}
          <Link to="/setting">
            {({ isActive }) => {
              return (
                <Button appearance={isActive ? 'primary' : 'subtle'}>
                  Setting
                </Button>
              );
            }}
          </Link>
        </div>
      </div>
    </div>
  );
}
