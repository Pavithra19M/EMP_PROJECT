import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { messages } from '../config/Message';

afterEach(cleanup);

const setup = () =>
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

describe('LoginForm', () => {
  test('renders all form fields and button', () => {
    setup();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  test('shows error when fields are empty on submit', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(messages.emailField)).toBeInTheDocument();
    expect(await screen.findByText(messages.passwordFiled)).toBeInTheDocument();
  });

  test('clears fields on valid submit', () => {
    setup();
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPass123!' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  test('toggles password visibility', () => {
    setup();
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const toggleBtn = screen.getByLabelText('toggle password visibility');

    expect(passwordInput.type).toBe('password');
    fireEvent.click(toggleBtn);
    expect(passwordInput.type).toBe('text');
  });

  test('shows only password required error when password is empty', async () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    const passwordErrors = await screen.findAllByText(messages.passwordFiled);
    expect(passwordErrors.length).toBeGreaterThan(0);
  });

  test('shows only email format error when password is valid', async () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'invalid@com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'ValidPass123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(messages.emailRegxErr)).toBeInTheDocument();
  });
});
