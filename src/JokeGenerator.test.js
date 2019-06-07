import React from 'react';
import { cleanup, render, fireEvent, wait } from '@testing-library/react'
import '@testing-library/dom';
import 'jest-dom/extend-expect'
import * as axios from 'axios';
import MockAxios from 'axios-mock-adapter';

import Joke from './Joke';
import JokeGenerator from './JokeGenerator';

const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });

afterAll(() => mock.restore());
afterEach(() => cleanup());

test('joke component recieves props and renders text', () => {
  const { getByTestId } = render(
    <Joke text="funny stuff" />
  );

  expect(getByTestId('joke-text')).toHaveTextContent(
    'funny stuff'
  );
});

test('JokeGenerator component fetches a random joke and renders it', async () => {
  const { getByText,
    queryByTestId,
    queryByText,
  } = render(<JokeGenerator />);

  mock.onGet().replyOnce(200, {
    value: {
      joke: 'Really funny joke!',
    }
  });

  expect(getByText("You haven't loaded any joke yet!")).toBeInTheDocument();
  expect(getByText('Load a random joke')).toBeInTheDocument();

  fireEvent.click(getByText('Load a random joke'));
  await wait(() => expect(queryByText('Loading...')).not.toBeInTheDocument());

  expect(queryByTestId('joke-text')).toBeInTheDocument();
});