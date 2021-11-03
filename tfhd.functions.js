function tfhdHasBdopFlag(box) {
	return boxHasFlag(box, "base-data-offset-present");
}

function tfhdHasSdipFlag(box) {
	return boxHasFlag(box, "sample-description-index-present");
} 

function tfhdHasDsdpFlag(box) {
	return boxHasFlag(box, "default-sample-duration-present");
} 

function tfhdHasDsspFlag(box) {
	return boxHasFlag(box, "default-sample-size-present");
} 

function tfhdHasDsfpFlag(box) {
	return boxHasFlag(box, "flags", "default-sample-flags-present");
} 