import React from 'react';
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar/Navbar';
import styles from '../styles/Signup.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const signup = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            username: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
        }),
        onSubmit: async (values) => {
            let body = {
                username: values.username,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword
            }
            let response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            let data = await response.json()
            if(response.status === 200){
                localStorage.setItem('user', JSON.stringify(data.user));
                alert("Signup Successful");
                window.location.href = '/';
            }else{
                alert(data.error);
            }
        }
    });
    return (
        <>
            <Navbar />
            <form className={styles.inpForm} onSubmit={formik.handleSubmit}>

                <div>
                    <input className={styles.field} type="text" name="username" placeholder="Username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    {formik.touched.username && formik.errors.username ? <p className={styles.error}>{formik.errors.username}</p> : null}
                </div>

                <div>
                    <input className={styles.field} type="text" name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    {formik.touched.email && formik.errors.email ? <p className={styles.error}>{formik.errors.email}</p> : null}
                </div>

                <div>
                    <input className={styles.field} type="password" name="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    {formik.touched.password && formik.errors.password ? <p className={styles.error}>{formik.errors.password}</p> : null}
                </div>

                <div>
                    <input className={styles.field} type="password" name="confirmPassword" placeholder="Confirm Password" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className={styles.error}>{formik.errors.confirmPassword}</p> : null}
                </div>

                <button className={styles.field} type="submit">Submit</button>
            </form>
        </>
    )
}

export default signup