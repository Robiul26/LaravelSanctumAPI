import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

export default function Register() {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});

    async function handleRegister(e) {
        e.preventDefault();
        const res = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(formData),
        });
        const data = await res.json()

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
            <h1 className='title'>Register</h1>

            <form onSubmit={handleRegister} className='w-1/2 mx-auto space-y-6'>
                <div>
                    <input type="text" placeholder='Name'
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        value={formData.name}
                    />
                    {errors.name && <span className="error">{errors.name[0]}</span>}
                </div>
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
                <div>
                    <input type="password" placeholder='Confirm Password'
                        onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                        value={formData.password_confirmation} />
                </div>
                <button className='primary-btn'>Register</button>
            </form>
        </>

    )
}
