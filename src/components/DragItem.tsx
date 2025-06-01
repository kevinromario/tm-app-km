import type { FieldType } from '../constants';
import { CompoundButton } from '@fluentui/react-components';
import {
  CalendarClockRegular,
  CalendarDateRegular,
  CheckmarkSquareRegular,
  ClipboardTextLtrRegular,
  ColorLineRegular,
  FormNewRegular,
  MailCopyRegular,
} from '@fluentui/react-icons';

export default function DragItem({ type }: { type?: FieldType }) {
  if (type === 'array') {
    return (
      <CompoundButton
        icon={<FormNewRegular />}
        style={{
          border: '1px solid #ccc',
          padding: '8px',
          backgroundColor: '#f5f5f5',
          cursor: 'move',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      >
        {type.toUpperCase()}
      </CompoundButton>
    );
  } else if (type === 'date') {
    return (
      <CompoundButton
        icon={<CalendarDateRegular />}
        style={{
          border: '1px solid #ccc',
          padding: '8px',
          backgroundColor: '#f5f5f5',
          cursor: 'move',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      >
        {type.toUpperCase()}
      </CompoundButton>
    );
  } else if (type === 'datetime-local') {
    return (
      <CompoundButton
        icon={<CalendarClockRegular />}
        style={{
          border: '1px solid #ccc',
          padding: '8px',
          backgroundColor: '#f5f5f5',
          cursor: 'move',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      >
        DATETIME
      </CompoundButton>
    );
  } else if (type === 'email') {
    return (
      <CompoundButton
        icon={<MailCopyRegular />}
        style={{
          border: '1px solid #ccc',
          padding: '8px',
          backgroundColor: '#f5f5f5',
          cursor: 'move',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      >
        {type.toUpperCase()}
      </CompoundButton>
    );
  } else if (type === 'select') {
    return (
      <CompoundButton
        icon={<CheckmarkSquareRegular />}
        style={{
          border: '1px solid #ccc',
          padding: '8px',
          backgroundColor: '#f5f5f5',
          cursor: 'move',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      >
        {type.toUpperCase()}
      </CompoundButton>
    );
  } else if (type === 'text-area') {
    return (
      <CompoundButton
        icon={<ClipboardTextLtrRegular />}
        style={{
          border: '1px solid #ccc',
          padding: '8px',
          backgroundColor: '#f5f5f5',
          cursor: 'move',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      >
        {type.toUpperCase()}
      </CompoundButton>
    );
  } else {
    return (
      <CompoundButton
        icon={<ColorLineRegular />}
        style={{
          border: '1px solid #ccc',
          padding: '8px',
          backgroundColor: '#f5f5f5',
          cursor: 'move',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      >
        {type?.toUpperCase() || 'TEXT'}
      </CompoundButton>
    );
  }
}
