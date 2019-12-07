export function flatten (arrays: any[]) {
    return [].concat.apply([], arrays);
}