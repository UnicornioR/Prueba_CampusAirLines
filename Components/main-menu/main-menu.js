export class MainMenu extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render() {
        this.innerHTML =/* html*/ `
            <!--navBar-->
            <div class="nav-container">
                <nav class="navbar"> <!--menú de navegación-->
                    <nav class="navbar navbar-expand-lg bg-light">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#">
                                <img class="logo" src="img/logoPrincipal-xl.png" alt="">
                            </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link" href="customers.html">Clientes</a>
                                    </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="rutas-aereas.html">Rutas Aéreas</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="flota-aerea.html">Flota Aérea</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="tiquetes.html">Compra de tiquetes</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="embarque.html">Embarque</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="personal.html">Personal</a>
                                        </li>
                                    </ul>
                            </div>
                        </div>
                    </nav>        
                </nav>
            </div>
        `
    }
}
customElements.define("main-menu", MainMenu);