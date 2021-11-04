{
    "type": "alst",
    "parentType": "SampleGroup",
    "fields":
    [
        {
            "name": "roll_count",
            "type": "Uint16"
        },
        {
            "name": "first_output_sample",
            "type": "Uint16"
        },
        {
            "name": "sample_offsets",
            "type": "Array",
            "arrayEntryType": "Uint32",
            "count": "roll_count"
        },
        {
            "type": "Array",
            "fields":
            [
                {
                    "name": "num_output_samples",
                    "type": "Uint16"
                },
                {
                    "name": "num_total_samples",
                    "type": "Uint16"
                }
            ]
        }
    ]
}