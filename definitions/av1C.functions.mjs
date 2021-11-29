export function av1CInitialPresentationDelayPresent(box) {
	return box.initial_presentation_delay_present === 1;
}

export function av1CInitialPresentationDelayNotPresent(box) {
	return box.initial_presentation_delay_present !== 1;
}