import React, { FormEvent } from "react";
import {
    SearchButton,
    SearchForm,
} from "../../components/SearchForm/SearchForm";

import { Scans } from "../../components/Scans/Scans";
import Scan from "../../components/Scans/Scan";
import styled from "styled-components";
import { SQLColumn } from "../../types/sql-types";
import { convertObjectToSearch, verifyUser, decodeSearch } from "../../utils";
import Scroller from "../../components/Scroller/Scroller";
import config from "@config";
import { Export } from "../../components/Export/Export";
import { Header } from "../../components/Header/Header";
import { LoadMore } from "../../components/LoadMore/LoadMore";
import { connect } from "react-redux";
import { RootStore } from "../../redux/store";
import { GetScans } from "../../redux/actions/SearchActions";
import { v4 as uuidv4 } from "uuid";
import ScaleLoader from "react-spinners/ScaleLoader";

import { Alert } from "react-bs-notifier";


const StyledSearchContainer = styled.div`
    width: 100%;
    height: 100%;
`;
const SearchContainer = styled.div`
    width: 800px;
    margin: 15px auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgb(34 35 58 / 20%);
    padding: 20px 25px 20px 25px;
    border-radius: 15px;
    transition: all 0.3s;

    @media only screen and (max-width: 600px) {
        width: 90%;
    }

    @media only screen and (orientation: landscape) and (max-width: 900px) {
        height: auto;
        width: 90%;
        padding: 20px 55px 20px 55px;
        div {
            display: flex;
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            justify-content: space-between;
            margin: 0 0 10px 0;
        }
    }
`;

type SearchPageState = {
    scans: SQLColumn[];
    search: string;
    loadMore: number;
};

class SearchPage extends React.Component<any, SearchPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            scans: [],
            search: "",
            loadMore: 0,
        };
    }

    componentDidMount() {
        // Verifying the user cookie.
        verifyUser(this.props);

        const urlParameters = new URLSearchParams(this.props.location.search);

        if (!urlParameters.has("query")) {
            this.props.history.push("/");
            return;
        }
        let queryParameter = urlParameters.get("query");
        if (queryParameter === null || queryParameter === "") {
            this.props.history.push("/");
            return;
        }
        try {
            const parsedDecodedSearch = JSON.parse(
                decodeSearch(queryParameter)
            );

            const searchString = convertObjectToSearch(parsedDecodedSearch);
            this.setState({
                search: searchString,
            });
            this.props.dispatch(
                GetScans(searchString, 0, false, [], undefined)
            );
        } catch (decodeError) {
            console.log(decodeError);
        }
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props.location.search !== prevProps.location.search) {
            const urlParameters = new URLSearchParams(
                this.props.location.search
            );

            if (!urlParameters.has("query")) {
                this.props.history.push("/");
                return;
            }
            let queryParameter = urlParameters.get("query");

            if (queryParameter === null || queryParameter === "") {
                this.props.history.push("/");
                return;
            }
            try {
                const parsedDecodedSearch = JSON.parse(
                    decodeSearch(queryParameter)
                );

                const searchString = convertObjectToSearch(parsedDecodedSearch);

                this.setState({
                    search: searchString,
                });

                this.props.dispatch(
                    GetScans(searchString, 0, false, [], undefined)
                );
            } catch (decodeError) {
                console.log(decodeError);
            }
        }
    }

    onSearchBarChange = (event: any) => {
        const inputSearch = event.target.value;
        this.setState({
            search: inputSearch,
        });
    };

    retrieveData = async (event?: FormEvent<HTMLFormElement>) => {
        // Prevents the search button from being clicked when a search is loading
        event?.preventDefault();

        this.props.dispatch(
            GetScans(this.state.search, 0, false, [], this.props.history)
        );
    };

    loadMore = async (event?: any) => {
        event?.preventDefault();
        this.props.dispatch(
            GetScans(
                this.state.search,
                this.props.scans.loadMore,
                true,
                this.props.scans.scans,
                undefined
            )
        );
    };

    render() {
        const { search } = this.state;
        const { scans } = this.props;
        return (
            <StyledSearchContainer>
                <div>
                    <SearchContainer>
                        <Header>sJonar</Header>
                        <SearchForm onSubmit={this.retrieveData} error={false}>
                            <input
                                type="text"
                                placeholder="Search by operators"
                                value={search}
                                onChange={this.onSearchBarChange}
                            />

                            <SearchButton loading={scans.loading ? 1 : 0}>
                                Search
                            </SearchButton>
                            {scans.scans && scans.scans.length ? (
                                <Export
                                    scans={scans.scans}
                                    name={config.csv.outputFileName}
                                />
                            ) : (
                                ""
                            )}
                        </SearchForm>
                        <div style={{width: "70%", margin: "0 auto"}}>
                            {scans.message && (
                                <Alert type="danger">{scans.message}</Alert>
                            )}
                        </div>
                    </SearchContainer>
                </div>

                {scans.loading ? (
                    <div style={{ margin: "100px 0", textAlign: "center" }}>
                        <ScaleLoader />
                    </div>
                ) : (
                    <>
                        <Scans>
                            {scans.scans && scans.scans.length ? (
                                scans.scans.map((scan: SQLColumn) => (
                                    <Scan
                                        key={uuidv4()}
                                        properties={Object.keys(scan).map(
                                            (e) => ({
                                                key: e,
                                                value: scan[e],
                                            })
                                        )}
                                        query={scans.query}
                                    />
                                ))
                            ) : (
                                <div style={{ margin: "100px 0", textAlign: "center" }}>
                                    <span>No results was found!</span>
                                </div>
                            )}
                        </Scans>
                        {scans.scans && scans.scans.length > 49 ? (
                            <LoadMore
                                onClick={this.loadMore}
                                loading={scans.loading ? 1 : 0}
                            >
                                Load More
                            </LoadMore>
                        ) : null}
                    </>
                )}

                <Scroller isSmooth color="#6f00ff" />
            </StyledSearchContainer>
        );
    }
}

const mapState = (state: RootStore) => ({
    scans: state.scans,
});

export default connect(mapState)(SearchPage);
