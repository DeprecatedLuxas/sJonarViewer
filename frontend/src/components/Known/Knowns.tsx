import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import * as PropTypes from "prop-types";
import { sortValues } from "../../utils";
import Select from "react-select";
import KnownItem from "./Known";
import ScaleLoader from "react-spinners/ScaleLoader";
import styled from "styled-components";
import { connect } from "react-redux";
import { GetKnowns } from "../../redux/actions/KnownsActions";
import { RootStore } from "../../redux/store";
const Container = styled.div`
    width: 60%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    @media only screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }

    @media only screen and (max-width: 992px) {
        grid-template-columns: 1fr 1fr;
    }
`;

type KnownsObject = {
    [key: string]: string | number;
    name: string;
    sslImplementationTested: string;
    jarmHash: string;
    link: string;
};
type KnownsState = {
    knowns: KnownsObject[];
    sort: string;
    loading: boolean;
};

const selectStyles = {
    container: (provided: any, { selectProps: { width } }: any) => ({
        ...provided,
        width: width,
        margin: "40px auto 20px auto",
    }),
};

const sortTypes = [
    { label: "Sorting after Name", value: "name" },
    { label: "Sorting after Jarmhash", value: "jarmHash" },
    {
        label: "Sorting after SSL Implementation Tested",
        value: "sslImplementationTested",
    },
    { label: "Sorting after id", value: "id" },
    { label: "Sorting after amount", value: "amount" },
];


class Knowns extends Component<any, KnownsState> {
    static propTypes: {
        usingSort: PropTypes.Requireable<boolean>;
        sort: PropTypes.Requireable<string>;
        refreshButton: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        usingSort: boolean;
        sort: string;
        refreshButton: boolean;
    };

    constructor(props: any) {
        super(props);
        this.state = {
            knowns: [],
            sort: "name",
            loading: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(GetKnowns());
    }

    sortArray = (selected: any) => {
        const sortedArray = this.state.knowns.sort(sortValues(selected.value));
        this.setState({
            knowns: sortedArray,
            sort: selected,
        });
    };

    render() {
        const { sort, knowns } = this.props;
        return (
            <div>
                {knowns.loading ? (
                    <div style={{ margin: "100px 0", textAlign: "center" }}>
                        <ScaleLoader />
                    </div>
                ) : (
                    <>
                        <Select
                            styles={selectStyles}
                            width="40%"
                            options={sortTypes}
                            onChange={this.sortArray}
                            defaultValue={
                                sortTypes[
                                    sortTypes.findIndex((x) => x.value === sort)
                                ]
                            }
                        />

                        <Container>
                            {knowns.knowns && knowns.knowns.length > 0
                                ? knowns.knowns.map((known: any) => {
                                      return (
                                          <KnownItem
                                              known={known}
                                              key={uuidv4()}
                                          />
                                      );
                                  })
                                : ""}
                        </Container>
                    </>
                )}
            </div>
        );
    }
}

Knowns.propTypes = {
    usingSort: PropTypes.bool,
    sort: PropTypes.oneOf(["name", "jarmhash", "ssl"]),
    refreshButton: PropTypes.bool,
};
Knowns.defaultProps = {
    usingSort: false,
    sort: "name",
    refreshButton: true,
};

const mapState = (state: RootStore) => ({
    knowns: state.knowns,
});

export default connect(mapState)(Knowns);
