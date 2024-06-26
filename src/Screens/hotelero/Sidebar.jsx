import { Sidebar } from "flowbite-react";
import { useState } from "react";
import { FaHotel } from "react-icons/fa";
import { HiOutlineLogout, HiOutlineSave } from "react-icons/hi";
import { LiaHotelSolid } from "react-icons/lia";
import { IoMdPersonAdd } from "react-icons/io";
import Swal from 'sweetalert2';


function SidebarComponent() {
    const handleLogout = () => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: '¿Deseas cerrar la sesión?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, cerrar sesión',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('lastname');
            localStorage.removeItem('surname');
            localStorage.removeItem('userId');
            localStorage.removeItem('email');
            localStorage.removeItem('peopleId');
            localStorage.removeItem('hotelName');
            localStorage.removeItem('hotelId');
            window.location.href = '/';
          }
        });
      };
    const name = localStorage.getItem('name');
    const lastname = localStorage.getItem('lastname');
    const surname = localStorage.getItem('surname');
    const email = localStorage.getItem('email');
    return (
        <Sidebar aria-label="Sidebar with logo branding example" className="bg-gray-800 h-screen border-t border-r border-gray-200">
            <Sidebar.Logo href="/homeHotelero" img="https://cdn-icons-png.flaticon.com/512/3009/3009710.png" imgAlt="hameto logo">
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">HOTEL AMETO</span>
            </Sidebar.Logo>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <div className="flex flex-col items-center">
                        <img src="https://i.ibb.co/NsBjwWd/istockphoto-1131164548-612x612.jpg" className="h-24 w-24" />
                        <span className="inline-block text-blue-600 font-bold text-lg">{name} {lastname} {surname}</span>
                        <span>{email}</span>
                    </div>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    
                        <Sidebar.Item href="/homeHotelero" icon={FaHotel}>Gestión de Hoteles</Sidebar.Item>
                </Sidebar.ItemGroup>
                {/* <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={IoMdPersonAdd}>Registrar Hotelero</Sidebar.Item>

                </Sidebar.ItemGroup> */}
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={HiOutlineLogout} onClick={handleLogout} className="text-red-700 hover:bg-red-100">
                        Cerrar sesión
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

export default SidebarComponent;
