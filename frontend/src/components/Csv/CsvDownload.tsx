import React, {Component} from 'react';
import {CSVLink} from "react-csv";
import {CSVIcon} from "../Icons"
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"

type CsvDownloadProps = {
    scans: any[],
    name: string
}


class CsvDownload extends Component<CsvDownloadProps, any> {

    render() {
        return (
            <CSVLink data={this.props.scans} filename={this.props.name} target="_blank"
                     style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Tippy content={<span>Download scans as csv</span>} placement={"right"}>
                    <CSVIcon/>
                </Tippy>
            </CSVLink>

        );
    }
}


export default CsvDownload;
