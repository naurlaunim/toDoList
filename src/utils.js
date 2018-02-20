
export const sortByPropertyName = (name, compFn) => (a, b) => (
    compFn(a[name], b[name])
);

export const names = (...args) => args.filter(v => !!v).join(" ");