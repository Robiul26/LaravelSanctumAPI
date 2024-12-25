import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

export default function Login() {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    async function handleLogin(e) {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(formData),
        });
        const data = await res.json()
        console.log(data);
        

        if (data.errors) {
            setErrors(data.errors);
        } else {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setErrors('');
            navigate('/');
        }



    }

    return (
        <>
            <h1 className='title'>Login</h1>

            <form onSubmit={handleLogin} className='w-1/2 mx-auto space-y-6'>
             
                <div>
                    <input type="email" placeholder='Email'
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        value={formData.email} />
                    {errors.email && <span className="error">{errors.email[0]}</span>}
                </div>
                <div>
                    <input type="password" placeholder='Password'
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        value={formData.password} />
                    {errors.password && <span className="error">{errors.password[0]}</span>}
                </div>
                
                <button className='primary-btn'>Login</button>
            </form>
        </>

    )
}
