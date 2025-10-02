import { describe, expect } from 'vitest';

import { select, columnFields, isTextField, isSelectField } from './helpers';
import type { FieldType, TextFieldType, SelectFieldType } from './types';

describe('fields module', () => {
  describe('constants', () => {
    it('should export correct "select" array', () => {
      expect(select).toEqual(['Country', 'City', 'Street', 'Home']);
    });

    it('should export correct "columnFields" structure', () => {
      expect(columnFields).toHaveLength(4);

      // Проверяем первые три поля — текстовые
      for (let i = 0; i < 3; i++) {
        const field = columnFields[i];
        expect(field).toEqual({
          id: `column${i + 1}`,
          label: `${['First', 'Second', 'Third'][i]} column`,
          value: '',
          required: true,
        });
      }

      const selectField = columnFields[3];

      expect(selectField).toEqual({
        id: 'column4',
        list: ['Country', 'City', 'Street', 'Home'],
        value: 'Country',
        required: true,
      });
    });
  });

  describe('type guards', () => {
    const textField: TextFieldType = {
      id: 'text1',
      label: 'Text Field',
      value: 'some value',
      required: false,
    };

    const selectField: SelectFieldType = {
      id: 'select1',
      list: ['Option1', 'Option2'],
      value: 'Option1',
      required: true,
    };

    const invalidField = { id: 'invalid', unknown: true } as unknown as FieldType;

    it('isTextField should return true for TextFieldType', () => {
      expect(isTextField(textField)).toBe(true);
    });

    it('isTextField should return false for SelectFieldType', () => {
      expect(isTextField(selectField)).toBe(false);
    });

    it('isTextField should return false for invalid field', () => {
      expect(isTextField(invalidField)).toBe(false);
    });

    it('isSelectField should return true for SelectFieldType', () => {
      expect(isSelectField(selectField)).toBe(true);
    });

    it('isSelectField should return false for TextFieldType', () => {
      expect(isSelectField(textField)).toBe(false);
    });

    it('isSelectField should return false for invalid field', () => {
      expect(isSelectField(invalidField)).toBe(false);
    });

    it('type guards should be mutually exclusive', () => {
      // Поле не может быть одновременно текстовым и селектом
      expect(isTextField(textField) && isSelectField(textField)).toBe(false);
      expect(isTextField(selectField) && isSelectField(selectField)).toBe(false);
    });
  });
});
