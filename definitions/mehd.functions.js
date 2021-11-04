function mehdIs32bit(box) { return boxIsVersion0(box) && !(box.flags & 0x1} }
function mehdIs64bit(box) { return boxIsVersion1(box) || (box.flags & 0x1} }