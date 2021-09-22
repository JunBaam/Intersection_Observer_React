import {useRef} from 'react'
import './App.css'
import useElementOnScreen from './hooks/useElementOnScreen'

function App() {
  const targetRef = useRef(null)

  // NOTE: intersection observer 옵션으로 사용
  const isVisible = useElementOnScreen(
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    },
    targetRef
  )

  return (
    <>
      <h1 className="header">
        <p>{!isVisible ? '뷰에안잡힘' : '뷰에잡힘'}</p>
      </h1>
      <div className="gap">ss</div>
      <img src="logo512.png" alt="icon" ref={targetRef} />
    </>
  )
}

export default App
