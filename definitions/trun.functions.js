function trunHasDopFlag(box) { return boxHasFlag(box, "flags", "data-offset-present"); }
function trunHasFsfpFlag(box) { return boxHasFlag(box, "flags", "first-sample-flags-present"); }
function trunHasSdpFlag(box) { return boxHasFlag(box, "flags", "sample-duration-present"); }
function trunHasSspFlag(box) { return boxHasFlag(box, "flags", "sample-size-present"); }
function trunHasSfpFlag(box) { return boxHasFlag(box, "flags", "sample-flags-present"); }
function trunIsTimePresentUnsigned(box) { return boxIsVersion0(box) && boxHasFlag(box, "flags", "sample-composition-time-offsets-present"); }
function trunIsTimePresentSigned(box) { return boxIsVersion1(box) && boxHasFlag(box, "flags", "sample-composition-time-offsets-present"); }
