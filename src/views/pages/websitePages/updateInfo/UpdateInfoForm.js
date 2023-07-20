// import React, { useEffect } from "react";
// import { Grid } from "@mui/material";
// import StyledFilledInput from "ui-component/input/filledInput";
// import { gridSpacing } from "store/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { clearError } from "store/types/userTypes";
// import StyledButton from "ui-component/button/button";
// import { useNavigate } from "react-router";
// import { updateUser } from "store/actions/userActions";

const UpdateInfoForm = (props) => {
    // const { values, setValues, type } = props;
    // const dispatch = useDispatch();
    // const loading = useSelector((state) => state?.playerState?.loading);
    // const messageUser = useSelector((state) => state?.playerState?.error);
    // const playerRed = useSelector((state) => state?.playerState?.user);

    // const navigate = useNavigate();

    // const handleCancel = (e) => {
    //     e.preventDefault();
    //     setValues(playerRed);
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(updateUser(values));
    // };

    // const handleDisabledStatus = () => {
    //     if (type === "Edit") {
    //         if (!values?.username || !values?.firstName || !values?.lastName || !values?.email || !values?.birthDate || !values?.phoneNumber ||
    //             (values?.username === playerRed?.username && values?.firstName === playerRed?.firstName && values?.lastName === playerRed?.lastName &&
    //                 values?.email === playerRed?.email && values?.birthDate === playerRed?.birthDate && values?.phoneNumber === playerRed?.phoneNumber
    //             )
    //         )
    //             return true;
    //         else return false;
    //     }
    // };

    // useEffect(() => {
    //     if (messageUser?.message === 'Admin updated.')
    //         navigate('/dashboard');
    // }, [messageUser, navigate])


    return (
        <>
            {/*
            <form noValidate>
                <Grid container spacing={gridSpacing} justifyContent={"center"} height={'100%'} width={'1000px'}>
                    <Grid container item xs={10} md={5} justifyContent={"center"}>
                        <StyledFilledInput
                    
                            name={"firstName"}
                            values={values}
                            setValues={setValues}
                            label={"First name"}
                        />
                    </Grid>
                    <Grid container item xs={10} md={5} justifyContent={"center"}>
                        <StyledFilledInput
                            name={"lastName"}
                            values={values}
                            setValues={setValues}
                            label={"Last name"}
                        />
                    </Grid>
                    <Grid container item xs={10} md={5} justifyContent={"center"}>
                        <StyledFilledInput
                            name={"email"}
                            values={values}
                            setValues={setValues}
                            label={"Email"}
                        />
                    </Grid>
                    <Grid container item xs={10} md={5} justifyContent={"center"}>
                        <StyledFilledInput
                            name={"username"}
                            values={values}
                            setValues={setValues}
                            label={"User Name"}
                        />
                    </Grid>
                    <Grid container item xs={10} md={5} justifyContent={"center"}>
                        <StyledFilledInput
                            name={"birthDate"}
                            values={values}
                            type={'date'}
                            setValues={setValues}
                            label={"Birth Date"}
                        />
                    </Grid>
                    <Grid container item xs={5} md={5} justifyContent={"center"}>
                        <StyledFilledInput
                            name={"phoneNumber"}
                            values={values}
                            setValues={setValues}
                            label={"Phone Number"}
                        />
                    </Grid>
                    <Grid
                        container
                        item
                        xs={10}
                        marginTop={2}
                        justifyContent={"center"}
                    >
                        <StyledButton
                            name={"update-admin"}
                            label={"Cancel"}
                            disabled={handleDisabledStatus()}
                            loading={false}
                            variant={"secondary"}
                            handleClick={handleCancel}
                            type={"submit"}
                            width={"400px"}
                        />
                    </Grid>
                    <Grid
                        container
                        item
                        xs={10}
                        marginBottom={2}
                        marginTop={0}
                        justifyContent={"center"}
                    >
                        <StyledButton
                            name={"update-info"}
                            label={"Update Information"}
                            disabled={handleDisabledStatus()}
                            loading={loading}
                            variant={"primary"}
                            handleClick={handleSubmit}
                            type={"submit"}
                            width={"400px"}
                        />
                    </Grid>
                </Grid>
            </form> */}
        </>
    );
};

export default UpdateInfoForm;