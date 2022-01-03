import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';

/* Child Components */
import { 
  IoIosPause,
  IoIosPlay,
} from 'react-icons/io';
import { 
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
} from 'react-icons/io5';

/* Selectors */
import {
  getIsPlayerReady,
  getIsPaused,
  getPlaybackState,
  getCurrentTrack,
  getPlaybackPosition,
  setPlaybackPosition,
} from '../data/reducers/spotifyPlayerSDKSlice';

/* Actions */
import { setIsPaused } from '../data/reducers/spotifyPlayerSDKSlice';


/* Types */
import type { AppState } from '../data/store';

type PropsType = {
  spotifyPlayer?: Spotify.Player,
};

const PlayerControlBar = ({
  spotifyPlayer,
}: PropsType) => {
  const dispatch = useDispatch();

  const {
    isPlayerReady,
    playbackState,
    isPaused,
    currentTrack,
    playbackPosition,
  } = useSelector((state: AppState) => ({
    isPlayerReady: getIsPlayerReady(state),
    playbackState: getPlaybackState(state),
    isPaused: getIsPaused(state),
    currentTrack: getCurrentTrack(state),
    playbackPosition: getPlaybackPosition(state),
  }));

  useInterval(() => {
    dispatch(setPlaybackPosition((playbackPosition ?? 0) + 1000));
  }, isPaused ? null : 1000);

  const onClickSeekBar = (e: any) => {
    const target = e.target as Element;
    let bounds = target.getBoundingClientRect();
    let x = e.clientX - bounds.left;
    let y = e.clientY - bounds.top;
    const seekLocation = (x / 600) * (playbackState?.duration || 0);
    spotifyPlayer?.seek(seekLocation);
  };

  const playbackPercentage = `${playbackState ? (
    (playbackPosition || 0) / (playbackState?.duration || 1) * 100
  ) : 0}%`;

  return isPlayerReady ? (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div
        style={{
          height: 5,
          backgroundColor: 'white',
        }}
        onClick={onClickSeekBar}
      >
        <div
          style={{
            height: 5,
            width: playbackPercentage,
            backgroundColor: '#1DB954',
          }}
        />
      </div>
      <div
        style={{
          height: 100,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <div
          style={{
            height: '100%',
            flex: 1,
            minWidth: 'auto',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            overflow: 'hidden',
          }}
        >
          {/* Thumbnail */}
          <img
            src={currentTrack?.album.images[0].url}
            style={{
              height: 50,
              margin: 10,
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {currentTrack?.name}
            </div>
            <div
              style={{
                width: '100%',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                fontSize: 12,
                color: 'grey',
              }}
            >
              {currentTrack?.artists.map(item => item.name).join(', ')}
            </div>
          </div>
        </div>
        <div
          style={{
            width: 130,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <IoPlaySkipBackSharp
              color='grey'
              size={15}
              onClick={() => {
                spotifyPlayer?.previousTrack();
              }}
            />
            {isPaused ? 
            (
              <IoIosPlay
                color='white'
                size={40}
                style={{
                  margin: '0 10'
                }}
                onClick={() => {
                  dispatch(setIsPaused(false));
                  spotifyPlayer?.resume();
                }}
              />
            ) : (
              <IoIosPause
                color='white'
                size={40}
                style={{
                  margin: '0 10'
                }}
                onClick={() => {
                  dispatch(setIsPaused(true));
                  spotifyPlayer?.pause();
                }}
              />
            )}
            <IoPlaySkipForwardSharp
              color='grey'
              size={15}
              onClick={() => {
                spotifyPlayer?.nextTrack();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default PlayerControlBar;