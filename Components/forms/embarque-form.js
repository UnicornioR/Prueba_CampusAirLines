//Formulario de registro del embarque de pasajeros
import { postData,putData,opc } from '../../Apis/embarque-api.js';
export class EmbarqueForm extends HTMLElement{

    constructor(){
        super();
        this.render();

    }
    render() {
        this.innerHTML = /* html */`
        <div class="card">
            <h5 class="card-header">Registro de pasajero</h5>
            <div class="card-body">
                <div class="container">
                    <div class="row g-3">
                        <div class="col-12">
                            <form id = "frmData">
                                <div class="row g-3">
                                    <div class="col-4">
                                        <label for="cc" class="form-label">Número de cédula</label>
                                        <input type="text" class="form-control" id="cc" name="cc">
                                    </div>
                                    <div class="col-4">
                                        <label for="fvuelo" class="form-label">Fecha</label>
                                        <input type="fecha" class="form-control" id="fvuelo" name="fvuelo">                  
                                    </div>
                                    <div class="col-4">
                                        <label for="nvuelo" class="form-label">Número de vuelo</label>
                                        <input type="text" class="form-control" id="nvuelo" name="nvuelo">                  
                                    </div>
                                </div>
                                <div class="row g-3">
                                    <div class="container mt-4 text-center" >
                                        <input type="submit" data-accion="POST" class="btn btn-primary" value="Guardar Pasajero">
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
customElements.define("embarque-form",EmbarqueForm);