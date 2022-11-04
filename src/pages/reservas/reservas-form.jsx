import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/base/api";
import Form from 'react-bootstrap/Form';
import { ReservasService } from '../../services/reservas-service';
import swal from 'sweetalert';

const ReservasForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.id) {
      formik.setValues(location.state);
    }
  },[])

  const CadastrarReserva = async (loginForm) => {
    try {
      await api.post("/v1/reservas", loginForm);
      navigate("/reservas");
    } catch (err) {
        swal("Falha ao tentar criar reserva", {
            icon: "danger",
        });
    }
  };

  const EditarReserva = async (reserva) => {
    try {
      await ReservasService.update(location?.state?.id, reserva)
      navigate("/reservas");
    } catch (err) {
        swal("Falha ao tentar alterar reserva", {
            icon: "danger",
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      local: '',
      sala: '',
      dataHorainicio:'',
      dataHoraFinal:'',
      responsavel:'',
      cafe: false,
      descricao: ''
    },
    validationSchema: Yup.object({
      local: Yup.string()
      .required('Campo Obrigatório'),
      sala: Yup.string()
      .required('Campo Obrigatório'),
      dataHorainicio: Yup.string()
      .required('Campo Obrigatório'),
      dataHoraFinal: Yup.string()
      .required('Campo Obrigatório'),
      responsavel: Yup.string()
      .required('Campo Obrigatório'),
      descricao: Yup.string()
      .required('Campo Obrigatório'),
    }),
    onSubmit: values => {
        if(location?.state?.id) {
            EditarReserva(values)
        } else {
            CadastrarReserva(values);
        }
    },
  });

    return(
      <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Cadastro de Reserva</h5>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                  <input 
                  name="local"
                  type="text" 
                  className="form-control" 
                  placeholder="Local" 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.local}/>
                  <label for="floatingInput">Local</label>
                  {formik.touched.local && formik.errors.local ? (
                    <div>{formik.errors.local}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-3">
                  <input 
                    type="text"
                    name="sala" 
                    className="form-control" 
                    id="floatingSala" 
                    placeholder="Sala"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sala}
                  />
                  <label for="floatingSala">Sala</label>
                  {formik.touched.sala && formik.errors.sala ? (
                    <div>{formik.errors.sala}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-3">
                  <input 
                    type="datetime-local"
                    name="dataHorainicio" 
                    className="form-control" 
                    id="floatingdataHoraInicio" 
                    placeholder="Sala"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dataHorainicio}
                  />
                  <label for="floatingdataHoraInicio">Data Início</label>
                  {formik.touched.dataHorainicio && formik.errors.dataHorainicio ? (
                    <div>{formik.errors.dataHorainicio}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-3">
                  <input 
                    type="datetime-local"
                    name="dataHoraFinal" 
                    className="form-control" 
                    id="floatingdataHoraFinal" 
                    placeholder="Data Fim"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dataHoraFinal}
                  />
                  <label for="floatingdataHoraFinal">Data Fim</label>
                  {formik.touched.dataHoraFinal && formik.errors.dataHoraFinal ? (
                    <div>{formik.errors.dataHoraFinal}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-3">
                  <input 
                    type="text"
                    name="responsavel" 
                    className="form-control" 
                    id="floatingResponsavel" 
                    placeholder="Sala"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.responsavel}
                  />
                  <label for="floatingResponsavel">Responsavel</label>
                  {formik.touched.responsavel && formik.errors.responsavel ? (
                    <div>{formik.errors.responsavel}</div>
                  ) : null}
                </div>
                <div className="form-floating mb-3">
                  <Form.Check type="checkbox" label="Café" name="cafe" />
                </div>
                <div className="form-floating mb-3">
                  <input 
                    type="text"
                    name="descricao" 
                    className="form-control" 
                    id="floatingDescricao" 
                    placeholder="Descrição"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.descricao}
                  />
                  <label for="floatingDescricao">Descrição</label>
                  {formik.touched.descricao && formik.errors.descricao ? (
                    <div>{formik.errors.descricao}</div>
                  ) : null}
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default ReservasForm;