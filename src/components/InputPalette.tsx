import { useDraggable } from '@dnd-kit/core';
import { type FieldType } from '../constants';
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

const inputTypes: FieldType[] = [
  'text',
  'text-area',
  'date',
  'datetime-local',
  'select',
  'array',
  'email',
];

export function InputPalette() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',

        gap: '7px',
      }}
    >
      {inputTypes.map((type) => (
        <PaletteItem key={type} type={type} />
      ))}
    </div>
  );
}

function PaletteItem({ type }: { type: FieldType }) {
  const item = { name: '', icon: <></> };
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `palette-${type}`,
    data: { type },
  });

  if (type === 'datetime-local') {
    item.name = 'datetime'.toUpperCase();
  } else {
    item.name = type.toUpperCase();
  }

  if (type === 'array') {
    item.icon = <FormNewRegular />;
  } else if (type === 'date') {
    item.icon = <CalendarDateRegular />;
  } else if (type === 'datetime-local') {
    item.icon = <CalendarClockRegular />;
  } else if (type === 'email') {
    item.icon = <MailCopyRegular />;
  } else if (type === 'select') {
    item.icon = <CheckmarkSquareRegular />;
  } else if (type === 'text-area') {
    item.icon = <ClipboardTextLtrRegular />;
  } else {
    item.icon = <ColorLineRegular />;
  }

  return (
    <CompoundButton
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      icon={item.icon}
      style={{
        border: '1px solid #ccc',
        padding: '8px',
        backgroundColor: '#f5f5f5',
        cursor: 'move',
        borderRadius: '4px',
        marginBottom: '8px',
      }}
    >
      {item.name}
    </CompoundButton>
  );
}
