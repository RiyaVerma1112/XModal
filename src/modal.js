import { useEffect, useRef, useState } from "react";
import "./Modal.css"

function Modal() {

    const [showForm , setShowForm] = useState(false) ;
    const formRef = useRef(null) ;

    const handleBtnClick = () => {
        setShowForm(true) ;
    } ;

    const handleClickOutside = (event) => {
        // formRef.current.contains(event.target) : checks if event.target(element that was clicked) is inside formRef.current
        // ! of above return true if event.target is not inside formRef.current(means if click is outside the form)
        // form is currently rendered and click is outside the form
        if(formRef.current && !formRef.current.contains(event.target)) {
            setShowForm(false) ;
        }
    } 

    // runs a piece of code when showForm toggles
    useEffect(() => {
        if(showForm) {
            // calls handleClickOutside whenever mouse click anywhere on page
           document.addEventListener("mousedown" , handleClickOutside) ; 
        }else {
            document.removeEventListener("mousedown" , handleClickOutside) ;
        }
        // to manage sid effect in react - preventing memory leaks &
        //  avoiding issues with multiple event listeners.
        return () => {
            document.removeEventListener("mousedown" , handleClickOutside) ;
        }
    } , [showForm])

    // const handleFormSubmit = (event) => {
    //     // When a form is submitted, the browser's default behavior is to reload the page. 
    //     // By using event.preventDefault();, 
    //     // you can prevent the page reload and handle the form submission with JavaScript instead 
    //     // (e.g., send the data to a server via AJAX or API call).
    //     event.preventDefault() ;
    //     setShowForm(false) ;
    // } ;

    return (
        <div>
            <h1 className="modal-heading">User Details Modal</h1>
            <button onClick={handleBtnClick} className="btn">Open Form</button>
            {/* if showForm is true detailForm will be rendered */}
            { showForm && (
                <div className="modal">
                    <div className="modal-content">
                        {/* <DetailForm onSubmit={handleFormSubmit} formRef={formRef} /> */}
                        <DetailForm formRef={formRef} />
                    </div>
                </div>
            )}
        </div>
    ) ;
}

function DetailForm({formRef}) {
    const [data , setData] = useState({
        name: '' ,
        email: '' ,
        phoneNum: '' ,
        dob: ''
    }) ;

    const [error , setError] = useState({
        name: '' ,
        email: '' ,
        phoneNum: '' ,
        dob: ''
    }) ;

    const handleChange = (event) => {
        setData({ ...data , [event.target.name]: event.target.value}) ;
    } ;

    const validateData = () => {
        let isValid = true ;
        const newError = { name: '' , email: '' , phoneNum: '' , dob: '' } ;
        if(data.name === '') {
            newError.name = 'Please fill out this field' ;
            isValid = false ;
        }
        if(data.email === '') {
            newError.email = 'Please fill out this field' ;
            isValid = false ;
        }
        if(data.phoneNum === '') {
            newError.phoneNum = 'Please fill out this field' ;
            isValid = false ;
        }
        if(data.dob === '') {
            newError.dob = 'Please fill out this field' ;
            isValid = false ;
        }

        if(data.email !== '' && data.email.includes('@') !== true) {
            newError.email = `Please include an '@' in the email address. '${data.email}' is missing an '@'` ;
            isValid = false ;
        }

        if(data.phoneNum !== '' && !/^\d{10}$/.test(data.phoneNum)) {
            alert("Invalid phone number. Please enter a 10-digit phone number.") ;
            isValid = false ;
        }

        const selectedDate = new Date(data.dob) ;
        const today = new Date() ;
        if(data.dob !== '' && selectedDate > today) {
            alert("Invalid date of birth. Date of birth cannot be in the future.") ;
            isValid = false ;
        }

        setError(newError) ;
        return isValid ;
    } ;

    const handleFormSubmit = (event) => {
        event.preventDefault() ;
        if(validateData()) {
            setData({
                name: '' ,
                email: '' ,
                phoneNum: '' ,
                dob: '' 
            }) ;
            setError({
                name: '' ,
                email: '' ,
                phoneNum: '' ,
                dob: ''
            }) ;
        }
    } ;

    return (
        <form ref={formRef} onSubmit={handleFormSubmit}>
            <h3 style={{display: 'block' , textAlign: 'center'}}>Fill Details</h3>
            <label style={{display: 'block' , textAlign: 'center' , fontWeight: 'bold' , marginTop: '2em'}}>Username: 
                <input 
                    required
                    id="username"
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    style={{width: '400px' , height: '25px' , display: 'block' , marginBottom: '1em' , marginTop: '0.5em' , margin: '0rem auto 1rem'}} 
                /> 
                {/* {error.name !== '' && <p>{error.name}</p>} */}
            </label>
            <label style={{display: 'block', textAlign: 'center' , fontWeight: 'bold'}}> Email Address: 
                <input 
                    required
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    style={{width: '400px' , height: '25px' , display: 'block' , marginBottom: '1em' , marginTop: '0.5em' , margin: '0rem auto 1rem'}} 
                />
            </label>
            <label style={{display: 'block', textAlign: 'center' , fontWeight: 'bold'}}> Phone Number:
                <input 
                    required
                    id="phone"
                    type="tel"
                    name="phoneNum"
                    value={data.phoneNum}
                    onChange={handleChange}
                    style={{width: '400px' , height: '25px' , display: 'block' , marginBottom: '1em' , marginTop: '0.5em' , margin: '0rem auto 1rem'}} 
                />
            </label>
            <label style={{display: 'block' , textAlign: 'center' , fontWeight: 'bold'}}> Date of Birth: 
                <input 
                    required
                    id='dob'
                    type="date"
                    name="dob"
                    value={data.dob}
                    onChange={handleChange} 
                    style={{width: '400px' , height: '25px' , display: 'block' , marginBottom: '1em' , marginTop: '0.5em' , margin: '0rem auto 1rem' }}
                />
            </label>
            <button className="submit-button" type="submit" style={{marginTop: '2em'}}>Submit</button>
        </form>
    ) ;
}

