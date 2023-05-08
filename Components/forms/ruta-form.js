//Formulario de registro de rutas aéreas
import { postData,putData,opc } from '../../Apis/ruta-api.js';
export class RutaForm extends HTMLElement{

    constructor(){
        super();
        this.render();

    }
    render() {
        this.innerHTML = /* html */`
        <div class="card">
            <h5 class="card-header">Registro de rutas aéreas</h5>
            <div class="card-body">
                <div class="container">
                    <div class="row g-3">
                        <div class="col-12">
                            <form id = "frmData">
                                <div class="row g-3">
                                    <div class="col-4">
                                        <label for="nr" class="form-label">Nombre de ruta</label>
                                        <input type="text" class="form-control" id="nr" name="nr">
                                    </div>
                                    <div class="col-4">
                                        <label for="ciudadorg" class="form-label">Ciudad origen</label>
                                        <input type="text" class="form-control" id="ciudadorg" name="ciudadorg">                  
                                    </div>
                                    <div class="col-4">
                                        <label for="ciudaddes" class="form-label">Cuidad destino</label>
                                        <input type="text" class="form-control" id="ciudaddes" name="ciudaddes">                  
                                    </div>

                                </div>
                                <div class="row g-3">
                                    <div class="col-6">
                                        <label for="tmr" class="form-label">Total de millas de la ruta</label>
                                        <input type="text" class="form-control" id="tmr" name="tmr">
                                    </div>
                                    <div class="col-6">
                                        <label for="vmr" class="form-label">Valor de la milla por ruta</label>
                                        <input type="text" class="form-control" id="vmr" name="vmr">                  
                                    </div>
                                    <div class="container mt-4 text-center" >
                                        <input type="submit" data-accion="POST" class="btn btn-primary" value="Guardar Ruta Aérea">
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
customElements.define("ruta-form",RutaForm);