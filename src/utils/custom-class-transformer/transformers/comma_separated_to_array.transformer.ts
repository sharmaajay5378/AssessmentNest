import { Transform } from 'class-transformer';

// This transform function return a array of all comma separated value
function CommaSeparatedToArray(config?: { isNumber?: boolean }) {
    const { isNumber } = {
        isNumber: false,
        ...config,
    };

    return Transform(({ value }) => {
        if (typeof value === 'string') {
            return value
                .split(',')
                .map((part) => (isNumber ? Number(part.trim()) : part.trim()))
                .filter((part) => (isNumber ? !isNaN(part as number) : true));
        }
        return value;
    });
}

export default CommaSeparatedToArray;

// Examples
// @CommaSeparatedToArray({ isNumber: true })
// @CommaSeparatedToArray()
