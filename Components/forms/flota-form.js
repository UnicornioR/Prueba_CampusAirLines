//Formulario de registro de flotas de aviones
import { postData,putData,opc } from '../../Apis/flota-api.js';
export class FlotaForm extends HTMLElement{

    constructor(){
        super();
        this.render();

    }
    render() {
        this.innerHTML = /* html */`
        <div class="card">
            <h5 class="card-header">Registro de aeronaves</h5>
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
                                        <input type="submit2" data-accion="POST" class="btn btn-primary" value="Guardar Flotas">
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
        let myForm2 = document.querySelector("#frmData2");
        myForm2.addEventListener("submit2", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            opc[e.submitter.dataset.accion](data)    
        })
    }
}
customElements.define("flota-form",FlotaForm);