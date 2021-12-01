import {
    IS_STOPWATCH_START,
    IS_STOPWATCH_STOP,
    IS_STOPWATCH_WEIT
} from '../action/actionTypes'

interface ISSTOPWACHSTART {
    type: typeof IS_STOPWATCH_START,
}


interface ISSTOPWATCHSTOP {
    type: typeof IS_STOPWATCH_STOP,
    payload: number
}

interface ISSTOPWATCHWEIT {
    type: typeof IS_STOPWATCH_WEIT
}

 export interface IState {
    isStopwatchStart: boolean
    isStopwatchStop: boolean
    isStopwatchWeit: boolean
    stopwatchesList: number[]
}


export const initialState: IState = {
    isStopwatchStart: false,
    isStopwatchStop: true,
    isStopwatchWeit: false,
    stopwatchesList: []
}

type ActionType = ISSTOPWACHSTART | ISSTOPWATCHSTOP | ISSTOPWATCHWEIT

export const postReducer = (state: IState = initialState, action: ActionType) => {
    switch(action.type) {
        case IS_STOPWATCH_START: 
            return {
                ...state,
                isStopwatchStart: true,
                isStopwatchStop: false,
                isStopwatchWeit: false
            }
        case IS_STOPWATCH_STOP:
            return {
                ...state,
                isStopwatchStart: false,
                isStopwatchStop: true,
                isStopwatchWeit: false,
                stopwatchesList: [...state.stopwatchesList, action.payload]
            }
        case IS_STOPWATCH_WEIT:
            return {
                ...state,
                isStopwatchStart: false,
                isStopwatchStop: false,
                isStopwatchWeit: true
            }
    }
}