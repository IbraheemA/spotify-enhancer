import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* Child Components */
import { 
  IoPlayCircleSharp,
  IoPauseCircleSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
} from 'react-icons/io5';

/* Selectors */
import { getIsPlayerReady, getIsPaused, getPlaybackState, getCurrentTrack } from '../data/reducers/spotifyPlayerSDKSlice';

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
  } = useSelector((state: AppState) => ({
    isPlayerReady: getIsPlayerReady(state),
    playbackState: getPlaybackState(state),
    isPaused: getIsPaused(state),
    currentTrack: getCurrentTrack(state),
  }));

  useEffect(() => {

  }, [])

  return isPlayerReady ? (
    <div
      style={{
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black',
        borderTop: '1px solid grey',
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
          // backgroundColor: 'red',
        }}
      >
        <img
          src={currentTrack?.album.images[0].url}
          style={{
            height: 50,
            margin: 10,
            // width: 'auto',
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
          width: 100,
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
            style={{
              
            }}
            onClick={() => {
              spotifyPlayer?.previousTrack();
            }}
          />
          {isPaused ? 
          (
            <IoPlayCircleSharp
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
            <IoPauseCircleSharp
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
            style={{
              
            }}
            onClick={() => {
              spotifyPlayer?.nextTrack();
            }}
          />
        </div>
      </div>
      {/* <div
        style={{
          flex: 1,
          display: 'flex',
          minWidth: 'auto',
        }}
      >
      </div> */}
    </div>
  ) : null;
}

export default PlayerControlBar;