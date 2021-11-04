function infeIsItemMime(box) { return boxIsVersion2Or3(box) && box.item_type === "mime"; }
function infeIsItemUri(box) { return BoxParser.v2orv3Check(box) && box.item_type === "uri "; }