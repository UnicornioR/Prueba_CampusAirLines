//Formulario de compra de tiquetes
import { postData,putData,opc } from '../../Apis/customer-api.js';
export class TiquetesForm extends HTMLElement{

    constructor(){
        super();
        this.render();

    }
    render() {
        this.innerHTML = /* html */`
        
        <div class="card">
            <h5 class="card-header">Cliente Registrado</h5>
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
                                    <div class="container mt-4 text-center" >
                                        <input type="submit" data-accion="POST" class="btn btn-primary" value="Buscar Cliente">
                                    </div>

                                </div>
                            </form>                     
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
        <h5 class="card-header">Cliente No Registrado</h5>
            <div class="card-body">
                <div class="container">
                    <div class="row g-3">
                        <div class="col-12">
                        <form id = "frmData2">
                        <div class="row g-3">
                            <div class="col-4">
                                <label for="nombres" class="form-label">Nombres</label>
                                <input type="text" class="form-control" id="nombres" name="nombres">                  
                            </div>
                            <div class="col-4">
                                <label for="apellidos" class="form-label">Apellidos</label>
                                <input type="text" class="form-control" id="apellidos" name="apellidos">                  
                            </div>
                            <div class="col-4">
                                <label for="email" class="form-label">Correo electrónico</label>
                                <input type="email" class="form-control" id="email" name="email">
                            </div>
                            <div class="container mt-4 text-center" >
                                <input type="submit" data-accion="POST" class="btn btn-primary" value="Guardar Cliente">
                            </div>
                        </div>
                        </form>                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
        <h5 class="card-header">Tiquete</h5>
            <div class="card-body">
                <div class="container">
                    <div class="row g-4">
                        <div class="col-12">
                        <form id = "frmData2">
                        <div class="row g-3">
                            <div class="col-4">
                                <label for="nombres" class="form-label">Nombres</label>
                                <input type="text" class="form-control" id="nombres" name="nombres">                  
                            </div>
                            <div class="col-4">
                                <label for="apellidos" class="form-label">Apellidos</label>
                                <input type="text" class="form-control" id="apellidos" name="apellidos">                  
                            </div>
                            <div class="col-4">
                                <label for="email" class="form-label">Correo electrónico</label>
                                <input type="email" class="form-control" id="email" name="email">
                            </div>
                            <div class="container mt-4 text-center" >
                                <input type="submit" data-accion="POST" class="btn btn-primary" value="Guardar Cliente">
                            </div>
                        </div>
                        </form>                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
        
        <h5 class="card-header">Resumen de compra</h5>
            <div class="card-body">
                <div class="container">
                    <div class="row g-4">
                        <div class="col-12">
                        <form id = "frmData2">
                        <div class="row g-3">
                                <label for="nombres" class="form-label">Valor Tiquete</label>
                                <label for="apellidos" class="form-label">Impuesto 16%</label>
                                <label for="email" class="form-label">Tasa Aeroportuaria 5%</label>
                            </div>
                        </div>
                        </form>                         
                        </div>
                    </div>
                </div>
            </div>
        </div>          
          
          
        `
        this.saveData();
    }
    saveData = () =>{
        let myForm = document.querySelector("#frmData");
        myForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            opc[e.submitter.dataset.accion](data)    
        })
    }
}
customElements.define("tiquetes-form",TiquetesForm);