import React from "react";
import * as _ from "lodash";
import styled from 'styled-components'
import Known from '../../components/Known/Known'
import {verifyUser} from "../../utils";

const StyledKnownsContainer = styled.div`
    width: 100%;
    height: 100%;
`;




class KnownsPage extends React.Component<any, any> {


    componentDidMount() {
        // Verifying the user cookie.
        verifyUser(this.props);
        
    }

    render() {
        return (
            
            <StyledKnownsContainer>
             
                <>
                
                    <Known usingSort={true} usingMaxKnowns={false} goBackButton={true}/>
                </>




            </StyledKnownsContainer>

        );
    }
}


export default KnownsPage;



