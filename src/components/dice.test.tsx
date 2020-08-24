import React from 'react';
import { render, unmountComponentAtNode, ComponentType } from "react-dom";
import { renderToString } from "react-dom/server"
import { act } from 'react-dom/test-utils';

import {
  Dice1Fill,
  Dice2Fill,
  Dice3Fill,
  Dice4Fill,
  Dice5Fill,
  Dice6Fill,
} from 'react-bootstrap-icons';

import Container from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { DieIcon, TwoDIcon, throwDice } from './dice';
import './dice.css';

let container: any = null;

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


function DieIconTest(value: number, Icon: ComponentType) {
  return it(`renders DieIcon with value ${value}`, () => {
    act(() => {
      render(<DieIcon value={value} />, container);
    });
    expect(container.innerHTML).toEqual(
      renderToString(<Icon className="text-primary p-1" size={48} />)
    );
  });
};

const DieValueToIconMap: Record<number, ComponentType<Props>> = {
  1: Dice1Fill,
  2: Dice2Fill,
  3: Dice3Fill,
  4: Dice4Fill,
  5: Dice5Fill,
  6: Dice6Fill,
};

for (let value in DieValueToIconMap) {
  DieIconTest(parseInt(value), DieValueToIconMap[value])
};

it("renders TwoDIcon with values 5 and 3", () => {
  act(() => {
    render(<TwoDIcon values={[5, 3]} />, container);
  });
  expect(container.innerHTML).toEqual(
    renderToString(<Container
      className="border border-secondary d-flex justify-content-center two-d-icon"
    >
      <Row className="d-flex justify-content-center">
        <DieIcon value={5} />
        <DieIcon value={3} />
      </Row>
      <Row className='d-flex justify-content-center'>
        <b className="text-primary pt-1">
          8
        </b>
      </Row>
    </Container >)
  );
});

it("renders TwoDIcon with values 4 and 6", () => {
  act(() => {
    render(<TwoDIcon values={[4, 6]} />, container);
  });
  expect(container.innerHTML).toEqual(
    renderToString(<Container
      className="border border-secondary d-flex justify-content-center two-d-icon"
    >
      <Row className="d-flex justify-content-center">
        <DieIcon value={4} />
        <DieIcon value={6} />
      </Row>
      <Row className='d-flex justify-content-center'>
        <b className="text-primary pt-1">
          10
        </b>
      </Row>
    </Container >)
  );
});

// mocks out random function so can test throwDice
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

it('throws one die', () => {
  expect(throwDice(1)).toEqual([3])
});

it('throws two dice', () => {
  expect(throwDice(2)).toEqual([3, 3])
});