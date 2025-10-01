type CommonFieldType = {
  id: string;
  required?: boolean;
  value: string;
};

export type SelectFieldType = CommonFieldType & {
  list: string[];
};

export type TextFieldType = CommonFieldType & {
  label: string;
};

export type FieldType = SelectFieldType | TextFieldType;
