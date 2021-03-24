import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import * as PropTypes from "prop-types";
import { sortValues } from "../../utils";
import axios from "axios";
import Select from "react-select";
import KnownItem from "./KnownItem";
import ScaleLoader from "react-spinners/ScaleLoader";
import { connect, DispatchProp } from "react-redux";

import { RootState } from "../../redux/store";
import * as KnownActions from "../../redux/knowns/actions";

const mapStateToProps = (state: RootState) => ({
    knowns: state.known.knowns.map((known) => ({
        ...known,
    })),
});

type StateProps = ReturnType<typeof mapStateToProps>;

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
];

type Props = StateProps & DispatchProp;

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
        const { dispatch } = this.props as Props;
        this.setState({
            loading: true,
        });
        try {
            axios
                .get("/api/known")
                .then((response) => {
                    dispatch(KnownActions.setKnowns(response.data));
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({
                loading: false,
            });
        }
    }

    sortArray = (selected: any) => {
        const sortedArray = this.state.knowns.sort(sortValues(selected.value));
        this.setState({
            knowns: sortedArray,
            sort: selected,
        });
    };

    render() {
        const { sort } = this.props;
        const { knowns } = this.props as Props;
        return (
            <div>
                {this.state.loading ? (
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

                        <div
                            style={{
                                width: "80%",
                                margin: "0 auto",
                                display: "flex",
                                flexFlow: "row wrap",
                                justifyContent: "space-around",
                            }}
                        >
                            {knowns && knowns.length > 0
                                ? knowns.map((known: any) => {
                                      return (
                                          <KnownItem
                                              known={known}
                                              key={uuidv4()}
                                          />
                                      );
                                  })
                                : ""}
                        </div>
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

export default connect(mapStateToProps)(Knowns);
