import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Box, Container } from "@material-ui/core";
import { post } from "../../src/utils/api";
interface IFormikForm {
    title: string;
}

const validationSchema = yup.object({
    email: yup.string().email().required(),
    username: yup.string().required(),
    mobile: yup.string().required(),
    password: yup.string().min(8).required(),
});

interface IUser {
    email: string;
    username: string;
    mobile: string;
}

const FormikForm: React.FC<IFormikForm> = ({ title }) => {
    const [user, setUser] = useState<IUser | null>(null);

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            mobile: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            post(values).then((res) => {
                setUser(res);
                console.log(res);
            });
        },
    });

    return (
        <Container maxWidth="sm">
            <Box data-testid="form_title" fontSize="h4.fontSize" pt={10} pb={10}>
                {title}
            </Box>
            <form onSubmit={formik.handleSubmit}  data-testid="form">
                <TextField
                    style={{ marginBottom: 25 }}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                    style={{ marginBottom: 25 }}
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    variant="outlined"
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />

                <TextField
                    style={{ marginBottom: 25 }}
                    fullWidth
                    id="mobile"
                    name="mobile"
                    label="Mobile"
                    variant="outlined"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                />
                <TextField
                    style={{ marginBottom: 25 }}
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button data-testid="submit_button" color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default FormikForm;
