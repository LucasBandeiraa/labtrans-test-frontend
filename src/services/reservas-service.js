import api from "./base/api";

export class ReservasService {

    static getAll() {
        return api.get("/v1/reservas");
    }

    static update(id, reserva){
        return api.put(`/v1/reservas/${id}`, reserva);
    }

    static delete(id){
        return api.delete(`/v1/reservas/${id}`);
    }

    static add(reserva){
        return api.post(`/v1/reservas`, reserva);
    }
}