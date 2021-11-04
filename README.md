This repo contains JSON representations of ISOBMFF boxes and other ISOBMFF structure.
The idea is to have a (mostly) declarative representation of all structures, 
such that it can be used by various tools, from parsers, to writers, to validators,
to conformance suite systems.

Each box or structure is described in a JSON file whose name is the structure, e.g. ctts.json. 
In some cases, multiple structures are grouped into a generic JSON file, e.g. basic-boxes.json.

The JSON object representing a box (or structure) is as follows:
```
{
	"type": "ctts",
	"parentType": "FullBox",
	"fields": [ ... ]
	"flags": [ ... ]
}
``` 
where:
* `type`: String, indicating the name/type of the structure being defined. 
It usually is a four-character code for structures like boxes (e.g. "ctts"),
sample groups ("roll")... But it can be a longer string for internal types "sidxEntry".
It must not be null, undefined or empty. It must be used unique in this repo.

* `parentType`: String, indicating if the type inherits fields from a parent
type. It must not be null, undefined or empty. For example, a FullBox inherits
from a Box.

* `fields`: Array of JSON objects declaring the fields present in the
structure, in order they are to be parsed. The array must not be null, or
undefined. It may be empty. (see below)

* `flags`: Array of JSON objects defining special keyword/value pairs for
this structure. It may be null or empty. (see below)

* `name`: String, representing a long form, human-readable name of this
Structure as opposed to the `type` field. It may be null or empty. This may be
used for 'UUID' boxes.

Each Field is a JSON object like:
```
{
    "name": "entry_count",
    "type": "Uint32"
},
{
    "name": "entries",
    "type": "Array",
    "count": "entry_count",
    "fields": [ ... ]
},
or
{
    "name": "chunk_offsets",
    "type": "Array",
    "arrayEntryType": "Uint64",
    "count": "entry_count"
}
```
with the following properties:
- `name`: String uniquely identifying the field in this structure, e.g. "major_brand". If the field `type` is not `Array`, a field must have a `name` property. If the field `type` is `Array`, a field may have a `name` property. Multiple fields may have the same `name` only if their `condition` fields are different. The name `size` has a special meaning indicating that the value of this fields represents the size of the containing structure.
- `type`: String among a set of predefined types. A field must have a `type` property. The predefined types are:
  - `Array`
  - `bitX` where X is any positive integer, e.g. bit3, bit12, ...
  - `Uint8`
  - `Uint16`
  - `Uint32`
  - `Uint64`
  - `Int8`
  - `Int16`
  - `Int32`
  - `Int64`
  - `String`: UTF-8 string. A `size` must be provided.
  - `String4`: same as `String`, but a size of 4 characters is assumed.
  - `CString`: same as `String` but the size is determined when the first NULL char is found.
  - `Hex16`: Same as `Uint16` but meant to be displayed as hexadecimal instead of decimal
  - `Flags24`: Same as `bit24` but meant to bedisplayed as binary and using `flags` definitions.
  - `Flags32`: Same as `bit32` but meant to be displayed as binary and using `flags` definitions.
  - `language`: Same as a `String` of 3 characters (per ISOBMFF legacy language definition)

- `size`: Number | String. Indicates the size in bytes of the field.
- `bitSize`: Number | String, used to determine the size in bits of the field. Used in complement of `Uint`, `Int`, `bit` ... 
- `count`: Number | String, used when the field is of type `Array` to indicate the number of entries in the array.
- `arrayEntryType`: String, representing the type of an array entry.
- `arrayEntryBaseType`: String, representing the base type of an array entry.

- `isTypeKey`: String used to indicate that this field contains a value used to identify a type of sub-structures. 
- `namespace`: String identifying where the field definition comes from. If not set, it is assumed to be the same as the namespace of the containing Structure.

- `condition`: Number | String. It is evaluated during field processing and if it returns true, the field is processed.
- `validation`: Number | String. Used to determine if the parsed value is correct.

When the field is an `Array`, the number of entries can be either:
- given in the `count` field.
- given in the `size` field.
- determined based on the remaining data in the structure.
It must not have both `count` and `size`.

The `flag` fields is an optional array of flags JSON objects, with:
- `name`: String, human-readable name for the flag
- `value`: Number, flag value

Some of the field properties allow using either a Number or a String. 
When a String is used, it either refers to another field name or to a function
to be evaluated. The definitions of the functions used in the declaration of
a structure are provided in an accompanying file with the same name, suffixed 
with "functions" and whose extension depends on the programming language used to
implement it. At the moment only JavaScript implementations are provided. 
For example, the `colr` box has a `colr.json` file providing the JSON declaration
and a `colr.functions.js` file providing the JavaScript implementation of the
functions used in the declaration (e.g. `colrIsNclx`).

```
function colrIsNclx(box) { return box.colour_type === 'nclx' }
```
The first parameter of the function is the current structure being processed (box, array, ...). Each structure is expected to have:
- a `parent` field for the parent structure,
- a `root` field for the top level structure
The second parameter is:
- for arrays, the index of the entry
- for non arrays, the parsed value (if parsed)

