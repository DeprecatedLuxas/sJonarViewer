import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import {useFormik} from "formik";
import {ErrorMessage} from '../Error/ErrorMessage'

const userValidationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    password: Yup.string().required("Password is required!"),
});




const LoginButton = styled.button`
    width: 100%;
    text-align: center;
    padding: 6px 12px;
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
    border: 1px solid transparent;
    border-radius: 6px;
`;

const LoginForm = styled.form`
    width: 500px;
    margin: auto;
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
            input {
                display: inline-block;
                width: 80%;
            }

            label {
                margin: 10px 0;
                width: 80px;
            }
        }
    }
`;
const LoginInputContainer = styled.div`
    margin: 0 0 20px 0;
`;

const LoginFormHeader = styled.h1`
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 10px;
`;

const LoginInputLabel = styled.label`
    display: inline-block;
    margin-bottom: 8px;
    margin-right: 8px;
`;

const LoginInputField = styled.input`
    display: block;
    width: 100%;
    height: calc(24px + 12px + 2px);
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const LoginFormContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

type UserLoginFormProps = {onSuccessValidation: any, loginError: string};
const UserLoginForm = ({onSuccessValidation, loginError}: UserLoginFormProps) => {

    const { handleSubmit, handleChange, values, errors, touched } = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: userValidationSchema,
        onSubmit: (values) => {
            onSuccessValidation(values);
        }
    });

    return (
        <LoginFormContainer>
            <LoginForm onSubmit={handleSubmit} noValidate autoComplete="off">
                <LoginFormHeader>sJonar</LoginFormHeader>

                <LoginInputContainer>
                    <LoginInputLabel>Username</LoginInputLabel>
                    <LoginInputField
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        value={values.username}
                        onChange={handleChange}
                    />
                </LoginInputContainer>
                <LoginInputContainer>
                    <LoginInputLabel>Password</LoginInputLabel>
                    <LoginInputField
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </LoginInputContainer>
                {errors.username && touched.username ? (
                    <ErrorMessage>{errors.username}</ErrorMessage>
                ) : null}
                {errors.password && touched.password ? (
                    <ErrorMessage>{errors.password}</ErrorMessage>
                ) : null}
                {loginError ? <ErrorMessage>{loginError}</ErrorMessage>: null}
                <LoginButton type="submit">Login</LoginButton>
            </LoginForm>
        </LoginFormContainer>
    );
}

export default UserLoginForm;
