import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
    const host = "http://localhost:3001"

    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
    
    let history = useHistory()
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check if passwords match
        if (credentials.password !== credentials.cpassword) {
            props.showAlert("Passwords do not match", "danger")
            return
        }

        // API call
        const response = await fetch(`${host}/api/auth/createUser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name:credentials.name, email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        // console.log(json)
        if(json.status){
            // save the auth token and redirect
            localStorage.setItem('token', json.data.password)
            history.push('/login')
            props.showAlert("Account created successfully", "success")
        }else{
            props.showAlert("Invalid credentials", "danger")
        }
    }

    return (
        <div className='container mt-2' style={{color:props.mode==='light'?'black':'white'}}>
            <h2>Let's create an account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </form>
        </div>
    )
}

export default Signup
