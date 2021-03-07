# Search Documentation




> NOTE:   
> When using the scandate operator, you need to surround the scandate in qoutes else it won't work.

Default Search Operators



| Operators         | isRange | isConditional | Example                                                             |
| ----------------- | ------- | ------------- | ------------------------------------------------------------------- |
| scandate          | both    | true          | "2021-02-02 18:12:14" or "2021-02-02 18:12:14..2021-02-04 18:12:14" |
| jarmhash          | false   | false         | 26d26d00026d26d22c26d26d26d26dd3b67dd3674d9af9dd91c1955a35d0e9      |
| port              | both    | true          | 443 or 443..460                                                     |
| domain            | false   | false         | 89.188.72.114                                                       |
| ip                | false   | false         | 89.188.72.114                                                       |

