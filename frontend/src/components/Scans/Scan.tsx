import { buildNewSearch, formatYearAndDayAndMonth } from "../../utils";
import React from "react";
import styled from "styled-components";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ScanProperty } from "./ScanProperty";
import { v4 as uuidv4} from 'uuid'
const StyledScan = styled.div`
    width: 90%;
    border-radius: 0.5rem;
    background-color: #fff;
    margin: 10px auto;
    display: grid;
    padding: 10px;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    grid-gap: 1rem;
    box-shadow: 6px 5px 5px rgba(92, 69, 82, 0.4);
    & div {
        padding: 0 10px;
    }

    @media only screen and (max-width: 600px) {
        & > div > h4 {
            margin-top: 10px;
        }
    }
`;
interface ScanProps extends RouteComponentProps<any> {
    properties: {
        key: string;
        value: boolean | string | number;
    }[];
    query: string;
}

class Scan extends React.Component<ScanProps, any> {
    constructor(props: ScanProps) {
        super(props);
        this.state = {};
    }

    addToSearch = (event: React.MouseEvent) => {
        const { properties, query } = this.props;

        // @ts-ignore
        if (event.target.dataset.scan) {
            const { key, value } = properties[
                properties.findIndex(
                    // @ts-ignore
                    (el: any) => el.key === event.target.dataset.scan
                )
            ];
            const url = buildNewSearch(query, value, key);
            const metaKeyPressed = event.ctrlKey;
            if (metaKeyPressed) {
                window.open(url);
            } else {
                this.props.history.push(url);
            }
        }
    };

    render() {
        const { properties } = this.props;

        return (
            <StyledScan key={uuidv4()}>
                {properties && properties.length > 0
                    ? properties.map((property: any) => {
                          if (property.key === "SCANDATE") {
                              property.value = formatYearAndDayAndMonth(
                                  property.value
                              );
                          }

                          return (
                              <ScanProperty
                                  key={uuidv4()}
                                  propertyKey={property.key}
                                  propertyValue={property.value}
                                  click={this.addToSearch}
                              />
                          );
                      })
                    : ""}
            </StyledScan>
        );
    }
}

export default withRouter(Scan);
