export function trunHasDopFlag(box) { return boxHasFlag(box, "flags", "data-offset-present"); }
export function trunHasFsfpFlag(box) { return boxHasFlag(box, "flags", "first-sample-flags-present"); }
export function trunHasSdpFlag(box) { return boxHasFlag(box, "flags", "sample-duration-present"); }
export function trunHasSspFlag(box) { return boxHasFlag(box, "flags", "sample-size-present"); }
export function trunHasSfpFlag(box) { return boxHasFlag(box, "flags", "sample-flags-present"); }
export function trunIsTimePresentUnsigned(box) { return boxIsVersion0(box) && boxHasFlag(box, "flags", "sample-composition-time-offsets-present"); }
export function trunIsTimePresentSigned(box) { return boxIsVersion1(box) && boxHasFlag(box, "flags", "sample-composition-time-offsets-present"); }
