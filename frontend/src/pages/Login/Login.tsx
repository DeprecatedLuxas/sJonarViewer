import React, { Component } from "react";
import axios from "axios";
import { UserLoginForm } from "../../components/Login/Login";
import { verifyUser } from "../../utils";

type LoginState = {
    loginError: string;
};

class Login extends Component<any, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loginError: "",
        };
    }

    componentDidMount() {
        verifyUser(this.props);
    }

    onSubmit = async (data: any) => {
        try {
            const response = await axios.post(
                "/api/authenticate",
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            const { isLoggedIn, error } = response.data;

            if (!isLoggedIn || error) {
                this.setState({ loginError: error });
            } else {
                this.props.history.push("/");
            }
        } catch (error) {
            this.setState({ loginError: error.message });
        }
    };

    render() {
        const { loginError } = this.state;
        return (
            <UserLoginForm
                onSuccessValidation={this.onSubmit}
                loginError={loginError}
            />
        );
    }
}

export default Login;
