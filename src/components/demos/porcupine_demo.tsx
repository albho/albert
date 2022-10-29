import React, { useEffect } from 'react'; // remove useState
import { usePorcupine } from '@picovoice/porcupine-react';

const PorcupineDemo = () => {
  const {
    // comment out unused to prevent warnings
    keywordDetection,
    isLoaded,
    isListening,
    error,
    init,
    start,
    stop,
    release,
  } = usePorcupine();

  // could provide suggestions on where to put model object
  const porcupineModel = {
    publicPath: '/models/porcupine_params.pv',
  };

  const keywordModel = {
    publicPath: '/models/computer.ppn',
    label: 'Computer',
  };

  // refactor to avoid warnings
  const initEngine = async () => {
    await init(
      `${process.env.PICOVOICE_ACCESS_KEY}`,
      [keywordModel],
      porcupineModel
    );
  };

  // needs a version that does not do setLoading = false for cleanup
  useEffect(() => {
    return () => {
      if (error === null && isLoaded) {
        release();
      }
    };
  }, []);

  useEffect(() => {
    if (keywordDetection !== null) {
      console.log(keywordDetection);
    }
  }, [keywordDetection]);

  return (
    <div>
      <button
        onClick={() => start()}
        disabled={error !== null || !isLoaded || isListening}
      >
        Start
      </button>
      <button
        onClick={() => stop()}
        disabled={error !== null || !isLoaded || !isListening}
      >
        Stop
      </button>
      <button className="init-button" onClick={() => initEngine()}>
        Init Porcupine
      </button>
      <button onClick={() => release()} disabled={error !== null || !isLoaded}>
        Release
      </button>
    </div>
  );
};

export default PorcupineDemo;
