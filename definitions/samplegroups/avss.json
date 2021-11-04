{
    "type": "avss",
    "parentType": "SampleGroup",
    "fields":
    [
        {
            "name": "subSequenceIdentifier",
            "type": "Uint16"
        },
        {
            "name": "layerNumber",
            "type": "Uint8"
        },
        {
            "name": "reserved",
            "type": "bit6"
        },
        {
            "name": "durationFlag",
            "type": "bit1"
        },
        {
            "name": "avgRateFlag",
            "type": "bit1"
        },
        {
            "name": "duration",
            "type": "Uint32",
            "condition": "durationFlag"
        },
        {
            "name": "accurateStatisticsFlag",
            "type": "Uint8",
            "condition": "avgRateFlag"
        },
        {
            "name": "avgBitRate",
            "type": "Uint16",
            "condition": "avgRateFlag"
        },
        {
            "name": "avgFrameRate",
            "type": "Uint16",
            "condition": "avgRateFlag"
        },
        {
            "name": "numReferences",
            "type": "Uint8"
        },
        {
            "name": "dependency",
            "type": "Array",
            "count": "numReferences",
            "fields":
            [
                {
                    "name": "subSeqDirectionFlag",
                    "type": "Uint8"
                },
                {
                    "name": "layerNumber",
                    "type": "Uint8"
                },
                {
                    "name": "subSequenceIdentifier",
                    "type": "Uint16"
                }
            ]
        }
    ]
}