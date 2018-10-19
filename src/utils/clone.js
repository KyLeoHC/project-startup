import {
    isArray,
    isPlainObject
} from './validator';

const copyObj = (data) => {
    // @todo: 实现深浅克隆
    if (!isPlainObject(data)) return;
    const copy = {};
    const list = [{
        key: null,
        data
    }];
    do {
        const item = list.pop();
        Object.keys(item.data).forEach(key => {
            const value = item.data[key];
            if(isPlainObject(value)) {
                list.push({
                    key,
                    data: item.data[key]
                });
            } else if(isArray(value)) {
                list.push({
                    key,
                    data: item.data[key]
                });
            } else {
                copy[key] = null;
            }
        });
    } while (list.length);
    return copy;
};

export {
    copyObj
};
