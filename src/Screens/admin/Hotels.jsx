import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Button, Spinner, Tooltip } from "flowbite-react";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineHotel } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ModalHotelero from '../hotelero/ModalHotelero';
import { URL } from '../../ip';

const Hoteles = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };
    const { userId } = useParams();

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleDeleteHotel = (hotelId) => {
        const token = localStorage.getItem('token');

        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(URL+`api/hotel/delete/${hotelId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            setHotels(prevHotels => prevHotels.filter(hotel => hotel.hotelId !== hotelId));
                            Swal.fire('Hotel eliminado', '', 'success');
                        } else {
                            throw new Error('Failed to delete hotel');
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting hotel:', error);
                        Swal.fire('Error', 'No se pudo eliminar el hotel', 'error');
                    });
            }
        });
    };



    useEffect(() => {
        const token = localStorage.getItem('token');
        // const userId = localStorage.getItem('userId');
        fetch(URL+`api/hotel/findByUser/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
                if (data.data) {
                    setHotels(data.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching hotels:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ maxWidth: '1000px' }}>
            {loading ? (
                <Spinner aria-label="Default status example" />
            ) : hotels.length === 0 ? (
                <div>
                    <p>Este usuario no tiene hoteles registrados. Porfavor registra uno.</p>
                    <img src="https://cdn.dribbble.com/users/1121009/screenshots/5227139/dribbble_5.jpg" alt="" className='h-72' />

                </div>

            ) : (
                <Carousel
                    swipeable={true}
                    showDots={true}
                    responsive={responsive}
                    infinite={true}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={"desktop"}
                    dotListClass="custom-dot-list-style"
                    className='ml-10 mt-10'
                >
                    {hotels.map(hotel => (
                        <div key={hotel.hotelId} className="flex-shrink-0 flex-grow-0" style={{ width: '300px' }}>
                            <div className="rounded-lg bg-white shadow-lg mb-10" style={{ height: 450 }}>
                                <a href="#!">
                                    <img className="rounded-t-lg h-48 w-full object-cover object-center"
                                        src={hotel.images.length > 0 ? `data:image/png;base64,${hotel.images[0].image}` : 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,f_auto,h_190,q_auto,w_240//hotelier-images/bc/24/4ba8a4f49a0f4e116088cfe3525bd427ddb55aca65b792284b03112dd011.jpeg'}
                                        alt="" />
                                </a>
                                <div className="p-6 text-surface dark:text-white">
                                    <h5 className="mb-2 text-xl font-medium leading-tight">{hotel.hotelName}</h5>
                                    <p className="mb-4 text-base" style={{ maxHeight: '72px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hotel.description}</p>
                                    <p className="mb-4 text-base">{hotel.address}</p>
                                    <div className='flex flex-wrap justify-center space-x-2'>
                                        

                                        
                                        <Tooltip content="Editar" placement="top" className="tooltip-centered">
                                            <Link to={`/editarHotel/${hotel.hotelId}`}>
                                                <Button color="warning" size="xs" outline pill>
                                                    <CiEdit className="h-6 w-6" />
                                                </Button>
                                            </Link>
                                        </Tooltip>
                                        <Tooltip content="Eliminar" placement="top" className="tooltip-centered">
                                            <Button color="failure" size="xs" outline pill onClick={() => handleDeleteHotel(hotel.hotelId)}>
                                                <FaRegTrashAlt className="h-6 w-6" />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            )
            }
        </div >
    );
};

export default Hoteles;
