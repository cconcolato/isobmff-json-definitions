export function sgpdHasDescriptionLength(box) { return boxIsVersion1(box) && box.default_length === 0; }
export function sgpdHasNotDescriptionLength(box) { return !boxIsVersion1(box) || box.default_length !== 0; }