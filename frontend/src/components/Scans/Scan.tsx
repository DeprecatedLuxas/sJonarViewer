import { buildNewSearch, formatYearAndDayAndMonth } from "../../utils";
import React from "react";
import styled from "styled-components";
import { RouteComponentProps, withRouter } from "react-router-dom";
const Property = (children: any) => <div>{children}</div>;
const PropertyKey = (children: any) => <h4>{children}</h4>;
const PropertyValue = (children: any) => <span>{children}</span>;

const StyledScan = styled.div`
    width: 90%;
    border: 2px solid rgba(82, 75, 71, 0.4);
    border-radius: 3px;
    background-color: #fff;
    margin: 10px auto;
    display: flex;
    padding: 10px;
    flex-flow: row wrap;
    justify-content: space-around;

    & div {
        flex: 1 1 0;
        padding: 0 5px;
    }

    @media only screen and (max-width: 600px) {
        flex-direction: column;

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
    searchQuery: string;
}

class Scan extends React.Component<ScanProps, any> {
    static Property: Function;
    static PropertyKey: Function;
    static PropertyValue: Function;

    constructor(props: ScanProps) {
        super(props);
        this.state = {};
    }

    addToSearch = (event: React.MouseEvent) => {
        const { properties, searchQuery } = this.props;
        const { key, value } = properties[0];

        const url = buildNewSearch(searchQuery, value, key);
        const metaKeyPressed = event.ctrlKey;
        if (metaKeyPressed) {
            window.open(url);
        } else {
            this.props.history.push(url);
        }
    };

    render() {
        const { properties } = this.props;

        return (
            <StyledScan>
                {properties && properties.length > 0
                    ? properties.map((property: any) => {
                          if (property.key === "SCANDATE") {
                              property.value = formatYearAndDayAndMonth(
                                  property.value
                              );
                          }
                          console.log(property)
                          return (
                              <Property
                                  data-value={"value"}
                                  data-key={"key"}
                                  onClick={this.addToSearch}
                              >
                                  <PropertyKey>{property.value}</PropertyKey>
                                  <PropertyValue>{property.key}</PropertyValue>
                              </Property>
                          );
                      })
                    : ""}
            </StyledScan>
        );
    }
}

export default withRouter(Scan);
