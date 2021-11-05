import express, { Response } from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

class ArgumentError extends Error { }

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    try {
        if (typeof height !== 'string' || typeof weight !== 'string') {
            throw new ArgumentError('malformatted parameters');
        }
        const heightNum = Number(height);
        const weightNum = Number(weight);

        if (isNaN(heightNum) || isNaN(weightNum)) {
            throw new ArgumentError('malformatted parameters');
        }

        const bmi = calculateBmi(heightNum, weightNum);
        res.send({
            weight,
            height,
            bmi
        });
    } catch (e) {
        createErrorResponse(e as Error, res);
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises: dailyExercises, target } = req.body;

    try {
        if (dailyExercises === undefined || target === undefined) {
            throw new ArgumentError('parameters missing');
        }

        if (typeof target !== 'number' ||
            typeof dailyExercises !== 'object' ||
            !Array.isArray(dailyExercises) ||
            (dailyExercises as Array<unknown>).some(el => typeof el !== 'number')) {
            throw new ArgumentError('malformatted parameters');
        }

        const exerciseReport = calculateExercises(dailyExercises as Array<number>, target);

        res.send(exerciseReport);
    } catch (e) {
        createErrorResponse(e as Error, res);
    }
});

const PORT = 3003;

const createErrorResponse = (e: Error, res: Response): Response => {
    if (e instanceof ArgumentError) {
        res.status(400);
    } else {
        res.status(500);
    }
    return res.json({ error: e.message });
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});