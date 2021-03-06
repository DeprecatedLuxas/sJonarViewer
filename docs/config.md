# Config

In the config file placed in the frontend and backend folder.
The config file is split into 4 section
* [Database](#database)
* [Jwt](#jwt)
* [Time](#time)
* [CSV](#csv)

##### Database
> This section is for the database config.
```json5
{
   "database": {
        "fileName": "sJonar.db", // The database file name.
        "returnLimit": 50, // The maximum limit of data
        "table": "JARMSCANSTEST", // The table name in the database file
        "columns": [
            {
                "name": "SCANID", // Name of the column
                "columnType": "INTEGER", // Type of the column
                "settings": { 
                    "canBeSearched": false, // Can you search for this column with a query
                    "isRange": false, // Is the column a range 2555..3555
                    "isConditional": false, // Do you need more than this query for a correct search.
                    "doesShowOnSearch": false // Does this column show on a search query.
                }
            },
            {
                "name": "IP", // Name of the column
                "columnType": "INTEGER", // Type of the column
                "conversion": {
                    "type": "INTIP" // Do the column need a speciel conversion.
                },
                "settings": {
                    "canBeSearched": true,
                    "isRange": false,
                    "isConditional": false,
                    "doesShowOnSearch": true
                }
            },
            {
                "name": "SCANDATE", // Name of the column
                "columnType": "TEXT", // Type of the column
                "conversion": {
                    "type": "DATE" // Do the column need a speciel conversion.
                },
                "settings": {
                    "canBeSearched": true, // Can you search for this column with a query
                    "isRange": true,  // Is the column a range 2555..3555
                    "isConditional": true, // Do you need more than this query for a correct search.
                    "doesShowOnSearch": true // Does this column show on a search query.
                }
            },
        ]
    } 
}
```

| Name         | Type              | Default            |
| ------------ | ----------------- | ------------------ |
| fileName     | string            | sJonar.db          |
| returnLimit  | number            | 50                 |
| table        | string            | JARMSCANSTEST      |
| columns      | array of objects  | Can't fit in here  |


##### Jwt
> This section is for the json web tokens config.
```json5
{
    "jwt": {
        "secret": "sJonar", // The secret used to sign the json web tokens.
        "expiresIn": "1d" // When the json web token expires.
    }
}
```

| Name       | Type    | Default   |
| ---------- | --------| --------- |
| secret     | string  | sJonar    |
| expiresIn  | string  | 1d        |

 
##### Time
> This section is for the time parsing.
```json5
{
    "time": {
        "format": "YYYY-MM-DD HH:mm:ss", // The format is used to parse the time string into the config specified format.
    }
}
```

| Name       | Type    | Default                |
| ---------- | --------| ---------------------- |
| format     | string  | YYYY-MM-DD HH:mm:ss    |


##### CSV
> This section is for the csv download scans.
```json5
{
    "csv": {
        "outputFileName": "sJonar.csv", // The outputfilename is used to give the download csv file a name.
    }
}
```

| Name               | Type    | Default       |
| ------------------ | --------| ------------- |
| outputFileName     | string  | sJonar.csv    |