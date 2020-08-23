import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";

import App from './App';

let container: any;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('renders title page', () => {
  act(() => {
    render(<App />, container);
  });
  expect(container.innerHTML).toContain(
    '<header class="App-header">'
    + '<h1 class="display-1">Travelers</h1>'
    + '<h2>A Cepheus Light Character Generator</h2></header>'
  );
});