// function DetailForm() {
//     const [formData, setFormData] = useState({
//       username: "",
//       email: "",
//       phone: "",
//       dob: "",
//     });
  
//     const [errors, setErrors] = useState({
//       username: "",
//       email: "",
//       phone: "",
//       dob: "",
//     });
  
//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
  
//     const validateForm = () => {
//       let isValid = true;
//       const newErrors = { username: "", email: "", phone: "", dob: "" };
  
//       // Check if fields are empty
//       if (!formData.username) {
//         newErrors.username = "Please fill out this field.";
//         isValid = false;
//       }
//       if (!formData.email) {
//         newErrors.email = "Please fill out this field.";
//         isValid = false;
//       }
//       if (!formData.phone) {
//         newErrors.phone = "Please fill out this field.";
//         isValid = false;
//       }
//       if (!formData.dob) {
//         newErrors.dob = "Please fill out this field.";
//         isValid = false;
//       }
  
//       // Email validation: check if it contains "@"
//       if (formData.email && !formData.email.includes("@")) {
//         newErrors.email = `Please include an '@' in the email address. '${formData.email}' is missing an '@'.`;
//         isValid = false;
//       }
  
//       // Phone validation: check if it has exactly 10 digits
//       if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
//         alert("Invalid phone number. Please enter a 10-digit phone number.");
//         isValid = false;
//       }
  
//       // Date of birth validation: check if it's not a future date
//       const selectedDate = new Date(formData.dob);
//       const today = new Date();
//       if (formData.dob && selectedDate > today) {
//         alert("Invalid date of birth. Date of birth cannot be in the future.");
//         isValid = false;
//       }
  
//       setErrors(newErrors);
//       return isValid;
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       if (validateForm()) {
//         alert("Form submitted successfully!");
  
//         // Reset form to initial state
//         setFormData({
//           username: "",
//           email: "",
//           phone: "",
//           dob: "",
//         });
//         setErrors({
//           username: "",
//           email: "",
//           phone: "",
//           dob: "",
//         });
//       }
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <h3 style={{ textAlign: 'center' }}>Fill Details</h3>
//         <label htmlFor="username" style={{ fontWeight: 'bold', display: 'block', textAlign: 'center' }}>Username:
//           <input
//             id="username"
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             style={{ width: '100%', marginBottom: '1em' }}
//           />
//           {errors.username && <p style={{ color: "red", textAlign: 'center' }}>{errors.username}</p>}
//         </label>
//         <label htmlFor="email" style={{ fontWeight: 'bold', display: 'block', textAlign: 'center' }}>Email Address:
//           <input
//             id="email"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             style={{ width: '100%', marginBottom: '1em' }}
//           />
//           {errors.email && <p style={{ color: "red", textAlign: 'center' }}>{errors.email}</p>}
//         </label>
//         <label htmlFor="phone" style={{ fontWeight: 'bold', display: 'block', textAlign: 'center' }}>Phone Number:
//           <input
//             id="phone"
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             style={{ width: '100%', marginBottom: '1em' }}
//           />
//           {errors.phone && <p style={{ color: "red", textAlign: 'center' }}>{errors.phone}</p>}
//         </label>
//         <label htmlFor="dob" style={{ fontWeight: 'bold', display: 'block', textAlign: 'center' }}>Date of Birth:
//           <input
//             id="dob"
//             type="date"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             style={{ width: '100%', marginBottom: '1em' }}
//           />
//           {errors.dob && <p style={{ color: "red", textAlign: 'center' }}>{errors.dob}</p>}
//         </label>
//         <button type="submit" className="submit-button" style={{ display: 'block', margin: '0 auto', padding: '0.5em 2em' }}>
//           Submit
//         </button>
//       </form>
//     );
//   }

export default Modal ;


