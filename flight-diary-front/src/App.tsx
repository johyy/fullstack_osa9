import { useState, useEffect } from 'react';

import { DiaryEntry } from "./types";
import { getAllDiaryEntries, createDiaryEntry } from './diaryService';

const App = () => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [entries, setEntries] = useState<DiaryEntry[]>([
    { id: 1, date: '2024-11-06', weather: 'windy', visibility: 'poor', comment: 'Just testing'}
  ]);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setEntries(data)
    })
  }, [])

  const diaryEntryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    setError(null);

    const newDiaryEntry = {
      date,
      weather,
      visibility,
      comment
    };
  
    try {
      const data = await createDiaryEntry(newDiaryEntry)
      setEntries(entries.concat(data));
      setDate('');
      setWeather('');
      setVisibility('');
      setComment('');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={diaryEntryCreation}>
        <div>
          date
          <input
            type="date"
            name="visibility"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <label>
            <input
              type="radio"
              name="visibility"
              value="great"
              onChange={(event) => setVisibility(event.target.value)}
            />
            great
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="good"
              onChange={(event) => setVisibility(event.target.value)}
            />
            good
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="ok"
              onChange={(event) => setVisibility(event.target.value)}
            />
            ok
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="poor"
              onChange={(event) => setVisibility(event.target.value)}
            />
            poor
          </label>
        </div>
        <div>
          weather
          <label>
            <input
              type="radio"
              name="weather"
              value="sunny"
              onChange={(event) => setWeather(event.target.value)}
            />
            sunny
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="rainy"
              onChange={(event) => setWeather(event.target.value)}
            />
            rainy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="cloudy"
              onChange={(event) => setWeather(event.target.value)}
            />
            cloudy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="stormy"
              onChange={(event) => setWeather(event.target.value)}
            />
            stormy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="windy"
              onChange={(event) => setWeather(event.target.value)}
            />
            stormy
          </label>
        </div>

        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <ul>
        {entries.map(entry =>
          <li key={entry.id}>
            <div>
              <h3>{entry.date}</h3>
              <p>visibility: {entry.visibility}</p>
              <p>weather: {entry.weather}</p> 
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}
export default App