import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import api from "../services/base/api";
import { isAuthenticated } from "../services/auth";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated()) navigate("/home")
  },[])

  const handleSignIn = async (loginForm) => {
    try {
      const response = await api.post("/v1/login", loginForm);
      login(response.data.token);
      navigate("/app");
    } catch (err) {

    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
      .required('Campo Obrigatório'),
      password: Yup.string()
      .required('Campo Obrigatório'),
    }),
    onSubmit: values => {
      handleSignIn(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

    return(
      <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                  <input 
                  name="username"
                  type="text" 
                  className="form-control" 
                  placeholder="Usuário" 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}/>
                  <label for="floatingInput">Username</label>
                  {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-3">
                  <input 
                    type="password"
                    name="password" 
                    className="form-control" 
                    id="floatingPassword" 
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <label for="floatingPassword">Password</label>
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                    in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Login;