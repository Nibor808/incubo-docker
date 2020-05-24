import React from 'react';
import { render } from '@testing-library/react';
import App from './app';
import { list2016, list2017 } from "./utils/portfolio_item_info";

test('renders github link', () => {
  const { getByTestId } = render(<App />);
  const githubLink = getByTestId("github-link");
  expect(githubLink).toBeInTheDocument();
});

test('renders logo image', () => {
  const { getByTestId } = render(<App />);
  const logoImage = getByTestId("logo-img")
  expect(logoImage).toBeInTheDocument();
});

test('renders 2017 list', () => {
  const { getByTestId } = render(<App />);
  const l2017 = getByTestId("2017-list")
  expect(l2017).toBeInTheDocument();
  expect(l2017.length).toHave(list2017.length);
});

test('renders 2016 list', () => {
  const { getByTestId } = render(<App />);
  const list2016 = getByTestId("2016-list")
  expect(list2016).toBeInTheDocument();
});

test('renders contact div', () => {
  const { getByTestId } = render(<App />);
  const contactDiv = getByTestId("contact-div")
  expect(contactDiv).toBeInTheDocument();
});

test('renders email form', () => {
  const { getByTestId } = render(<App />);
  const emailForm = getByTestId("email-form")
  expect(emailForm).toBeInTheDocument();
});