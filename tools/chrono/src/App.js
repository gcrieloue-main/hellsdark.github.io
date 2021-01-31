import './App.css'
import { useEffect, useRef, useState } from 'react'
import * as _ from 'lodash'

function App() {
  const [date, setDate] = useState(undefined)
  const [ellapsed, setEllapsed] = useState(NaN)
  const [handler, setHandler] = useState(NaN)
  const [enabledButtons, setEnabledButtons] = useState(true)
  const [lastMouseMove, setLastMouseMove] = useState(undefined)
  const stateRef = useRef()

  const HIDE_BUTTONS_IF_MOUSE_INACTIVE_FOR = 2000
  const THROTTLE_MOUSE_EVENTS_TIME = 500

  /* use stateRef to store the lastMouseMove 
                    and retrieve the up to date state value 
                    in the callback for hiding the buttons */
  stateRef.current = lastMouseMove

  const twoDigits = (i) => ('0' + i).slice(-2)

  useEffect(() => {
    window.addEventListener(
      'mousemove',
      _.throttle((ev) => {
        setLastMouseMove(Date.now())
      }, THROTTLE_MOUSE_EVENTS_TIME)
    )
    // setDate(new Date())
  }, [])

  useEffect(() => {
    setEnabledButtons(true)
    setTimeout(() => {
      let timeSpentSinceLastMouseMove = Date.now() - stateRef.current
      if (timeSpentSinceLastMouseMove > HIDE_BUTTONS_IF_MOUSE_INACTIVE_FOR) {
        setEnabledButtons(false)
      }
    }, HIDE_BUTTONS_IF_MOUSE_INACTIVE_FOR)
  }, [lastMouseMove])

  useEffect(() => {
    updateDate()
  }, [date])

  function updateDate() {
    if (handler) clearTimeout(handler)
    setHandler(
      setInterval(() => {
        setEllapsed(Date.now() - date)
      }, 100)
    )
  }

  const seconds = () => {
    return twoDigits(Math.floor(ellapsed / 1000) % 60 || 0)
  }

  const minutes = () => {
    return twoDigits(Math.floor(ellapsed / 1000 / 60) % 60 || 0)
  }

  const hours = () => {
    return twoDigits(Math.floor(ellapsed / 1000 / 60 / 60))
  }

  function togglePlay() {
    if (date) {
      setDate(undefined)
    } else {
      setDate(new Date())
    }
  }

  function reset() {
    setDate(new Date())
  }

  return (
    <div className={'container' + (enabledButtons ? '' : ' hide-cursor')}>
      <div className={'chrono'}>
        {!isNaN(ellapsed) && `${hours()}:${minutes()}:${seconds()}`}
        {!ellapsed && `00:00:00`}
      </div>
      {enabledButtons && (
        <div className={'buttons'}>
          <button onClick={togglePlay}>
            {date ? (
              <i className="fas fa-stop"></i>
            ) : (
              <i className="fas fa-play"></i>
            )}
          </button>
          <button onClick={reset}>
            <i className="fas fa-redo"></i>
          </button>
        </div>
      )}
    </div>
  )
}

export default App
