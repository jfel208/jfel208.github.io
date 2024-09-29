let saldoCredito = 1000;
let saldoDebito = 500;

const tasaInteresMensual = 0.021; // 2.1%
const tasaInteresAnual = 0.26; // 26%

let gastos = [];
let presupuesto;

function mostrarSimulacion(tipo) {
    document.getElementById("formCredito").style.display = tipo === 'credito' ? 'block' : 'none';
    document.getElementById("formDebito").style.display = tipo === 'debito' ? 'block' : 'none';
    document.getElementById("marcoTeorico").style.display = 'none';
}

function mostrarMarcoTeorico() {
    document.getElementById("marcoTeorico").style.display = 'block';
    document.getElementById("formCredito").style.display = 'none';
    document.getElementById("formDebito").style.display = 'none';
}

function procesarCredito() {
    let montoCompra = parseFloat(document.getElementById("credito-monto").value.replace(/\./g, '').replace('$', '').replace(',', '.'));
    let numeroCuotas = parseInt(document.getElementById("credito-cuotas").value);
    
    // Validación de valores
    if (montoCompra < 10000 || montoCompra > 4900000) {
        alert("El valor de la compra debe estar entre $10,000 y $4,900,000.");
        return;
    }
    
    if (numeroCuotas < 1 || numeroCuotas > 36) {
        alert("El número de cuotas debe ser entre 1 y 36.");
        return;
    }

    // Cálculo de cuotas
    let cuotaMensual = (montoCompra * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -numeroCuotas));
    
    // Formatear números grandes
    const formatearNumero = (num) => {
        return `$${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    };

    document.getElementById("resultado").innerHTML = 
        `Por una compra de ${formatearNumero(montoCompra)}, ` +
        `se tendrían que pagar ${numeroCuotas} cuotas de ${formatearNumero(cuotaMensual)}.`;
}

function agregarGasto() {
    let gasto = parseFloat(document.getElementById("gasto").value.replace(/\./g, '').replace('$', '').replace(',', '.'));
    let categoria = document.getElementById("categoria").value;

    // Validación de gastos
    if (isNaN(gasto) || gasto < 1) {
        alert("Por favor, ingresa un gasto válido.");
        return;
    }
    
    if (gasto > presupuesto) {
        alert("Los gastos no pueden ser mayores al presupuesto.");
        return;
    }

    // Agregar gasto
    gastos.push({ gasto, categoria });
    mostrarGastos();
}

function mostrarGastos() {
    let listaGastos = document.getElementById("lista-gastos");
    listaGastos.innerHTML = "";
    gastos.forEach((item, index) => {
        listaGastos.innerHTML += `<div>Gasto: $${item.gasto.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} - Categoría: ${item.categoria}</div>`;
    });
}

function totalDinero() {
    if (presupuesto === undefined) {
        alert("Por favor, establece un presupuesto antes de calcular el dinero restante.");
        return;
    }

    let totalGastos = gastos.reduce((total, item) => total + item.gasto, 0);
    let dineroRestante = presupuesto - totalGastos;

    alert(`Dinero restante en la tarjeta después de los gastos: $${dineroRestante.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`);
}

document.getElementById("debito-presupuesto").addEventListener("change", function () {
    presupuesto = parseFloat(this.value.replace(/\./g, '').replace('$', '').replace(',', '.'));
    if (presupuesto < 10000 || presupuesto > 4900000) {
        alert("El presupuesto debe estar entre $10,000 y $4,900,000.");
        this.value = '';
        presupuesto = undefined;
    }
});
