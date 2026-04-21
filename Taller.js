//Datos básicos


let nombreCompleto = "";
let edad = 0; // Cambiado a 0 para que sea un número
let tipoDeDocumento = "";
let numeroDeDocumento = ""; // Sin tildes y corregido


//Validación de perfil

if (edad < 18) 
if (edad > 17 & <25)
if (edad >24 & <60)
if (edad >59)    


//Información salarial

let salarioSueldo = 0;  
let comisiones = 0;          
let totalHorasExtra = 0;      
let nivelRiesgo = "";       



//Constantes
const salarioMinimoLegalVigente = 1750905;
const salarioMinimoIntegralVigente = 22761765;
const subsidioDeTransporte = 249095; 
const uvt = 52.37;
const pSalud = 0.04;
const pPension = 0.04;
const riesgo1 = 0.522; 
const riesgo2 = 1.044;
const riesgo3 = 2.436;
const riesgo4 = 4.350;
const riesgo5 = 6.960;
const fondoDeSolidaridadPensional = 0.01;



//if y else
if (edad < 18) { }
else if (edad >= 18 && edad < 25) { }
else if (edad >= 25 && edad <= 60) { }
let porcentajePensionAplicable = edad > 60 ? pPension : 0; 

// --- punto4 --
let factorIbc = 1; //valor temporal
let calculoIbc = factorIbc * (salario + comisiones + totalHorasExtra);

let auxilioTransporte = 0;
if (salario <= (salarioMinimoLegalVigente * 2)) 
{auxilioTransporte = 162000; }

let valorPension = calculoIbc * pPension;

// Fondo solidario
let fondoSolidaridad = 0;
// calculoIbc
if (calculoIbc >= (salarioMinimoLegalVigente * 4)) {
    fondoSolidaridad = calculoIbc * fondoDeSolidaridadPensional;
}

// calculo salud
let valorSalud = calculoIbc * pSalud;
if (fondoSolidaridad > 0) { 
    valorSalud = 162000; // Valor de referencia
}

let arl = calculoIbc * (nivelDeRiesgo / 100);

//Function
function calcularPorcentaje(base, porcentaje) { 
    let calculo = base * porcentaje; // Operador matemático
    return calculo; // Sintaxis de return
}
