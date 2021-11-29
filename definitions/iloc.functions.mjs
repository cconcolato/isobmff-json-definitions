export function ilocValueIs0Or4Or8(box, v) { return (v === 0 || v === 4 || v === 8); }
export function ilocIndexSizeIs0Or4Or8(box) { return (box.index_size === 0 || box.index_size === 4 || box.index_size === 8); }
export function ilocIsBaseOffsetSize0(box) { return box.base_offset_size === 0; }
export function ilocIsBaseOffsetSize4(box) { return box.base_offset_size === 4; }
export function ilocIsBaseOffsetSize8(box) { return box.base_offset_size === 8; }
export function ilocIsIndex32Bits(box) { return boxIsVersion1Or2(box) && box.index_size === 4; }
export function ilocIsIndex64Bits(box) { return boxIsVersion1Or2(box) && box.index_size === 8; }
export function ilocIsOffsetSize4(box) { return box.offset_size === 4; }
export function ilocIsOffsetSize8(box) { return box.offset_size === 8; }
export function ilocIsLengthSize4(box) { return box.length_size === 4; }
export function ilocIsLengthSize8(box) { return box.length_size === 8; }