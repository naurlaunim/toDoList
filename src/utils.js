export const updateArrayElement = (arr, filterFn, data) =>
    arr.map(el => filterFn(el)
        ? Object.assign({}, el, data)
        : el
    );

export const deepSort = (name, compFn) => (a, b) => (
    compFn(a[name], b[name])
);

export const names = (...args) => args.filter(v => !!v).join(" ");