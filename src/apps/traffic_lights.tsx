import React from 'react';
import {useMachine} from '@xstate/react';
import {
    interpret,
    createMachine,
} from "xstate";


const lightMachine = createMachine({
    id: 'light',
    initial: 'green',
    states: {
        green: {
            on: {NEXT: {target: 'yellow'}}
        },
        yellow: {
            on: {NEXT: {target: 'red'}}
        },
        red: {
            on: {NEXT: {target: 'green'}}
        },
    }
})

const service = interpret(lightMachine, {devTools: true});
service.start();

const TrafficLightsApp: React.FC = () => {
    const [current, send] = useMachine(lightMachine, {devTools: true});

    const handleClick = () => {
        send({type: 'NEXT'})
    }

    return (
        <div>
            <p>{current.value}</p>
            <p>
                <button onClick={handleClick}>Next</button>
            </p>
        </div>
    )
}

export default TrafficLightsApp;
