import React from "react";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";

type ExportProps = {
    scans: any[];
    name: string;
};

export const Export: React.FC<ExportProps> = ({ scans, name }) => {
    return (
        <CSVLink
            data={scans}
            filename={name}
            target="_blank"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <FaFileCsv color="#007bff" size="1.75em" />
        </CSVLink>
    );
};
