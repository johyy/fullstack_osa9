import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
    res.send('Hello Full Stack!');
  });

app.get('/bmi', (req: Request, res:Response) => {
    const { height, weight } = req.query;
     if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
       res.json({ error: 'malformatted parameters' });
    }

    const result = calculateBmi(Number(height), Number(weight));

    res.json({
        weight: weight,
        height: height,
        bmi: result
    });
});

app.post('/exercises', (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  }

  if (
    !Array.isArray(daily_exercises) || isNaN(Number(target)) ) {
      res.status(400).json({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const result = calculateExercises(Number(target), daily_exercises.map(Number));

  res.send({ result });
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});