export const config = {
    "database": {
        "fileName": "sJonar_default.db",
        "returnLimit": 50,
        "table": "JARMSCANS",
        "columns": [
            {
                "name": "SCANID",
                "columnType": "INTEGER",
                "settings": {
                    "canBeSearched": false,
                    "isRange": false,
                    "isConditional": false,
                    "doesShowOnSearch": false
                }
            },
            {
                "name": "DOMAIN",
                "columnType": "TEXT",
                "settings": {
                    "canBeSearched": true,
                    "isRange": false,
                    "isConditional": false,
                    "doesShowOnSearch": true
                }
            },
            {
                "name": "IP",
                "columnType": "INTEGER",
                "conversion": {
                    "type": "INTIP"
                },
                "settings": {
                    "canBeSearched": true,
                    "isRange": false,
                    "isConditional": false,
                    "doesShowOnSearch": true
                }
            },
            {
                "name": "PORT",
                "columnType": "INTEGER",
                "settings": {
                    "canBeSearched": true,
                    "isRange": true,
                    "isConditional": true,
                    "doesShowOnSearch": true
                }
            },
            {
                "name": "JARMHASH",
                "columnType": "TEXT",
                "settings": {
                    "canBeSearched": true,
                    "isRange": false,
                    "isConditional": false,
                    "doesShowOnSearch": true
                }
            },
            {
                "name": "SC",
                "columnType": "TEXT",
                "settings": {
                    "canBeSearched": false,
                    "isRange": false,
                    "isConditional": false,
                    "doesShowOnSearch": true
                }
            },
            {
                "name": "TC",
                "columnType": "TEXT",
                "settings": {
                    "canBeSearched": false,
                    "isRange": false,
                    "isConditional": false,
                    "doesShowOnSearch": true
                }
            },
            {
                "name": "UA",
                "columnType": "TEXT",
                "settings": {
                    "canBeSearched": false,
                    "isRange": false,
                    "isConditional": false,
                    "doesShowOnSearch": true
                }
            },
            {
                "name": "SCANDATE",
                "columnType": "TEXT",
                "conversion": {
                    "type": "DATE"
                },
                "settings": {
                    "canBeSearched": true,
                    "isRange": true,
                    "isConditional": true,
                    "doesShowOnSearch": true
                }
            },
        ]
    },
    "jwt": {
        "secret": "sJonar",
        "expiresIn": "1d"
    },
    "time": {
        "format": "YYYY-MM-DD HH:mm:ss"
    },
    "csv": {
        "outputFileName": "sJonar.csv"
    }
}

export default config;
