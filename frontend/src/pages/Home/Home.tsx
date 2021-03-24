import React, { FormEvent } from "react";
import {
    SearchButton,
    SearchForm,
} from "../../components/SearchForm/SearchForm";
import _ from "lodash";
import styled from "styled-components";
import {
    convertObjectToSearch,
    getParameterByName,
    parseSearchBar,
    verifyUser,
    encodeSearch,
    decodeSearch,
} from "../../utils";
import { ErrorMessage } from "../../components/Message/ErrorMessage";
import { Header } from "../../components/Header/Header";
import Knowns from "../../components/Known/Knowns";
const StyledHomeContainer = styled.div`
    width: 100%;
    height: 100%;
`;
const SearchContainer = styled.div`
    width: 800px;
    margin: 20px auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgb(34 35 58 / 20%);
    padding: 40px 55px 45px 55px;
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

type HomePageState = {
    query: string;
    searchQuery: string;
    search: string;
    loading: boolean;
    errorOccurred: boolean;
    errorMessage: string;
};

interface HomeProps {
    add: () => void;
    remove: () => void;
    known: {
        name: string,
        amount: number,
        sslImplementationTested: string,
        jarmHash: string,
        link: string
    }[]
}

class Home extends React.Component<any, HomePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            query: "",
            // @ts-ignore
            searchQuery:
                getParameterByName(
                    "querySearch",
                    this.props.history.location.search
                ) || "",
            // @ts-ignore
            search:
                getParameterByName(
                    "searchBar",
                    this.props.history.location.search
                ) || "",
            loading: false,
            errorOccurred: false,
            errorMessage: "",
        };
    }

    componentDidMount() {
        // Verifying the user cookie.
        verifyUser(this.props);

        const queryParameters = new URLSearchParams(this.props.location.search);

        const queryParameter = queryParameters.get("query");
        if (queryParameter !== null) {
            const parsedDecodedSearch = JSON.parse(
                decodeSearch(queryParameter)
            );
            this.setState(
                {
                    search: convertObjectToSearch(parsedDecodedSearch),
                },
                () => {
                    this.retrieveData();
                }
            );
        }
    }

    onSearchBarChange = (event: any) => {
        const inputSearch = event.target.value;
        this.setState({
            search: inputSearch,
        });
    };

    retrieveData = async (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();

        // Prevents the search button from being clicked when a search is loading
        this.setState({
            loading: true,
        });

        try {
            const { search } = this.state;
            if (_.isEmpty(search)) {
                this.setState({
                    errorOccurred: true,
                    errorMessage: "You cant submit an empty input search!",
                });
                return;
            }
            const parsedStateSearch = parseSearchBar(search);

            if (_.isEmpty(parsedStateSearch)) {
                this.setState({
                    errorOccurred: true,
                    errorMessage:
                        "Your search input did not match any of the operators.",
                });
                return;
            }
            if (_.values(parsedStateSearch).every(_.isEmpty)) {
                this.setState({
                    errorOccurred: true,
                    errorMessage: "Your search operators need a value",
                });
                return;
            }

            this.props.history.push(
                `search?query=${encodeSearch(
                    `${JSON.stringify(parsedStateSearch)}`
                )}`
            );
        } catch (error) {
            this.setState({
                errorOccurred: true,
                errorMessage: error.message,
            });
        } finally {
            // Enables the search button again.
            this.setState({
                loading: false,
            });
        }
    };

    render() {
        const { search, errorMessage, loading, errorOccurred } = this.state;

        return (
            <StyledHomeContainer>
                <div>
                    <SearchContainer>
                        <Header>sJonar</Header>
                        <SearchForm
                            onSubmit={this.retrieveData}
                            error={errorOccurred}
                        >
                            <input
                                type="text"
                                placeholder="Search by operators"
                                value={search}
                                onChange={this.onSearchBarChange}
                            />

                            <SearchButton loading={loading ? 1 : 0}>
                                Search
                            </SearchButton>
                        </SearchForm>
                        {errorMessage && (
                            <ErrorMessage>{errorMessage}</ErrorMessage>
                        )}
                    </SearchContainer>
                </div>
                <Knowns usingSort={true} />
            </StyledHomeContainer>
        );
    }
}

export default Home;
