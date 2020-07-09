const ramos = [
    {
        ramo: "progra",
        notas: [55, 45, 65],
    },
    {
        ramo: "calculo",
        notas: [60],
    },
]

function agregarRamo(){
    const nombreRamoX = document.querySelector("#texto").value;
    ramos.push({
        ramo: nombreRamoX,
        notas: []
    })
    agregarHtml();
}

function calcularPromedio(notas) {
    largo = notas.length;
    var sumatoria = 0;
    for (let i = 0; i < largo; i++) {
        sumatoria += notas[i];
    }
    producto = sumatoria/ largo;
    return producto;
}

function agregarNota(nombreRamo){
    const posicion = ramos.findIndex(ramo => ramo.ramo == nombreRamo);
    const nota = document.querySelectorAll("#contenedor")[posicion].querySelector("input").value;
    ramos[posicion].notas.push(parseInt(nota));
    agregarHtml()
}

function mostrarRamos(nombreRamo, notas){
    return `
        <div id="contenedor">
            <h4>${nombreRamo}</h4>
            <ul>${notas.map(nota => `<li>${nota}</li>`)}</ul>
            <input type="text" placeholder="inserte nota">
            <button onClick="agregarNota('${nombreRamo}')">agregar nota</button>
            <h6>${calcularPromedio(notas)}</h6>
        </div>
    `
}

function agregarHtml(){
    const resultado = ramos.map((asignaturas) => {
        return mostrarRamos(asignaturas.ramo, asignaturas.notas);
    })

    const llamar = document.querySelector("#listaContenedores");
    llamar.innerHTML = resultado.join("\n");
}

agregarHtml()