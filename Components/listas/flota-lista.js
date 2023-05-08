import { getDataAll,searchDataById,opc } from '../../Apis/flota-api.js';

export class FlotaLista extends HTMLElement{
    idUsr=0;
    constructor(){
        super();
        this.render();
        this.requestApiGetFlota();
        this.abrirModal();
        
    }
    render(){
        this.innerHTML = /* html */ `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Número de aeronave</th>    
                        <th>Cantidad de pasajeros</th>
                        <th>Fecha de compra</th>
                        <th>Valor de compra</th>
                        <th>Número de matrícula</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="lista-flota">

                </tbody>
            </table>
            <div class="modal fade " id="putFlota" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Flotas Aéreas</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="card">
                                        <h5 class="card-header">Registro de flotas aéreas</h5>
                                        <div class="card-body">
                                            <div class="container">
                                                <div class="row g-3">
                                                    <div class="col-12">
                                                        <form id = "frmData2">
                                                            <div class="row g-3">
                                                                <div class="col-4">
                                                                    <label for="na" class="form-label">Número de aeronave</label>
                                                                    <input type="text" class="form-control" id="na" name="na">
                                                                </div>
                                                                <div class="col-4">
                                                                    <label for="cpasajeros" class="form-label">Cantidad de pasajeros</label>
                                                                    <input type="text" class="form-control" id="cpasajeros" name="cpasajeros">                  
                                                                </div>
                                                                <div class="col-4">
                                                                    <label for="fechac" class="form-label">Fecha de compra</label>
                                                                    <input type="date" class="form-control" id="fechac" name="fechac">                  
                                                                </div>
                                                            </div>
                                                            <div class="row g-3">
                                                                <div class="col-6">
                                                                    <label for="vc" class="form-label">Valor compra</label>
                                                                    <input type="number" class="form-control" id="vc" name="vc">
                                                                </div>
                                                                <div class="col-6">
                                                                    <label for="nm" class="form-label">Número de matrícula</label>
                                                                    <input type="text" class="form-control" id="nm" name="nm">                  
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
        var myModal = document.querySelector('#putFlota')
        myModal.addEventListener('shown.bs.modal', function () {
            //myInput.focus()
        })
    }
    requestApiGetFlota = () =>{
        getDataAll()
            .then((result)=>{
                this.renderFlotas(result);
            })
    }
    renderFlotas = (flotas)=>{
        let flotasHTML = '';
        for(let flota of flotas){
            flotasHTML += this.crearListaFlotasHTML(flota);
        }
        document.getElementById('lista-flota').innerHTML = flotasHTML;
        this.callModal();
        this.putData();
    }
    crearListaFlotasHTML = (flotas)=>{
        let listaHTML = /* html */ `
        <tr>
            <td>${flotas.id}</td>
            <td>${flotas.na}</td>
            <td>${flotas.cpasajeros}</td>
            <td>${flotas.fechac}</td>
            <td>${flotas.vc}</td>
            <td>${flotas.nm}</td>
            <td>
                <a class="btn btn-success " data-bs-toggle="modal" data-bs-target="#putCliente" id="putData" data-idcli='${flotas.id}'><i class='bx bx-edit-alt icono' data-idcli='${flotas.id}'></i></a>
                <a class="btn btn-danger" data-idclidel='${flotas.id}'><i class='bx bx-message-alt-x icono'></i></a>
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
        const myForm2 = document.querySelector("#frmData2");
        const {na,cpasajeros,fechac,vc,nm,id} = data;
        const frm = new FormData(myForm2);
        frm.set("na",na);
        frm.set("cpasajeros",cpasajeros);
        frm.set("fechac",fechac);
        frm.set("vc",vc);
        frm.set("nm",nm);

        // Itera a través de los pares clave-valor de los datos
        for (var pair of frm.entries()) {
            // Establece los valores correspondientes en el formulario
            myForm2.elements[pair[0]].value = pair[1];
        }

    }
    putData = (id) =>{
        let myForm2 = document.querySelector("#frmData2");
        myForm2.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            opc[e.submitter.dataset.accion](data,this.idUsr);  
        })
    }

}
customElements.define("flota-lista",FlotaLista);