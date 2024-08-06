// // Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Form validation
//     if (!validateEmail(formData.email)) {
//       alert('Please enter a valid email address.');
//       return;
//     }

//     if (formData.password.length < 8) {
//       alert('Password must be at least 8 characters long.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('https://flex-o-pack-api.onrender.com/api/v1/user/sign-in', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Login successful!');
        
//         // Store the token in localStorage
//         localStorage.setItem('token', data.token);

//         // Redirect to the dashboard
//         navigate('/');
//       } else {
//         setError(data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError('An error occurred during login. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Form validation
  //   if (!validateEmail(formData.email)) {
  //     alert('Please enter a valid email address.');
  //     return;
  //   }

  //   if (formData.password.length < 8) {
  //     alert('Password must be at least 8 characters long.');
  //     return;
  //   }

  //   setLoading(true);
  //   setError(''); // Clear previous errors

  //   try {
  //     const response = await fetch('https://flex-o-pack-api.onrender.com/api/v1/user/sign-in', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email: formData.email,
  //         password: formData.password,
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log('Backend response:', data); // Log the backend response

  //     if (response.ok) {
  //       if (data.token) {
  //         localStorage.setItem('token', data.token);
  //         console.log('Token stored in localStorage:', localStorage.getItem('token')); // Verify token storage

  //         alert('Login successful!');
  //         navigate('/'); // Redirect on successful login
  //       } else {
  //         console.error('Token is missing in the response');
  //         setError('Login failed. Token is missing.');
  //       }
  //     } else {
  //       setError(data.message || 'Login failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error); // Detailed error logging
  //     setError('An error occurred during login. Please try again later.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
  
    setLoading(true);
    setError(''); // Clear previous errors
  
    try {
      const response = await fetch('https://flex-o-pack-api.onrender.com/api/v1/user/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
      console.log('Backend response:', data); // Log the backend response
  
      if (response.ok) {
        // Correctly access the token within the 'data' object
        if (data.data && data.data.token) {
          localStorage.setItem('token', data.data.token);
          console.log('Token stored in localStorage:', localStorage.getItem('token')); // Verify token storage
  
          alert('Login successful!');
          navigate('/'); // Redirect on successful login
        } else {
          console.error('Token is missing in the response');
          setError('Login failed. Token is missing.');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error); // Detailed error logging
      setError('An error occurred during login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
