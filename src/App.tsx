import React from 'react';
import {useMachine} from '@xstate/react';
import {
  interpret,
  createMachine,
  assign,
  actions,
  send,
  DoneInvokeEvent,
} from 'xstate';
import './App.css';


const {cancel} = actions;

type Context = {
  phrase: string;
  result: number | undefined;
}

type TypeEvent = {
  type: 'TYPE',
  data: string
}

type SearchEvent = {
  type: 'SEARCH';
  data: undefined;
}

type Events = TypeEvent | SearchEvent;

const searchMachine = createMachine<Context, Events>(
    {
      id: 'main',
      initial: 'idle',
      context: {
        phrase: '',
        result: undefined,
      },
      on: {
        TYPE: {
          actions: ['setPhrase', 'cancelSearchEvent', 'sendSearchEvent'],
        },
        SEARCH: {
          target: '.searching',
        },
      },
      states: {
        idle: {},
        searching: {
          invoke: {
            src: 'search',
            onDone: {
              actions: 'setResult',
              target: 'idle',
            },
            onError: {
              target: 'idle',
            },
          },
        },
      },
    },
    {
      actions: {
        setPhrase: () => (
          assign({
            phrase: (_, event: TypeEvent) => event.data,
          })),
        sendSearchEvent: send(
            {type: 'SEARCH'},
            {id: 'searchEvent', delay: 10},
        ),
        setResult: assign({
          result: (_, event: DoneInvokeEvent<number>) => event.data,
          // https://github.com/statelyai/xstate/issues/1198
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any,
        cancelSearchEvent: cancel('searchEvent'),
      },
      services: {
        search: async () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(Math.random());
            }, 1000);
          });
        },
      },
    },
);


const service = interpret(searchMachine, {devTools: true});
service.start();

const App: React.FC = () => {
  const [current, send] = useMachine(searchMachine);
  const {result, phrase} = current.context;
  return (
    <div>
      Result: <strong>{result}</strong>
      <br/>
      State: <strong>{current.value}</strong>
      <br/>
      <input
        value={phrase}
        onChange={(event) => {
          send({type: 'TYPE', data: event.target.value});
        }}/>
    </div>
  );
};

export default App;
