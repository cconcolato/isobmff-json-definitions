function sgpdHasDescriptionLength(box) { return boxIsVersion1(box) && box.default_length === 0; }
function sgpdHasNotDescriptionLength(box) { return !boxIsVersion1(box) || box.default_length !== 0; }