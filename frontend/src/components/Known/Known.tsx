import React, { Component } from "react";
import axios from "axios";
import KnownItem from "./KnownItem";
import styled from "styled-components";
import * as _ from "lodash";
import { sortValues } from "../../utils";
import { v4 as uuidv4 } from "uuid";
import * as PropTypes from "prop-types";
import Select from "react-select";

const KnownsContainer = styled.div`
    width: 90%;
    max-height: auto;
    margin: 0 auto;
`;

const KnownsItemContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    margin: 0 auto;

   
}
`;

const SearchContainer = styled.div`
    width: 800px;

    margin: 30px auto 100px auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgb(34 35 58 / 20%);
    padding: 20px 55px 20px 55px;
    border-radius: 15px;
    transition: all 0.3s;

    @media only screen and (max-width: 600px) {
        width: 90%;
    }

    @media only screen and (orientation: landscape) and (max-width: 900px) {
        height: auto;
        width: 90%;
        padding: 20px 55px 20px 55px;
    }
`;

type KnownsObject = {
    [key: string]: string | number;
    name: string;
    sslImplementationTested: string;
    jarmHash: string;
    link: string;
};
type KnownState = {
    knowns: KnownsObject[];
    selectedKnowns: KnownsObject[];
    sort: string;
};
const selectStyles = {
    container: (provided: any, { selectProps: { width } }: any) => ({
        ...provided,
        width: width,
        margin: "40px auto 0px auto",
    }),
};

const sortTypes = [
    { label: "Sorting after Name", value: "name" },
    { label: "Sorting after Jarmhash", value: "jarmHash" },
    {
        label: "Sorting after SSL Implementation Tested",
        value: "sslImplementationTested",
    },
];

const RefreshButton = styled.a`
    position: relative;
    padding: 5px 20px;
    margin: 0 10px;
    font-family: Roboto, sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 1;
    color: #007bff;
    background: none;
    border: none;
    outline: none;
    overflow: hidden;
    cursor: pointer;
    filter: drop-shadow(0 2px 8px rgba(#275efe, 0.32));
    transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

    &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background: #ffffff;
        border-radius: 5px;
        transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    & > span {
        display: inline-flex;
        vertical-align: middle;
        transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
`;

const KnownsButton = styled.a`
    position: relative;
    padding: 5px 20px;
    font-family: Roboto, sans-serif;
    font-weight: 500;
    margin: 0 10px;
    font-size: 16px;
    line-height: 1;
    color: #007bff;
    background: none;
    border: none;
    outline: none;
    overflow: hidden;
    cursor: pointer;
    filter: drop-shadow(0 2px 8px rgba(#275efe, 0.32));
    transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    text-decoration: none;
    &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background: #ffffff;
        border-radius: 5px;
        transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    & > span {
        display: inline-flex;
        vertical-align: middle;
        transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
`;

class Known extends Component<any, KnownState> {
    static propTypes: {
        usingSort: PropTypes.Requireable<boolean>;
        sort: PropTypes.Requireable<string>;
        refreshButton: PropTypes.Requireable<boolean>;
        usingMaxKnowns: PropTypes.Requireable<boolean>;
        maxKnowns: PropTypes.Requireable<number>;
        goBackButton: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        usingSort: boolean;
        sort: string;
        refreshButton: boolean;
        usingMaxKnowns: boolean;
        maxKnowns: number;
        goBackButton: boolean;
    };

    constructor(props: any) {
        super(props);
        this.state = {
            knowns: [],
            selectedKnowns: [],
            sort: "name",
        };
    }

    setRandomKnowns() {
        this.setState({ selectedKnowns: _.sampleSize(this.state.knowns, 4) });
    }

    sortArray = (selected: any) => {
 
        const sortedArray = this.state.knowns.sort(sortValues(selected.value));
        this.setState({
            knowns: sortedArray,
            sort: selected,
        });
    };

    updateKnowns = async () => {
        const response = await axios.get("/api/known");
        this.setState({
            knowns: response.data.knowns,
            selectedKnowns: this.props.usingMaxKnowns
                ? _.sampleSize(response.data.knowns, this.props.maxKnowns)
                : response.data.knowns,
        });
    };

    componentDidMount() {
        this.updateKnowns();
    }

    render() {
        const { knowns, selectedKnowns } = this.state;
        const { refreshButton, usingSort, goBackButton, sort } = this.props;

        return (
            <KnownsContainer>
                {usingSort ? (
                    <SearchContainer>
                        <h1 style={{ textAlign: "center" }}>sJonar</h1>
                        <Select
                            styles={selectStyles}
                            width="100%"
                            options={sortTypes}
                            onChange={this.sortArray}
                            defaultValue={sortTypes[sortTypes.findIndex(x => x.value === sort)]}
                        />
                    </SearchContainer>
                ) : (
                    ""
                )}
                {refreshButton ? (
                    <>
                        <RefreshButton
                            onClick={() => {
                                this.setRandomKnowns();
                            }}
                        >
                            <span>Refresh</span>
                        </RefreshButton>
                    </>
                ) : (
                    ""
                )}
                {
                    goBackButton ? (<KnownsButton href="/">
                    <span>Go Back</span>
                </KnownsButton>) : (<KnownsButton href="/knowns">
                    <span>Show All</span>
                </KnownsButton>)
                }
    

                <KnownsItemContainer>
                    {knowns && knowns.length > 0
                        ? selectedKnowns.map((known: any) => {
                              return <KnownItem known={known} key={uuidv4()} />;
                          })
                        : ""}
                </KnownsItemContainer>
            </KnownsContainer>
        );
    }
}

Known.propTypes = {
    usingSort: PropTypes.bool,
    sort: PropTypes.oneOf(["name", "jarmhash", "ssl"]),
    refreshButton: PropTypes.bool,
    usingMaxKnowns: PropTypes.bool,
    maxKnowns: PropTypes.number,
    goBackButton: PropTypes.bool
};
Known.defaultProps = {
    usingSort: false,
    sort: "name",
    refreshButton: true,
    usingMaxKnowns: true,
    maxKnowns: 4,
    goBackButton: false
};
export default Known;
