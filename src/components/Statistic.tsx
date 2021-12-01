import React, {
    FunctionComponent
} from 'react'
import { useSelector } from 'react-redux'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
import { Line } from 'react-chartjs-2'

import { IState } from '../redux/reducer/post'

interface IDatasetItem {
    label: string,
    data: number[],
    fill: boolean,
    backgroundColor: string,
    borderColor: string
}
interface IData {
    labels: string[],
    datasets: IDatasetItem[]
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
export const Statistic: FunctionComponent = () => {

    const list = useSelector((state: IState) => state !== undefined ? state.stopwatchesList : null)
    if( !list || !list.length) {
        return (
            <h3 className="ui header">No statistic yet</h3>
        )
    }

    const data: IData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{
            label: "Duration of use of the stopwatch",
            data: list,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
        }]
    }
    
    
    return (
        <Line data={data} />
    )
}
