import React, { useState, ComponentType, Component } from 'react';

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'

import {
  Dice1Fill,
  Dice2Fill,
  Dice3Fill,
  Dice4Fill,
  Dice5Fill,
  Dice6Fill,
  Square,
} from 'react-bootstrap-icons';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './App.css';

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="display-1">Travelers</h1>
        <h2>A Cepheus Light Character Generator</h2>
      </header>
      <Generator />
    </div>
  );
}

// generator status
interface Status {
  step: number,
  name: string,
};

function Generator(): JSX.Element {

  // generator status
  const statuses: Status[] = [
    { step: 0, name: "Name" },
    { step: 1, name: "Characteristics", },
    { step: 2, name: "Homeworld Skills", },
    { step: 3, name: "Careers", },
    { step: 4, name: "Mustering Out", },
  ];

  const [status, setStatus] = useState(statuses[0]);

  const nextStep = (event: any) => {
    setStatus(statuses[status.step + 1])
  }

  // basic info
  const [name, setName] = useState('Traveler');
  const [age, setAge] = useState(18);
  const [homeworld, setHomeworld] = useState('[HOMEWORLD]');


  return (
    <main>
      <section>
        <Card body>
          <Card.Title><h3>Step {status.step}: {status.name}</h3></Card.Title>
          <NameStep
            status={status}
            nextStep={nextStep}
            name={name}
            setName={setName}
          />
          <CharacteristicsStep
            status={status}
            nextStep={nextStep}
          />
        </Card>
      </section>
      <section>
        <Card body>
          <Card.Title><h3>Character Data</h3></Card.Title>
          <CardColumns>
            <BasicInfoCard name={name} age={age} homeworld={homeworld} />
            <CharacteristicsCard />
            <SkillsCard />
            <CareerCard />
            <PossessionsCard />
          </CardColumns >
        </Card>
      </section>
      <section>
        <Card body>
          <Card.Title><h3>History</h3></Card.Title>
          <HistoryCard />
        </Card>
      </section>
    </main >
  )
}

function BasicInfoCard(props: {
  name: string,
  age: number,
  homeworld: string
}): JSX.Element {
  return (
    <Card body border='info'>
      <Card.Title>Basic Info</Card.Title>
      <Card.Text>
        <b>Name:</b> {props.name} <br />
        <b>Age:</b> {props.age} <br />
        <b>Homeworld:</b> {props.homeworld} <br />
      </Card.Text>
    </Card>
  );
}

function CharacteristicsCard(props: any) {
  return (
    <Card body border='info'>
      <Card.Title>Characteristics</Card.Title>
      <Card.Text>
        <b>STR:</b> [STR] <br />
        <b>DEX:</b> [DEX] <br />
        <b>END:</b> [END] <br />
        <b>INT:</b> [INT] <br />
        <b>EDU:</b> [EDU] <br />
        <b>SOC:</b> [SOC] <br />
      </Card.Text>
    </Card>
  );
}

function SkillsCard(props: any) {
  return (
    <Card body border='info'>
      <Card.Title>Skills</Card.Title>
      <Card.Text>
        <b>[SKILL 1]:</b> [LEVEL] <br />
        <b>[SKILL 2]:</b> [LEVEL] <br />
      </Card.Text>
    </Card>
  );
}

function CareerCard(props: any) {
  return (
    <Card body border='info'>
      <Card.Title>Career</Card.Title>
      <Card.Text>
        [CAREER]<br />
        <b>Terms:</b> [TERMS]<br />
        <b>Rank:</b> [RANK]<br />
        <b>Retired:</b> [RETIRED]<br />
      </Card.Text>
    </Card>
  );
}

function HistoryCard(props: any) {
  return (
    <Card body border='secondary'>
      <Card.Text>
        Something happened.
      </Card.Text>
    </Card>
  );
}

function PossessionsCard(props: any) {
  return (
    <Card body border='info'>
      <Card.Title>Possessions</Card.Title>
      <Card.Text>
        <b>Funds:</b> [FUNDS] <br />
        <b>Item 1</b> x [QTY] <br />
        <b>Item 2</b> x [QTY] <br />
      </Card.Text>
    </Card>
  );
}

function NameStep(props: {
  status: Status,
  nextStep: (event: any) => void,
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
}): JSX.Element | null {
  if (props.status.step === 0) {
    return (
      <Card body border='primary'>
        <Form>
          <Form.Group>
            <Form.Label>Character Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={props.name}
              onChange={e => props.setName(e.target.value)}
            />
          </Form.Group>
          <Button onClick={props.nextStep}>Next</Button>
        </Form>
      </Card>
    );
  }
  return null;
}

function CharacteristicsStep(props: {
  status: Status,
  nextStep: (event: any) => void
}): JSX.Element | null {
  if (props.status.step === 1) {
    const dice: number[][] = throw2d(6);
    const diceRow: JSX.Element[] = dice.map((values) => (
      <Col>
        <TwoDIcon values={values} />
      </Col>
    ));

    const characteristics = ["STR", "DEX", "END", "INT", "EDU", "SOC"];
    const characteristicRow: JSX.Element[] = characteristics.map((value) => (
      <Col><b>{value}</b></Col>
    ));

    const dropRow: JSX.Element[] = dice.map((values) => (
      <Col className="d-flex justify-content-around">
        <Square className="text-secondary" size={100} />
      </Col>
    ));

    return (
      <DndProvider backend={HTML5Backend}>
        <Card body border='primary'>
          <Container>
            <Row className="py-3">{diceRow}</Row>
            <Row className="py-3">{characteristicRow}</Row>
            <Row>{dropRow}</Row>
          </Container>
          <br />
          <Button onClick={props.nextStep}>Next</Button>
        </Card>
      </DndProvider>
    );
  }
  return null;
}

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
  const containerStyle = {
    width: '100px',
    height: '100px',
    "flex-direction": 'column',
    "border-radius": '15px',
  }
  return (
    <Container className="border border-secondary d-flex justify-content-center" style={containerStyle}>
      <Row className="d-flex justify-content-center">
        <DieIcon value={props.values[0]} />
        <DieIcon value={props.values[1]} />
      </Row>
      <Row className='d-flex justify-content-center'>
        <b className="text-primary pt-1">{props.values[0] + props.values[1]}</b>
      </Row>
    </Container>
  );
}

function throw2d(n: number): number[][] {
  let rolls: number[][] = [];
  let i: number;
  for (i = 0; i < n; i++) {
    rolls.push([
      Math.floor(Math.random() * Math.floor(5)) + 1,
      Math.floor(Math.random() * Math.floor(5)) + 1
    ]);
  }
  return rolls;
}

export default App;