{
    "type": "seig",
    "parentType": "SampleGroup",
    "fields":
    [
        {
            "name": "reserved",
            "type": "Uint8"
        },
        {
            "name": "crypt_byte_block",
            "type": "bit4"
        },
        {
            "name": "skip_byte_block",
            "type": "bit4"
        },
        {
            "name": "isProtected",
            "type": "Uint8"
        },
        {
            "name": "Per_Sample_IV_Size",
            "type": "Uint8"
        },
        {
            "name": "KID",
            "type": "Hex16"
        },
        {
            "name": "constant_IV_size",
            "type": "Uint8",
            "condition": "seigConstantIVSizeCondition"
        },
        {
            "name": "constant_IV",
            "type": "Array",
            "arrayEntryType": "Uint8",
            "count": "constant_IV_size",
            "condition": "seigConstantIVSizeCondition"
        }
    ]
}