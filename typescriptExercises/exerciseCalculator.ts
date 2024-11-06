interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseCalculatingArguments = (args: string[]): { target: number; hours: number[]} => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);

    const hours = args.slice(3).map(hour => {
        if (isNaN(Number(hour))) {
            throw new Error('Provided values were not numbers!');
        }
        return Number(hour);
    });

    return {
        target: target,
        hours: hours 
    };
};

export const calculateExercises = (target: number, hours: number[]): Result => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(h => h > 0).length;
    const average = hours.reduce((sum, h) => sum + h, 0) / periodLength;
    const success = average >= target;
    let rating = 1;
    let ratingDescription = "";
    
    if (trainingDays === 0) {
        rating = 1;
    } else if (success) {
        rating = 3;
    } else {
        rating = 2;
    }
    switch(rating) {
        case 1:
            ratingDescription = "you should even try";
            break;
        case 2:
            ratingDescription = "not too bad but could be better";
            break;
        case 3:
            ratingDescription = "great job!";
            break;
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

try {
    const { target, hours } = parseCalculatingArguments(process.argv);
    const result = calculateExercises(target, hours);
    console.log(result);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}