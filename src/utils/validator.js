/**
 * 判断是不是数值
 * @param value
 * @returns {boolean}
 */
const isNumber = value => {
    const numberValue = parseFloat(value);
    return numberValue === value;
};

/**
 * 数值转换器(当给定的值不能转换成数值时，会返回空字符串而不是NaN)
 * @param value
 * @returns {*}
 */
const parseNumber = (value = '') => {
    if (isNumber(value)) {
        return value;
    }
    if (typeof value === 'string' && value.length && /^\d+$|^\d+\.\d+$/g.test(value)) {
        return parseFloat(value);
    } else {
        return '';
    }
};

export {
    isNumber,
    parseNumber
};
