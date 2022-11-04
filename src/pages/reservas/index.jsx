import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { ReservasService } from '../../services/reservas-service';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import swal from 'sweetalert';

export const Reservas = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    ListarReservas();
  },[]);

  const ListarReservas = async () => {
    try {
      const response = await ReservasService.getAll();
      setReservas(response.data)
      navigate("/reservas");
    } catch (err) {
        swal("Falha ao tentar listar reservas", {
            icon: "danger",
        });
    }
  };

  const RemoverReserva = async (id) => {
    try {
        swal({
            title: "Tem certeza?",
            text: "Uma vez excluído, não será possível recuperar o registro!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                (async () => {
                    await ReservasService.delete(id);
                    ListarReservas();
                    swal("Reserva removida com sucesso", {
                        icon: "success",
                    });
                })();
            }
          });

    } catch (err) {
        swal("Falha ao tentar remover reserva", {
            icon: "danger",
        });
    }
  };

  const EditarReserva = async (reserva) => {
    navigate("/home", { state: reserva });
  }

  return(
    <div className="container">
    <div className="row">
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto w-100">
    <h5 className="card-title text-center mb-5 fw-light fs-5">Listar Reservas</h5>
    <Table striped bordered hover>
    <thead>
        <tr>
        <th>#</th>
        <th>Local</th>
        <th>Sala</th>
        <th>Data Inicio</th>
        <th>Data Fim</th>
        <th>Responsavel</th>
        <th>Cafe</th>
        <th>Descrição</th>
        <th>Acao</th>
        </tr>
    </thead>
    <tbody>
        {reservas.map(reserva => {
        return( 
        <tr>
            <td>{reserva?.id}</td>
            <td>{reserva?.local}</td>
            <td>{reserva?.sala}</td>
            <td>{reserva?.dataHorainicio}</td>
            <td>{reserva?.dataHoraFinal}</td>
            <td>{reserva?.responsavel}</td>
            <td>{reserva?.cafe.toString()}</td>
            <td>{reserva?.descricao}</td>
            <td>
                <span className='custom-icon'><AiOutlineEdit onClick={() => EditarReserva(reserva)} /></span>
                <span className='custom-icon' onClick={() => RemoverReserva(reserva?.id)}><AiOutlineDelete/></span>
            </td>
        </tr>)
        })}
    </tbody>
    </Table>
    </div>
    </div>
    </div>
    )
}