import React, { useState } from 'react';
import { TypesNameDateTotals, TypesWorkoutMetrics } from './interfaces';
import { nanoid } from 'nanoid'

export default function WorkoutResults() {
  const [nameDateTotals, setNameDateTotals] = useState<TypesNameDateTotals>({
    workoutName: "",
    workoutDate: "",
    totalType: "TotalTime",
    totalValue: '34:00',
  });
  const [workoutMetrics, setWorkoutMetrics] = useState<TypesWorkoutMetrics[]>([
    { id: nanoid(), time: '30:00.0', distance: 6653, split: '2:15.2', strokeRate: 20, heartRate:null },
    { id: nanoid(), time: '15:00.0', distance: 3341, split: '2:24.6', strokeRate: 21, heartRate:null },
    { id: nanoid(), time: '15:00.0', distance: 3311, split: '2:15.9', strokeRate: 19, heartRate:null },
  ]);

  const handleNDTChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const {name, value} = e.target 
    setNameDateTotals(oldData => {
        return{
            ...oldData,
            [name]: value
        }
    })
  }

  const handleMetricsChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, field:string) => {
    const newData = workoutMetrics.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          [field]: e.target.type === 'number'? parseInt(e.target.value) : e.target.value,
        };
      }
      return row;
    });
    setWorkoutMetrics(newData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Data:', workoutMetrics);
  };

  return (
    <form onSubmit={handleSubmit}>
        <fieldset>
            <legend>Workout Results - edit as needed</legend>
            <label>
                Workout Name
                <input 
                    type="text"
                    name = 'workoutName'
                    value={nameDateTotals.workoutName}
                    onChange = {handleNDTChange}
                    />
            </label>
            <br />
            <label>
                Date
                <input 
                    type="text"
                    name = 'workoutDate'
                    value={nameDateTotals.workoutDate}
                    onChange = {handleNDTChange}
                    />
            </label>
            <br />
            {nameDateTotals.totalValue?
                <label>
                    {nameDateTotals.totalType}
                    <input 
                        type="text"
                        name = 'totalValue'
                        value={nameDateTotals.totalValue}
                        onChange = {handleNDTChange}
                        />
                </label> : null
            }
            <table>
                <thead>
                <tr>
                    <th>time</th>
                    <th>meter</th>
                    <th>/500m</th>
                    <th>s/m</th>
                </tr>
                </thead>
                <tbody>
                {workoutMetrics.map((row) => (
                    <tr key={row.id}>
                    <td>
                    <input
                        type="text"
                        value={row.time}
                        onChange={(e) => handleMetricsChange(e, row.id, 'time')}
                        />
                    </td>
                    <td>
                        <input
                        type="number"
                        value={row.distance}
                        onChange={(e) => handleMetricsChange(e, row.id, 'distance')}
                        />
                    </td>
                    <td>
                        <input
                        type="text"
                        value={row.split}
                        onChange={(e) => handleMetricsChange(e, row.id, 'split')}
                        />
                    </td>
                    <td>
                        <input
                        type="number"
                        value={row.strokeRate}
                        onChange={(e) => handleMetricsChange(e, row.id, 'strokeRate')}
                        />
                    </td>
                    {row.heartRate? 
                        <td>
                            <input
                            type="number"
                            value={row.heartRate}
                            onChange={(e) => handleMetricsChange(e, row.id, 'heartRate')}
                            />
                        </td> : 
                        null
                    }
                    </tr>
                ))}
                </tbody>
            </table>
        </fieldset>
        <button type="submit">Save changes</button>
    </form>
  );
}

