import React, {Component} from 'react';
import axios from "axios";
import KnownItem from "./KnownItem";
import styled from 'styled-components'
import * as _ from "lodash";
import { v4 as uuidv4 } from "uuid";

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
type KnownsObject = {
    name: string,
    sslImplementationTested: string,
    jarmHash: string,
    link: string
}
type KnownState = {
    knowns: KnownsObject[],
    selectedKnowns: KnownsObject[]
}

class Known extends Component<any, KnownState> {

    constructor(props: any) {
        super(props);
        this.state = {
            knowns: [],
            selectedKnowns: []
        }
    }


    setRandomKnowns() {
        this.setState({selectedKnowns: _.sampleSize(this.state.knowns, 4)})
    }

    componentDidMount() {

        axios.get("/api/known").then(res => {
            this.setState({
                knowns: res.data.knowns,
                selectedKnowns: _.sampleSize(res.data.knowns, 4)
            })
        }).catch((err) => console.error(err));
        this.setRandomKnowns();
    }


    render() {
        const {
            knowns,
            selectedKnowns
        } = this.state;

        return (
            <KnownsContainer>
                <span onClick={() => {
                    this.setRandomKnowns()
                }}>
                    Refresh
                </span>
                <KnownsItemContainer>

                    {
                        knowns && knowns.length > 0 ? selectedKnowns.map((known: any) => {
                            return (
                                <KnownItem known={known} key={uuidv4()}/>
                            );
                        }) : ''
                    }
                </KnownsItemContainer>
            </KnownsContainer>

        );
    }
}

export default Known;
