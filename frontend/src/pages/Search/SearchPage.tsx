import React, {FormEvent} from "react";
import {SearchButton, SearchForm,} from "../../components/SearchForm/SearchForm";
import ScanItem from "../../components/ScanItem/ScanItem";
import {ScanItems} from "../../components/ScanItems/ScanItems";
import axios from "axios";
import * as _ from "lodash";
import styled from 'styled-components'
import {
    SQLColumn
} from "../../types/sql-types"
import {convertObjectToSearch, getParameterByName, parseSearchBar, verifyUser, encodeSearch, decodeSearch} from "../../utils";
import config from "@config";
import CsvDownload from "../../components/Csv/CsvDownload";
import { Header } from "../../components/Header/Header"; 
const StyledSearchContainer = styled.div`
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

type SearchPageState = {
    query: string,
    searchQuery: string,
    scans: SQLColumn[],
    search: string,
    loading: boolean,
    errorOccurred: boolean,
    errorMessage: string
}


class SearchPage extends React.Component<any, SearchPageState> {


    constructor(props: any) {
        super(props);
        this.state = {
            query: "",
            // @ts-ignore
            searchQuery: getParameterByName("querySearch", this.props.history.location.search) || "",
            scans: [],
            // @ts-ignore
            search: getParameterByName("searchBar", this.props.history.location.search) || "",
            loading: false,
            errorOccurred: false,
            errorMessage: "",
        }
    }


    componentDidMount() {
        // Verifying the user cookie.
        verifyUser(this.props);
        
        this.updateUI();
    }



    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props.location.search !== prevProps.location.search) {
            this.updateUI()
        }
    }

    updateUI = () => {
        console.log("UPDATE UI CALLED");
        const queryParameters = new URLSearchParams(this.props.location.search);

        const queryParameter = queryParameters.get("query");
        if (queryParameter !== null) {
            const parsedDecodedSearch = JSON.parse(decodeSearch(queryParameter))
            this.setState({
                search: convertObjectToSearch(parsedDecodedSearch)
            }, () => {
                console.log("retrieving data")
                this.retrieveData()
            })
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
            loading: true
        });

        try {
            const {search} = this.state;
            if (_.isEmpty(search)) {
                this.setState({
                    errorOccurred: true,
                    errorMessage: "You cant submit an empty input search!"
                });
                return;
            }
            const parsedStateSearch = parseSearchBar(search);
            if (_.isEmpty(parsedStateSearch)) {
                this.setState({
                    errorOccurred: true,
                    errorMessage: "No Results"
                });
                return;
            }
            const url = encodeSearch(JSON.stringify(parsedStateSearch))
            this.props.history.push(`search?query=${url}`);
            const response = await axios.get(`/api/search?query=${url}`);
            this.setState({
                scans: response.data.scans,
                searchQuery: encodeURIComponent(JSON.stringify(parsedStateSearch)),
                errorMessage: "",
                errorOccurred: false
            })

        } catch (error) {
            this.setState({
                errorOccurred: true,
                errorMessage: error.message
            });
        } finally {

            // Enables the search button again.
            this.setState({
                loading: false
            })
        }

    }


    render() {
        const {search, scans, errorMessage, loading, errorOccurred} = this.state;
        return (
            <StyledSearchContainer>
                <div>
                    <SearchContainer>
                        <Header onClick={() => this.props.history.push("/")}>sJonar</Header>
                        <SearchForm onSubmit={this.retrieveData} error={errorOccurred}>
                            <input
                                type="text"
                                placeholder="Search by operators"
                                value={search}
                                onChange={this.onSearchBarChange}
                            />

                            <SearchButton loading={loading ? 1 : 0}>Search</SearchButton>
                            {
                                scans && scans.length > 0 ? (
                                    <CsvDownload scans={this.state.scans} name={config.csv.outputFileName} />
                                ) : ''
                            }
                        </SearchForm>
                        {errorMessage && <span>{errorMessage}</span>}



                    </SearchContainer>
    
                </div>


                <ScanItems key={"scanItems"}>
        
                    {scans.length > 0 ? scans.map((scan: SQLColumn) => {

                        const queryObj = {
                            searchBar: encodeURIComponent(this.state.search),
                            properties: Object.keys(scan).map(e => ({key: e, value: scan[e]})),
                            searchQuery: this.state.searchQuery
                        }
            
                        return (
                            <ScanItem key={scan[0]}
                                query={queryObj} />
                        )
                    }) : ''}
                </ScanItems>

            </StyledSearchContainer>

        );
    }
}


export default SearchPage;



