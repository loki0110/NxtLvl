import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import './AccessoriesReport.css';

const AccessoriesReport = () => {
    const [accessories, setAccessories] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/api/accessories/')
            .then(response => {
                setAccessories(response.data);
            })
            .catch(error => console.error('Error fetching accessories:', error));
    }, []);

    const handleEdit = (index) => {
        setEditIndex(index);
        setFormData(accessories[index]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        axios.put('http://localhost:8080/api/accessories/update', formData)
            .then(response => {
                const updatedAccessories = accessories.map((accessory, index) =>
                    index === editIndex ? response.data : accessory
                );
                setAccessories(updatedAccessories);
                setEditIndex(null);
                setFormData({ name: '', price: '', description: '', image: '' });
            })
            .catch(error => console.error('Error updating accessory:', error));
    };

    const handleAdd = () => {
        if (!validateForm()) return;

        axios.post('http://localhost:8080/api/accessories/create', formData)
            .then(response => {
                setAccessories([...accessories, response.data]);
                setFormData({ name: '', price: '', description: '', image: '' });
            })
            .catch(error => console.error('Error adding accessory:', error));
    };

    const handleDelete = (index) => {
        const id = accessories[index].id;
        axios.delete(`http://localhost:8080/api/accessories/delete/${id}`)
            .then(() => {
                setAccessories(accessories.filter((_, i) => i !== index));
            })
            .catch(error => console.error('Error deleting accessory:', error));
    };

    return (
        <div className="adminaccessories-container">
            <AdminSidebar />
            <div className="adminaccessories-main">
                <h1 className='ca'>Car Accessories Reports</h1>
                <div className="adminaccessories-grid">
                    {accessories.map((accessory, index) => (
                        <div key={index} className="adminaccessories-card">
                            <img src={accessory.image} alt={accessory.name} className="adminaccessories-image" />
                            <h2>{accessory.name}</h2>
                            <p>Price: ${accessory.price}</p>
                            <p>{accessory.description}</p>
                            <div className="adminaccessories-buttons">
                                <button onClick={() => handleEdit(index)} className="edit">Edit</button>
                                <button onClick={() => handleDelete(index)} className="delete">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                {editIndex !== null && (
                    <div className="adminaccessories-form">
                        <h2>Edit Accessory</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                            {errors.price && <span className="error">{errors.price}</span>}
                        </label>
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                            {errors.description && <span className="error">{errors.description}</span>}
                        </label>
                        <button onClick={handleSave} className="save">Save</button>
                    </div>
                )}
                <div className="adminaccessories-form">
                    <h2>Add New Accessory</h2>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        {errors.price && <span className="error">{errors.price}</span>}
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                        {errors.description && <span className="error">{errors.description}</span>}
                    </label>
                    <button onClick={handleAdd} className="add">Add</button>
                </div>
            </div>
        </div>
    );
};

export default AccessoriesReport;



























// W I T H O U T | V A L I D A T I O N | C O D E |


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AdminSidebar from './AdminSidebar';
// import './AccessoriesReport.css';

// const AccessoriesReport = () => {
//     const [accessories, setAccessories] = useState([]);
//     const [editIndex, setEditIndex] = useState(null);
//     const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '' });

//     useEffect(() => {
        
//         axios.get('http://localhost:8080/api/accessories/')
//             .then(response => {
//                 setAccessories(response.data);
//             })
//             .catch(error => console.error('Error fetching accessories:', error));
//     }, []);

//     const handleEdit = (index) => {
//         setEditIndex(index);
//         setFormData(accessories[index]);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSave = () => {
//         axios.put('http://localhost:8080/api/accessories/update', formData)
//             .then(response => {
//                 const updatedAccessories = accessories.map((accessory, index) =>
//                     index === editIndex ? response.data : accessory
//                 );
//                 setAccessories(updatedAccessories);
//                 setEditIndex(null);
//             })
//             .catch(error => console.error('Error updating accessory:', error));
//     };

//     const handleAdd = () => {
//         axios.post('http://localhost:8080/api/accessories/create', formData)
//             .then(response => {
//                 setAccessories([...accessories, response.data]);
//                 setFormData({ name: '', price: '', description: '', image: '' });
//             })
//             .catch(error => console.error('Error adding accessory:', error));
//     };

//     const handleDelete = (index) => {
//         const id = accessories[index].id;
//         axios.delete(`http://localhost:8080/api/accessories/delete/${id}`)
//             .then(() => {
//                 setAccessories(accessories.filter((_, i) => i !== index));
//             })
//             .catch(error => console.error('Error deleting accessory:', error));
//     };

//     return (
//         <div className="adminaccessories-container">
//             <AdminSidebar />
//             <div className="adminaccessories-main">
//                 <h1 className='ca'>Car Accessories Reports</h1>
//                 <div className="adminaccessories-grid">
//                     {accessories.map((accessory, index) => (
//                         <div key={index} className="adminaccessories-card">
//                             <img src={accessory.image} alt={accessory.name} className="adminaccessories-image" />
//                             <h2>{accessory.name}</h2>
//                             <p>Price: ${accessory.price}</p>
//                             <p>{accessory.description}</p>
//                             <div className="adminaccessories-buttons">
//                                 <button onClick={() => handleEdit(index)} className="edit">Edit</button>
//                                 <button onClick={() => handleDelete(index)} className="delete">Delete</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 {editIndex !== null && (
//                     <div className="adminaccessories-form">
//                         <h2>Edit Accessory</h2>
//                         <label>
//                             Name:
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                             />
//                         </label>
//                         <label>
//                             Price:
//                             <input
//                                 type="number"
//                                 name="price"
//                                 value={formData.price}
//                                 onChange={handleChange}
//                             />
//                         </label>
//                         <label>
//                             Description:
//                             <textarea
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                             ></textarea>
//                         </label>
//                         <button onClick={handleSave} className="save">Save</button>
//                     </div>
//                 )}
//                 <div className="adminaccessories-form">
//                     <h2>Add New Accessory</h2>
//                     <label>
//                         Name:
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label>
//                         Price:
//                         <input
//                             type="number"
//                             name="price"
//                             value={formData.price}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label>
//                         Description:
//                         <textarea
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                         ></textarea>
//                     </label>
//                     <button onClick={handleAdd} className="add">Add</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AccessoriesReport;
