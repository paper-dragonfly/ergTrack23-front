import React, { useState } from 'react';

export default function EditableTable() {
  const [data, setData] = useState([
    { id: 1, time: 1, distance: 'John', split: 'john@example.com', strokeRate: '555-1234' },
    { id: 2, time: 2, distance: 'Jane', split: 'jane@example.com', strokeRate: '555-5678' },
    { id: 3, time: 3, distance: 'Bob', split: 'bob@example.com', strokeRate: '555-9012' },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number, field:string) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [field]: e.target.value,
        };
      }
      return item;
    });
    setData(newData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Data:', data);
  };

  return (
    <form onSubmit={handleSubmit}>
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
          {data.map((row) => (
            <tr key={row.id}>
              <td>
              <input
                  type="text"
                  value={row.time}
                  onChange={(e) => handleInputChange(e, row.id, 'time')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.distance}
                  onChange={(e) => handleInputChange(e, row.id, 'distance')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.split}
                  onChange={(e) => handleInputChange(e, row.id, 'split')}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.strokeRate}
                  onChange={(e) => handleInputChange(e, row.id, 'strokeRate')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Save changes</button>
    </form>
  );
}

