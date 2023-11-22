import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react';
import PopupsController from '../common/PopupsController';
import RestaurantsMap from './RestaurantsMap';
// import ErrorAlert from '../../components/alerts/errorAlert';

export default function SearchRestaurant(){
    // const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    function openModal(){
        setModalOpen(true);   
    }

    function closeModal(){
        setModalOpen(false);
    }

    const validationSchema = Yup.object({
        searchKeyword: Yup.string().required('search keyword is required!')
    });

    function search(values){
        axios.post('http://localhost:3000/api/searchRestaurants', {
            searchKeyword : values.searchKeyword
        })
        .then(function(response){
            console.log(response.data);
        })
        .catch((error)=>{
            console.error(error);
        })
        
    }

    return (
        <Formik
            initialValues={{
                searchKeyword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={search}
        >
            
            {() => (
                <Form className="flex flex-col lg:flex-row w-auto m-auto">
                    {/* {errorMessage && <ErrorAlert message={errorMessage} />} */}
                    <div className='flex flex-col'>
                        <Field 
                            id = "searchKeyword"
                            name="searchKeyword"
                            type="text"
                            placeholder="restaurant name or cuisine type"
                        />
                        <ErrorMessage name="searchKeyword" component="div"/>
                    </div>
                    <div className=''>
                        <button onClick={openModal}>Search by Map</button>
                        <PopupsController 
                            showModal={isModalOpen} 
                            closeModal={closeModal} 
                            bodyContent={<RestaurantsMap/>} 
                            headerContent={"Choose a Restaurant on Map"}
                        />
                    </div>

                    <button type='submit' className=' text-white bg-brand transform-none'>Search</button>
                </Form>
            )}
        </Formik>
    );
}

