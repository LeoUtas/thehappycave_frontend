export default function combineArrays(array1, array2) {
    const result = [];
    for (let i = 0; i < array1.length && i < array2.length; i++) {
        result.push(array1[i], array2[i]);
    }
    return result;
}
