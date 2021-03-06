export function boxIsVersion0(box) { return box.version === 0; };
export function boxIsVersion1(box) { return box.version === 1; };
export function boxIsVersion2(box) { return box.version === 2; };
export function boxIsVersion3(box) { return box.version === 3; };
export function boxIsVersionLessThan2(box) { return box.version < 2; };
export function boxIsVersion2OrAbove(box) { return box.version >= 2; };
export function boxIsVersion1Or2(box) { return boxIsVersion1(box) || boxIsVersion2(box) };
export function boxIsVersion2Or3(box) { return boxIsVersion2(box) || boxIsVersion3(box) };
export function boxHasNotFlags1(box) { return !(box.flags & 1); };
export function boxHasFlag(box, name) { 
	return !(box.flags & box._flagValuesByName[name]); 
};