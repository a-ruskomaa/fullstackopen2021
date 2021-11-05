interface ExerciseReport {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseRating {
    rating: number,
    ratingDescription: string
}

const getRating = (average: number, target: number): ExerciseRating => {
    const ratio = average / target;

    if (ratio < 0.5) {
        return {
            rating: 1,
            ratingDescription: 'bad'
        };
    } else if (ratio < 1) {
        return {
            rating: 2,
            ratingDescription: 'not too bad but could be better'
        };
    } else if (ratio < 2) {
        return {
            rating: 3,
            ratingDescription: 'ok'
        };
    } else if (ratio < 3) {
        return {
            rating: 4,
            ratingDescription: 'good'
        };
    } else {
        return {
            rating: 5,
            ratingDescription: 'wow'
        };
    }
};

const calculateExercises = (hours: Array<number>, targetAvg = 2): ExerciseReport => {
    const periodLength = hours.length;
    const trainingDays = hours.reduce((acc, val) => val > 0 ? acc + 1 : acc, 0);
    const target = targetAvg;
    const average = hours.reduce((acc, val) => acc + val, 0) / periodLength;
    const success = average >= targetAvg;
    const { rating, ratingDescription } = getRating(average, targetAvg);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

export default calculateExercises;