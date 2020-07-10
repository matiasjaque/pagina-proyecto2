function obtenerRamos() {
    return JSON.parse(localStorage.getItem("notas")) || [];
}

function actualizarRamos(ramos) {
    return localStorage.setItem("notas", JSON.stringify(ramos));
}

function borrarNota(nombreRamo, posicionNota) {
    if (confirm("¿Desea borrar la nota?")) {
        const ramos = obtenerRamos();
        const posicionRamo = ramos.findIndex(ramo => ramo.ramo == nombreRamo);
        ramos[posicionRamo].notas.splice(posicionNota, 1);
        actualizarRamos(ramos);
        agregarHtml();
    }
}

function agregarRamo(){
    const nombreRamoX = document.querySelector("#texto").value;
    const ramos = obtenerRamos();
    if (document.querySelector("#texto").value != "") {
        ramos.push({
            ramo: nombreRamoX,
            notas: []
        })
        actualizarRamos(ramos);
        agregarHtml();
        document.querySelector("#texto").value = ""
    }
    else
        alert("debe ingresar un ramo o asignatura");
    
}

function calcularPromedio(notas) {
    largo = notas.length;
    var sumatoria = 0;
    if (largo == 0) {
        return sumatoria.toFixed(2);
    }
    for (let i = 0; i < largo; i++) {
        sumatoria += notas[i];
    }
    producto = sumatoria/ largo;
    return parseFloat(producto).toFixed(2);
}

function agregarNota(nombreRamo){
    const ramos = obtenerRamos();
    const posicion = ramos.findIndex(ramo => ramo.ramo == nombreRamo);
    const nota = document.querySelectorAll("#contenedor")[posicion].querySelector("input").value;
    if (nota != "" && nota >= 10 && nota <= 70) {
        ramos[posicion].notas.push(parseInt(nota));
        actualizarRamos(ramos);
        agregarHtml()
    }
    else
        alert("debe ingresar una nota bien no sea won");
}

function mostrarRamos(nombreRamo, notas){
    return `
        <div id="contenedor">
            <h4>${nombreRamo}</h4>
            <ul>${notas.map((nota, posicionNota) => `<li>${nota} <span class="eliminar" onclick="borrarNota('${nombreRamo}', ${posicionNota})">X</span> </li>`).join("\n")}</ul>
            <input type="text" maxlength="2" onkeypress="agregarenter(event, '${nombreRamo}')" placeholder="inserte nota">
            <button onClick="agregarNota('${nombreRamo}')">agregar nota</button>
            <h6>${calcularPromedio(notas)}</h6>
        </div>
    `
}


function agregarenter(event, nombreRamo){
    if (event.keyCode == 13) {
        agregarNota(nombreRamo);
    }
}

function agregar(event){
    if (event.keyCode == 13) {
        agregarRamo();
    }

}

function agregarHtml(){
    const ramos = obtenerRamos();
    const resultado = ramos.map((asignaturas) => {
        return mostrarRamos(asignaturas.ramo, asignaturas.notas);
    })

    const llamar = document.querySelector("#listaContenedores");
    llamar.innerHTML = resultado.join("\n");
}

agregarHtml()