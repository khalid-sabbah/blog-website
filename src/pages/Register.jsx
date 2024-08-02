
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const handleSubmit = (values) => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <Formik
                initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className='w-100'>

                    <div className="d-flex flex-row align-items-center mb-4 w-100">
                      <MDBIcon fas icon="user me-3" size='lg' />
                      <div className="w-100">
                        <Field
                          name="username"
                          type="text"
                          placeholder="Your Name"
                          className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                        />
                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4 w-100">
                      <MDBIcon fas icon="envelope me-3" size='lg' />
                      <div className="w-100">
                        <Field
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4 w-100">
                      <MDBIcon fas icon="lock me-3" size='lg' />
                      <div className="w-100">
                        <Field
                          name="password"
                          type="password"
                          placeholder="Password"
                          className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                        />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4 w-100">
                      <MDBIcon fas icon="key me-3" size='lg' />
                      <div className="w-100">
                        <Field
                          name="confirmPassword"
                          type="password"
                          placeholder="Repeat your password"
                          className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                      </div>
                    </div>

                    <MDBBtn type="submit" className='mb-4' size='lg'>Register</MDBBtn>
                  </Form>
                )}
              </Formik>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;




