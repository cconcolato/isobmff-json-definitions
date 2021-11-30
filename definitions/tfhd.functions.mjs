import {boxHasFlag} from './FullBox.functions.mjs';
export function tfhdHasBdopFlag(box) {
	return boxHasFlag(box, "base-data-offset-present");
}

export function tfhdHasSdipFlag(box) {
	return boxHasFlag(box, "sample-description-index-present");
} 

export function tfhdHasDsdpFlag(box) {
	return boxHasFlag(box, "default-sample-duration-present");
} 

export function tfhdHasDsspFlag(box) {
	return boxHasFlag(box, "default-sample-size-present");
} 

export function tfhdHasDsfpFlag(box) {
	return boxHasFlag(box, "default-sample-flags-present");
} 