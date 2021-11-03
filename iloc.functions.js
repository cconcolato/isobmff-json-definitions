function ilocValueIs0Or4Or8(box, v) { return (v === 0 || v === 4 || v === 8} }
function ilocIndexSizeIs0Or4Or8(box) { return (box.index_size === 0 || box.index_size === 4 || box.index_size === 8} }
function ilocIsBaseOffsetSize0(box) { return box.base_offset_size === 0; }
function ilocIsBaseOffsetSize4(box) { return box.base_offset_size === 4; }
function ilocIsBaseOffsetSize8(box) { return box.base_offset_size === 8; }
function ilocIsIndex32Bits(box) { return boxIsVersion1Or2(box) && box.index_size === 4; }
function ilocIsIndex64Bits(box) { return boxIsVersion1Or2(box) && box.index_size === 8; }
function ilocIsOffsetSize4(box) { return box.offset_size === 4; }
function ilocIsOffsetSize8(box) { return box.offset_size === 8; }
function ilocIsLengthSize4(box) { return box.length_size === 4; }
function ilocIsLengthSize8(box) { return box.length_size === 8; }