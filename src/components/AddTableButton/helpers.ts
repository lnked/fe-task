import type { FieldType, SelectFieldType, TextFieldType } from './types';

export const select = ['Country', 'City', 'Street', 'Home'];

export const columnFields: FieldType[] = [
  {
    id: 'column1',
    label: 'First column',
    value: '',
    required: true,
  },
  {
    id: 'column2',
    label: 'Second column',
    value: '',
    required: true,
  },
  {
    id: 'column3',
    label: 'Third column',
    value: '',
    required: true,
  },
  {
    id: 'column4',
    list: select,
    value: select[0],
    required: true,
  },
];

export const isTextField = (field: FieldType): field is TextFieldType => 'label' in field;

export const isSelectField = (field: FieldType): field is SelectFieldType => 'list' in field;
