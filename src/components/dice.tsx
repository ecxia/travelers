import React, { ComponentType } from 'react';

import Container from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {
  Dice1Fill,
  Dice2Fill,
  Dice3Fill,
  Dice4Fill,
  Dice5Fill,
  Dice6Fill,
} from 'react-bootstrap-icons';

import './dice.css';

function DieIcon(props: { value: number }): JSX.Element {

  const DiceIcons: ComponentType[] = [
    Dice1Fill, Dice2Fill, Dice3Fill, Dice4Fill, Dice5Fill, Dice6Fill,
  ]

  const diceprops: {
    className: string,
    size: number
  } = {
    className: "text-primary p-1",
    size: 48
  }

  const Icon: ComponentType<any> = DiceIcons[props.value - 1]

  return <Icon {...diceprops} />;
}

function TwoDIcon(props: any): JSX.Element {
  return (
    <Container
      className="border border-secondary d-flex justify-content-center two-d-icon"
    >
      <Row className="d-flex justify-content-center">
        <DieIcon value={props.values[0]} />
        <DieIcon value={props.values[1]} />
      </Row>
      <Row className='d-flex justify-content-center'>
        <b className="text-primary pt-1">
          {props.values[0] + props.values[1]}
        </b>
      </Row>
    </Container>
  );
}

function throwDice(n: number): number[] {
  let throws: number[] = [];
  let i: number;
  for (i = 0; i < n; i++) {
    throws.push(
      Math.floor(Math.random() * Math.floor(5)) + 1,
    );
  }
  return throws;
}

export { DieIcon, TwoDIcon, throwDice, };