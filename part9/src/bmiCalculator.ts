const calculateBmi = (height: number, weight: number): string => {
    if (height === 0) {
        throw new Error('Height can not be zero')
    }
    const heightInMeters = height / 100;
    const bmi = weight / heightInMeters;

    if (bmi < 18.5) {
        return 'Underweight (unhealthy weight)';
    } else if (bmi < 25) {
        return 'Normal (healthy weight';
    } else {
        return 'Overweight (unhealthy weight)';
    }
}

console.log(calculateBmi(180, 74))