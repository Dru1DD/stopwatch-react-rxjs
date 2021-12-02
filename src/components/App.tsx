import React, {
   useState, 
   useEffect,
   useCallback, 
   FunctionComponent, 
} from 'react';
import { 
  Subject,
  interval
} from 'rxjs'
import {
  takeUntil
} from 'rxjs/operators'
// import moment from 'moment'
import '../styles/App.css'

import {
  IS_STOPWATCH_START,
  IS_STOPWATCH_STOP,
  IS_STOPWATCH_WEIT
} from '../redux/action/actionTypes'

import { useDispatch } from 'react-redux'
import { Statistic } from './Statistic';

const clickTime: number = 300

type Status = "run" | "stop" | "wait"


const App: FunctionComponent = () => {
  const [time, setTime] = useState<number>(0);
  const [status, setStatus] = useState<Status>("stop");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  let clickTimeout: any = null
  const dispatch = useDispatch()


  useEffect(() => {
    const unsubscribe$ = new Subject()

    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if(status === "run") {
          setTime(prev => prev + 1000)
        }
      })
    return () => {
      unsubscribe$.next(status)
      unsubscribe$.complete()
    }
  }, [status])

  const startHandler = useCallback(() => {
    setStatus("run")
    dispatch({ type: IS_STOPWATCH_START })
  }, [dispatch])

  const stopHandler = useCallback(async () => {
    await dispatch({
      type: IS_STOPWATCH_STOP,
      payload: time
    })
    setStatus("stop")
    setTime(0)
  }, [dispatch, time])

  const pauseHandler = useCallback(() => {
    if(clickTimeout) {
      clearTimeout(clickTimeout)
      clickTimeout = null
      setStatus("wait")
      dispatch({ type: IS_STOPWATCH_WEIT})
    } else {
      clickTimeout = setTimeout(() => {
        clickTimeout = null
      }, clickTime)
    } 
  }, [dispatch])

  const resetHandler = useCallback(async () => {
    await dispatch({
      type: IS_STOPWATCH_STOP,
      payload: time
    })
    setTime(0)
    setStatus("run")
  }, [dispatch, time])

  return (
    <div className="ui container">
      <div className="ui segment">
        <h1 className="ui header">Stopwatch Test Task</h1>
      </div>
      <div className="ui segment">
        {/* <h2 className="ui header">{moment(new Date(time)).format('HH:mm:ss')}</h2> */}
        <h2 className="ui header">{new Date(time).toISOString().slice(11, 19)}</h2>
        <div className="ui group">
          { status === "stop" ? (
             <button
            className="ui button primary"
            onClick={startHandler}
          > Start </button>
          ) : status === "wait" ? 
          (
            <button
           className="ui button primary"
           onClick={startHandler}
         > Start </button>
         )
          :(
            <button 
            className="ui button red"
            onClick={stopHandler}
          > Stop </button>
          )}
          <button
            className="ui button secondary"
            onClick={pauseHandler}
          > Wait </button>
          <button
            className="ui button"
            onClick={resetHandler}
          > Reset </button>
          <button
            className="ui grey button"
            onClick={() => setModalOpen(!modalOpen)}  
          >Info</button>
        </div> 
        {
          modalOpen && <Statistic />
        }
      </div>
    </div>
  );
}

export default App;
