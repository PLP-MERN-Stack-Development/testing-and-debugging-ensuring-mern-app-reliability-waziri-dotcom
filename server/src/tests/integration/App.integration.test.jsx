import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/bugs', (req, res, ctx) => res(ctx.json({ data: [] }))),
  rest.post('/api/bugs', (req, res, ctx) => res(ctx.json({ data: { _id: '1', title: 't', description: '', severity: 'low', status: 'open'} })))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders empty list', async () => {
  render(<App />);
  await waitFor(()=> expect(screen.getByText(/No bugs reported yet/)).toBeInTheDocument());
});
