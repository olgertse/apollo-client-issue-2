import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ALL_DATA_QUERY = gql`
  query AllData {
    computer {
      id
      name
      cpu {
        model
        clockSpeed
      }
    }
  }
`;

const MODEL_QUERY = gql`
  query Model {
    computer {
      id
      cpu {
        model
      }
    }
  }
`;

const CLOCK_SPEED_QUERY = gql`
  query ClockSpeed {
    computer {
      id
      cpu {
        clockSpeed
      }
    }
  }
`;

function Model() {
  const {
    loading,
    data
  } = useQuery(MODEL_QUERY, { fetchPolicy: 'cache-only' });

  console.log('MODEL_QUERY:', { loading, data });

  return (
    <ul>
      <li>{`CPU: ${data.computer.cpu.model}`}</li>
    </ul>
  )
}

function ClockSpeed() {
  /**
   * Requested data is in the cache and gets returned immediately, as expected.
   */
  const {
    loading,
    data
  } = useQuery(CLOCK_SPEED_QUERY, { fetchPolicy: 'cache-and-network' });

  console.log('CLOCK_SPEED_QUERY:', { loading, data });

  return (
    <ul>
      <li>{`Clock speed: ${data.computer.cpu.clockSpeed} MHz`}</li>
    </ul>
  )
}

export default function App() {
  const {
    loading,
    data
  } = useQuery(ALL_DATA_QUERY);

  const [item, setItem] = useState('');

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Computer Info</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div>
          <h3>{data.computer.name}</h3>
          <button onClick={() => setItem('model')}>Model</button>
          <button onClick={() => setItem('clock-speed')}>Clock speed</button>
          {item === 'model' && <Model />}
          {item === 'clock-speed' && <ClockSpeed />}
        </div> 
      )}
    </main>
  );
}
