import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

type Command = 'calculateBmi' | 'calculateExercises'

interface CalculatorArgs {
    command: string,
    commandArgs: Array<number>
}

const parseArguments = (args: Array<string>): CalculatorArgs => {
    if (args.length < 3) {
        throw new Error('Not enough arguments');
    };

    const [, , command, ...commandArgs] = args;

    return {
        command,
        commandArgs: commandArgs.map(arg => Number(arg))
    }
}

try {
    const { command, commandArgs } = parseArguments(process.argv);

    let res = null;

    switch (command as Command) {
        case 'calculateBmi':
            if (commandArgs.length !== 2) {
                throw new Error('Invalid arguments');
            };
            res = calculateBmi(commandArgs[0], commandArgs[1]);
            break;
        case 'calculateExercises':
            if (commandArgs.length > 0) {
                throw new Error('Invalid arguments');
            };
            res = calculateExercises(commandArgs);
            break;
        default:
            throw new Error('unknown command')
    }

    console.log(res)
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.error(errorMessage);
}