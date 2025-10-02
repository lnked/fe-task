import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // или 'jest' если используете Jest

import { Input } from './Input'; // ← путь к вашему компоненту

describe('Input', () => {
  it('renders an input element with correct value and placeholder', () => {
    const placeholder = 'Enter text...';
    render(
      <Input value="test value" onChange={vi.fn()} onFocus={vi.fn()} onBlur={vi.fn()} placeholder={placeholder} />,
    );

    const input = screen.getByPlaceholderText(placeholder) as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.value).toBe('test value');
    expect(input.type).toBe('text');
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} onFocus={vi.fn()} onBlur={vi.fn()} />);

    const input = screen.getByRole('textbox');
    const newValue = 'new text';
    fireEvent.change(input, { target: { value: newValue } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(newValue);
  });

  it('calls onFocus when input is focused', () => {
    const handleFocus = vi.fn();
    render(<Input value="" onChange={vi.fn()} onFocus={handleFocus} onBlur={vi.fn()} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when input is blurred', () => {
    const handleBlur = vi.fn();
    render(<Input value="" onChange={vi.fn()} onFocus={vi.fn()} onBlur={handleBlur} />);

    const input = screen.getByRole('textbox');
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('does not crash when placeholder is not provided', () => {
    render(<Input value="" onChange={vi.fn()} onFocus={vi.fn()} onBlur={vi.fn()} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDefined();
    expect(input).not.toHaveAttribute('placeholder');
  });
});
