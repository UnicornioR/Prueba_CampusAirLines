import { getDataAll,searchDataById,opc } from '../../Apis/customer-api.js';

export class CustomerLista extends HTMLElement{
    idUsr=0;
    constructor(){
        super();
        this.render();
        this.requestApiGetCliente();
        this.abrirModal();
        
    }
    render(){
        this.innerHTML = /* html */ `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Número de identificación</th>    
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>País de origen</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Ciudad de origen</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="lista-clientes">

                </tbody>
            </table>
            <div class="modal fade " id="putCliente" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Clientes</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="card">
                                        <h5 class="card-header">Registro de clientes</h5>
                                        <div class="card-body">
                                            <div class="container">
                                                <div class="row g-3">
                                                    <div class="col-12">
                                                        <form id = "frmData">
                                                            <div class="row g-3">
                                                                <div class="col-3">
                                                                    <label for="cc" class="form-label">Número de identificación</label>
                                                                    <input type="text" class="form-control" id="cc" name="cc">
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="nombres" class="form-label">Nombres</label>
                                                                    <input type="text" class="form-control" id="nombres" name="nombres">                  
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="apellidos" class="form-label">Apellidos</label>
                                                                    <input type="text" class="form-control" id="apellidos" name="apellidos">                  
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="telefono" class="form-label">Teléfono</label>
                                                                    <input type="text" class="form-control" id="telefono" name="telefono">                  
                                                                </div>
                                                            </div>
                                                            <div class="row g-3">
                                                                <div class="col-3">
                                                                    <label for="email" class="form-label">Correo electrónico</label>
                                                                    <input type="email" class="form-control" id="email" name="email">
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="paisorg" class="form-label">País de origen</label>
                                                                    <input type="text" class="form-control" id="paisorg" name="paisorg">                  
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="fechanac" class="form-label">Fecha de nacimiento</label>
                                                                    <input type="date" class="form-control" id="fechanac" name="fechanac">                  
                                                                </div>
                                                                <div class="col-3">
                                                                    <label for="ciudadorg" class="form-label">Ciudad de origen</label>
                                                                    <input type="text" class="form-control" id="ciudadorg" name="ciudadorg">                  
                                                                </div>                    
                                                                <div class="container mt-4 text-center" >
                                                                    <input type="submit" data-accion="PUT" class="btn btn-warning" value="Editar">
                                                                </div>
                                                            </div>
                                                        </form>                         
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                    </div>
                </div>
            </div>        
        `
    }

    abrirModal = () =>{
        var myModal = document.querySelector('#putCliente')
        myModal.addEventListener('shown.bs.modal', function () {
            //myInput.focus()
        })
    }
    requestApiGetCliente = () =>{
        getDataAll()
            .then((result)=>{
                this.renderClientes(result);
            })
    }
    renderClientes = (clientes)=>{
        let clientesHTML = '';
        for(let cliente of clientes){
            clientesHTML += this.crearListaClientesHTML(cliente);
        }
        document.getElementById('lista-clientes').innerHTML = clientesHTML;
        this.callModal();
        this.putData();
    }
    crearListaClientesHTML = (clientes)=>{
        let listaHTML = /* html */ `
        <tr>
            <td>${clientes.id}</td>
            <td>${clientes.cc}</td>
            <td>${clientes.nombres}</td>
            <td>${clientes.apellidos}</td>
            <td>${clientes.telefono}</td>
            <td>${clientes.email}</td>
            <td>${clientes.paisorg}</td>
            <td>${clientes.fechanac}</td>
            <td>${clientes.ciudadorg}</td>
            <td>
                <a class="btn btn-success " data-bs-toggle="modal" data-bs-target="#putCliente" id="putData" data-idcli='${clientes.id}'><i class='bx bx-edit-alt icono' data-idcli='${clientes.id}'></i></a>
                <a class="btn btn-danger" data-idclidel='${clientes.id}'><i class='bx bx-message-alt-x icono'></i></a>
            </td>
        </tr>
        `;
        return listaHTML;
    }
    callModal = () =>{
        document.querySelectorAll('#putData').forEach((item,id) =>{
            item.addEventListener("click",(e) =>{
                this.idUsr=e.target.dataset.idcli;
                this.requestApiGetClienteById(e.target.dataset.idcli);
                e.stopImmediatePropagation();
                e.preventDefault();
            })
        })

    }
    requestApiGetClienteById = (id) =>{
        searchDataById(id)
            .then((result)=>{
                this.loadDataFrm(result);
            })
    }
    loadDataFrm(data){        
        const myForm = document.querySelector("#frmData");
        const {cc,nombres,apellidos,email,telefono,fechanac,paisorg,ciudadorg,id} = data;
        const frm = new FormData(myForm);
        frm.set("cc",cc);
        frm.set("nombres",nombres);
        frm.set("apellidos",apellidos);
        frm.set("telefono",telefono);
        frm.set("email",email);
        frm.set("paisorg",paisorg);
        frm.set("fechanac",fechanac);
        frm.set("ciudadorg",ciudadorg);

        // Itera a través de los pares clave-valor de los datos
        for (var pair of frm.entries()) {
            // Establece los valores correspondientes en el formulario
            myForm.elements[pair[0]].value = pair[1];
        }

    }
    putData = (id) =>{
        let myForm = document.querySelector("#frmData");
        myForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            opc[e.submitter.dataset.accion](data,this.idUsr);  
        })
    }

}
customElements.define("customer-lista",CustomerLista);