export function stz2ValidateLength(box, v) { return (v === 4 || v === 8 || v === 16); }
export function stz2FieldSizeIs4(box) { return box.field_size === 4; }
export function stz2FieldSizeIs8(box) { return box.field_size === 8; }
export function stz2FieldSizeIs16(box) { return box.field_size === 16; }