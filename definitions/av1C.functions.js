function av1CInitialPresentationDelayPresent(box) {
	return box.initial_presentation_delay_present === 1;
}

function av1CInitialPresentationDelayNotPresent(box) {
	return box.initial_presentation_delay_present !== 1;
}