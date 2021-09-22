import {useState, useMemo, useEffect} from 'react'

function useElementOnScreen(options, targetRef) {
  const [isVisible, setIsVisible] = useState(false)

  //NOTE: 옵저버에서 반환 하는 Callback은 IntersectionObserverEntry 객체의 배열을 반환한다.
  const callbackFunction = entries => {
    // const [entry] = entries
    const entry = entries[0]
    console.log('entrie', entry)

    //NOTE: isIntersecting  타겟 요소가 교차되었으면 ture 아니면 false를 반환
    const value = entries[0].isIntersecting

    console.log('value', value)
    setIsVisible(value)
  }

  const optionsMemo = useMemo(() => {
    return options
  }, [options])

  useEffect(() => {
    // NOTE: 타겟 요소가 교차되었을때 실행할 함수 , 옵션 (default: null)
    const observer = new IntersectionObserver(callbackFunction, optionsMemo)
    // NOTE: 돔을 직접건드리지 않고 useRef 활용 현재타겟지정
    const currentTarget = targetRef.current

    currentTarget && observer.observe(currentTarget)

    // NOTE: unMount
    return () => {
      currentTarget && observer.unobserve(currentTarget)
    }
  }, [targetRef, optionsMemo])

  return isVisible
}

export default useElementOnScreen
