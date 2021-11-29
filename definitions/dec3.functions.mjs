export function dec3CountSubs(box) { return box.num_ind_sub+1; }
export function dec3HasChanLoc(box, entry) { return entry.num_dep_sub > 0; }