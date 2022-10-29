import React, { useState, useRef, useEffect } from 'react';
import { CheetahWorker, CheetahTranscript } from '@picovoice/cheetah-web';
import { WebVoiceProcessor } from '@picovoice/web-voice-processor';

const CheetahDemo = () => {
  const [transcript, setTranscript] = useState('');
  const cheetahRef = useRef<null | CheetahWorker>(null);

  const transcriptCallback = (cheetahTranscript: CheetahTranscript) => {
    setTranscript(cheetahTranscript.transcript);
  };

  const initCheetah = async () => {
    try {
      const cheetah = await CheetahWorker.create(
        `${process.env.PICOVOICE_ACCESS_KEY}`,
        transcriptCallback,
        {
          publicPath: '/models/cheetah_snake_params.pv',
        }
      );

      cheetahRef.current = cheetah;
      WebVoiceProcessor.subscribe(cheetahRef.current);
    } catch (error) {
      console.log(error);
    }
  };

  const unsubscribeCheetah = async () => {
    WebVoiceProcessor.unsubscribe(cheetahRef.current!);

    try {
      await cheetahRef.current!.release();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(typeof transcript);
    console.log(transcript);
  }, [transcript]);

  return (
    <div>
      <button onClick={initCheetah}>Start</button>
      <button onClick={unsubscribeCheetah}>Stop</button>
      Transcription: {transcript}
    </div>
  );
};

export default CheetahDemo;
