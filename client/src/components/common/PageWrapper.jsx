import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {setAppState} from "../../redux/features/appStateSlice"



function PageWrapper({state,children}) {
    const dispatch = useDispatch()
  
      useEffect(() => {
        window.scrollTo(0,0)
      dispatch(setAppState(state))
    }, [dispatch, state])
    

  return (
    children
  )
}

export default PageWrapper