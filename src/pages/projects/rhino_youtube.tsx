import React, { useState, useRef, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

// Rhino
import { useRhino } from '@picovoice/rhino-react';

// Styles
import { youtube } from './rhino_youtube.module.scss';

enum Commands {
  PLAY = 'play',
  PAUSE = 'pause',
  RESUME = 'resume',
}

const RhinoYouTube = () => {
  const [accessKey, setAccessKey] = useState('');
  const [isStoreAccessKey, setIsStoreAccessKey] = useState(false);

  const videoRef = useRef<any>(null);

  const {
    inference,
    contextInfo,
    isLoaded,
    isListening,
    error,
    init,
    process,
    release,
  } = useRhino();

  const rhnInit = async () => {
    try {
      await init(
        accessKey,
        {
          publicPath: '/models/YouTube_en_wasm_v2_1_0.rhn',
          forceWrite: true,
        },
        {
          publicPath: '/models/rhino_params.pv',
          forceWrite: true,
        }
      );
      await process();
    } catch (error) {
      console.log(error);
    }
  };

  const rhnRelease = async () => {
    await release();
  };

  const onPlayerReady: YouTubeProps['onReady'] = event => {
    videoRef.current = event.target;
  };

  const opts: YouTubeProps['opts'] = {
    playerVars: {
      autoplay: 1,
    },
  };

  const handleCommand = (command: string) => {
    console.log(command);
    if (videoRef.current === undefined) return;

    switch (command) {
      case Commands.PLAY:
        videoRef.current.playVideo();
        break;
      case Commands.PAUSE:
        videoRef.current.pauseVideo();
        break;
      case Commands.RESUME:
        videoRef.current.playVideo();
        break;
    }
  };

  useEffect(() => {
    const handleInference = async () => {
      if (inference?.isUnderstood) {
        handleCommand(inference.slots?.command!);
      }

      await process();
    };

    handleInference();
  }, [inference]);

  useEffect(() => {
    const localStorageAccessKey = localStorage.getItem('PvAccessKey');
    if (localStorageAccessKey) {
      setAccessKey(localStorageAccessKey);
      return;
    }

    if (isStoreAccessKey && accessKey && !localStorageAccessKey) {
      localStorage.setItem('PvAccessKey', accessKey);
    }
  }, [accessKey, isStoreAccessKey]);

  return (
    <div>
      <YouTube
        className={youtube}
        videoId="2g811Eo7K8U"
        opts={opts}
        onReady={onPlayerReady}
      />
      <div>
        <a href="https://console.picovoice.ai/">Picovoice Console</a> AccessKey:{' '}
        <input
          type="text"
          value={accessKey}
          onChange={e => setAccessKey(e.target.value)}
        />
        <label htmlFor="isStoreAccessKey">
          <input
            id="isStoreAccessKey"
            type="checkbox"
            checked={isStoreAccessKey}
            onChange={() => setIsStoreAccessKey(prev => !prev)}
          />
          Remember my AccessKey
        </label>
      </div>
      <button
        className="start-button"
        onClick={() => rhnInit()}
        disabled={isLoaded || accessKey.length === 0}
      >
        Start
      </button>
      <button
        onClick={() => rhnRelease()}
        disabled={error !== null || !isLoaded || isListening}
      >
        Stop
      </button>
      <div>
        <h1>Commands</h1>
        <ul>
          <li>Play</li>
          <li>Pause</li>
          <li>Resume</li>
        </ul>
      </div>
    </div>
  );
};

export default RhinoYouTube;
