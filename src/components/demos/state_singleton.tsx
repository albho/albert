import React, { useState } from 'react';

// Note: this app does not make much sense in a React context,
// but the pattern has been illustrated.

enum State {
  ON = 'ON',
  OFF = 'OFF',
}

class ApplicationState {
  static instance: ApplicationState;
  state: string;

  constructor() {
    if (ApplicationState.instance === undefined) {
      this.state = State.OFF;
      ApplicationState.instance = this;
    }

    return ApplicationState.instance;
  }

  toggleState() {
    if (this.state === State.ON) {
      this.state = State.OFF;
    } else {
      this.state = State.ON;
    }
  }

  getState() {
    return this.state;
  }
}

const applicationState = new ApplicationState();

const StateSingleton = () => {
  const currentState = applicationState.getState();
  const [state, setState] = useState(currentState);

  return (
    <div className="demo">
      <div>[STATE]: {state}</div>
      <button
        onClick={() => {
          applicationState.toggleState();
          const newState = applicationState.getState();
          setState(newState);
        }}
      >
        Toggle State
      </button>
    </div>
  );
};

export default StateSingleton;
