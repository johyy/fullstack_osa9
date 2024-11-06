interface bmiValues {
    height: number;
    weight: number;
}

const parseArguments = (args: string[]): bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          height: Number(args[2]),
          weight: Number(args[3])
        };
      } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const BMI = weight / ((height/100) * (height/100));

    if (BMI <= 18.4) {
        return "Underweight";
    } else if (BMI >= 25) {
        return "Overweight";
    } else {
        return "Normal range";
    }
};

if (require.main === module) {
    try {
       const { height, weight } = parseArguments(process.argv);
       const result = calculateBmi(height, weight);
        console.log(result);
    } catch (error: unknown) {
       let errorMessage = 'Something bad happened.';
       if (error instanceof Error) {
           errorMessage += ' Error: ' + error.message;
       }
       console.log(errorMessage);
    }
}