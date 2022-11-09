import axios from 'axios'
import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'

import * as Action from '../redux/question_reducer'

export const useFetchQuestion = () => {
    const dispatch = useDispatch()
    const [getData, setGetData] = useState({ apiData: [], serverError: null})

    useEffect(() => {
        setGetData(prev => ({...prev}))

        (async() => {
            try {
                let question = await axios.get('/api/admin/getQuestion')
    
                if(question.length > 0){
                    // setGetData(prev => ({...prev, isLoading: true}))
                    setGetData(prev => ({...prev, apiData: question}))
    
                    dispatch(Action.startExamAction(question))
                }else {
                    throw new Error('No Question Available')
                }
            } catch (error) {
            // setGetData(prev => ({...prev, isLoading: true}))
            setGetData(prev => ({...prev, serverError: error}))
                
            }
        })()
          
    }, [dispatch])

   
   return  [getData, setGetData]

}