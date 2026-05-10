// Nombre: [Tu nombre aquí] | Documento: [Tu número aquí]

// SECCION 1: VARIABLES DEL USUARIO

let nombre = ""        
let edad = 0              
let tipoDocumento = ""    
let numeroDocumento = ""  
 
let salario = 0           
let comisiones = 0        
let totalHorasExtras = 0  
let nivelRiesgo = 0       


// SECCION 2: CONSTANTES
 
const salarioMinimo              = 1750905  
const auxilioTransporte          = 249095    
const porcentajePension          = 0.04    
const porcentajeSalud            = 0.04     
const porcentajeFondoSolidaridad = 0.01     
 
// Lista de tarifas ARL segun nivel de riesgo
const riesgos = [0.00522, 0.01044, 0.02436, 0.04350, 0.06960]


// SECCION 3: MENSAJES DE ERROR REUTILIZABLES
 
const mensajesDeError = [
    "No se permiten numeros en este campo",      // índice [0]
    "Solo se permiten numeros en este campo",    // índice [1]
    " debe estar entre un rango de "             // índice [2]
]

// Arreglo donde se acumulan los errores de cada validación
let mensajes = []


// SECCION 4: REFERENCIAS AL DOM

const formDatosSalariales  = document.getElementById('datosSalariales')
const formDatosGenerales   = document.getElementById('datosGenerales')
const erroresDOM           = document.getElementById('errores')
const resultadosDOM        = document.getElementById('resultados')
const ibcDOM               = document.getElementById('ibc')
const auxilioTransporteDOM = document.getElementById('auxTransporte')
const saludDOM             = document.getElementById('salud')
const fondoSolidaridadDOM  = document.getElementById('fondoSolidaridad')
const pensionDOM           = document.getElementById('pension')
const arlDOM               = document.getElementById('arl')
const salarioDOM           = document.getElementById('salarioRes')
const comisionesDOM        = document.getElementById('comisionesRes')
const horasExtraDOM        = document.getElementById('horasExtraRes')
const totalDedDOM          = document.getElementById('totalDed')
const netoDOM              = document.getElementById('neto')
const totalDevDom          = document.getElementById('totalDev')


// SECCI0N 5: FUNCION validarCampos
 
function validarCampos(valor, tipo, inputNombre) {

    // Quitamos espacios al inicio y al final
    valor = valor.trim()

    // CASO 1: El campo es de texto (nombre, tipo de documento)
    if (tipo == "texto") {

        // Vacio
        if (valor === "") {
            mensajes.push("El campo " + inputNombre + " no puede estar vacío")
            return null
        }

        // Maximo 80 caracteres
        if (valor.length > 80) {
            mensajes.push("El campo " + inputNombre + " no puede tener más de 80 caracteres")
            return null
        }

        return valor
    }

    // CASO 2: El campo es de numeros (edad, documento, salario, etc.)
    if (tipo == "number") {

        // Vacio
        if (valor === "") {
            mensajes.push("El campo " + inputNombre + " no puede estar vacío")
            return null
        }

        // Letras o simbolos invalidos
        if (!/^\d+$/.test(valor)) {
            mensajes.push("El campo " + inputNombre + " solo acepta números enteros, sin letras ni símbolos")
            return null
        }

        return Number(valor)
    }
}


// SECCION 6: EVENTO — Formulario de datos salariales

formDatosSalariales.addEventListener('submit', (event) => {
    event.preventDefault()

    salario = validarCampos(document.getElementById('salario').value, "number", "salario")

    if (edad < 60) {
        comisiones       = validarCampos(document.getElementById('comisiones').value, "number", "comisiones")
        totalHorasExtras = validarCampos(document.getElementById('horasExtra').value, "number", "horas extra")
        nivelRiesgo      = validarCampos(document.getElementById('nivelRiesgo').value, "number", "nivel de riesgo")

        if (salario < 100000 || 99999999 < salario) {
            mensajes.push("Salario" + mensajesDeError[2] + "100000 a 99999999")
        }
        if (comisiones < 1000 || 99999999 < comisiones) {
            mensajes.push("Comisiones" + mensajesDeError[2] + "1000 a 99999999")
        }
        if (totalHorasExtras < 1000 || 50000000 < totalHorasExtras) {
            mensajes.push("Horas extra" + mensajesDeError[2] + "1000 a 50000000")
        }
    }

    if (mensajes.length > 0) {
        mostrarErrores()
    } else {
        erroresDOM.style.display = 'none'
        if (edad >= 60) {
            calcularPension(salario)
        } else {
            calcular(salario, comisiones, totalHorasExtras, nivelRiesgo)
        }
    }

    mensajes = []
})


// SECCION 7:Formulario de datos generales

formDatosGenerales.addEventListener('submit', (event) => {
    event.preventDefault()

    nombre          = validarCampos(document.getElementById('nombre').value, "texto", "nombre")
    edad            = parseInt(validarCampos(document.getElementById('edad').value, "number", "edad"))
    tipoDocumento   = validarCampos(document.getElementById('tipoDocumento').value, "texto", "tipo de documento")
    numeroDocumento = validarCampos(document.getElementById('numeroDocumento').value, "number", "numero de documento")

    if (edad < 1 || edad > 130) {
        mensajes.push("La edad debe estar entre 1 y 130 años")
    }

    if (mensajes.length > 0) {
        mostrarErrores()
    } else {
        erroresDOM.style.display = 'none'
        show()
    }

    mensajes = []
})


// SECCION 8: FUNCION show
 
function show() {
 
    if (edad < 18) {
        resultadosDOM.style.display = 'block'
        resultadosDOM.innerHTML = "Usted es menor de edad, por lo tanto no puede seguir con el siguiente paso"
 
    } else if (18 <= edad && edad < 25) {
        resultadosDOM.style.display = 'block'
        resultadosDOM.innerHTML = "Usted clasifica como usuario beneficiario por cotizante, por lo tanto no puede seguir con el siguiente paso"
 
    } else if (edad >= 60) {
        formDatosGenerales.style.display = 'none'
        formDatosSalariales.style.display = 'flex'
        formDatosSalariales.innerHTML = `
            <label for="salario">Mesada pensional</label>
            <input type="text" id="salario" name="salario" placeholder="4000000" required>
            <button type="submit">Enviar</button>
        `
        resultadosDOM.style.display = 'block'
 
    } else {
        formDatosGenerales.style.display = 'none'
        formDatosSalariales.style.display = 'flex'
    }
}


// SECCION 9: FUNCION calcular
 
function calcular(salarioCalculo, comision, horasExtras, riesgo) {
 
    salarioCalculo = Number(salarioCalculo)
    comision       = Number(comision)
    horasExtras    = Number(horasExtras)
 
    // CALCULOS
    let ibc                      = calcularPorcentaje(salarioCalculo + comision + horasExtras, 0.7)
    let calculoAuxilioTransporte = salarioCalculo < 2 * salarioMinimo ? auxilioTransporte : 0
    let calculoSalud             = calcularPorcentaje(ibc, porcentajeSalud)
    let calculoFondoSolidaridad  = ibc >= 4 * salarioMinimo ? calcularPorcentaje(ibc, porcentajeFondoSolidaridad) : 0
    let calculoPension           = calcularPorcentaje(ibc, porcentajePension) + calculoFondoSolidaridad
    let calculoArl               = calcularPorcentaje(ibc, riesgos[parseInt(riesgo)])
 
    // MOSTRAR resultados
    salarioDOM.innerHTML    = `<strong>Salario:</strong> $${salarioCalculo}`
    comisionesDOM.innerHTML = `<strong>Comisiones:</strong> $${comision}`
    horasExtraDOM.innerHTML = `<strong>Horas Extra:</strong> $${horasExtras}`
 
    ibcDOM.innerHTML               = `<strong>IBC:</strong> $${Math.floor(ibc)}`
    auxilioTransporteDOM.innerHTML = `<strong>Auxilio de transporte:</strong> $${calculoAuxilioTransporte}`
    saludDOM.innerHTML             = `<strong>Salud:</strong> $${Math.floor(calculoSalud)}`
    fondoSolidaridadDOM.innerHTML  = `<strong>Fondo solidaridad:</strong> $${Math.floor(calculoFondoSolidaridad)}`
    pensionDOM.innerHTML           = `<strong>Pensión:</strong> $${Math.floor(calculoPension)}`
    arlDOM.innerHTML               = `<strong>ARL:</strong> $${Math.floor(calculoArl)}`
 
    totalDevDom.innerHTML = `<strong>Total devengado (Salario + Comisiones + Horas extra):</strong> $${salarioCalculo + comision + horasExtras}`
    totalDedDOM.innerHTML = `<strong>Total deducciones:</strong> $${Math.floor(calculoSalud + calculoPension + calculoArl)}`
    netoDOM.innerHTML     = `<strong>Ingreso neto (Total devengado + auxilio de transporte - deducibles):</strong> $${salarioCalculo + comision + horasExtras - Math.floor(calculoSalud + calculoPension + calculoArl)}`
 
    resultadosDOM.style.display = 'flex'
}


// SECCION 10: FUNCION calcularPension
 
function calcularPension(salarioCalculo) {
 
    salarioCalculo = Number(salarioCalculo)
 
    let ibc                     = calcularPorcentaje(salarioCalculo, 0.7)
    let calculoSalud            = calcularPorcentaje(ibc, porcentajeSalud)
    let calculoFondoSolidaridad = ibc >= 4 * salarioMinimo ? calcularPorcentaje(ibc, porcentajeFondoSolidaridad) : 0
 
    salarioDOM.innerHTML          = `<strong>Salario:</strong> $${salarioCalculo}`
    ibcDOM.innerHTML              = `<strong>IBC:</strong> $${Math.floor(ibc)}`
    saludDOM.innerHTML            = `<strong>Salud:</strong> $${Math.floor(calculoSalud)}`
    fondoSolidaridadDOM.innerHTML = `<strong>Fondo solidaridad:</strong> $${Math.floor(calculoFondoSolidaridad)}`
 
    totalDevDom.innerHTML = `<strong>Total devengado:</strong> $${salarioCalculo}`
    totalDedDOM.innerHTML = `<strong>Total deducciones:</strong> $${Math.floor(calculoSalud)}`
    netoDOM.innerHTML     = `<strong>Ingreso neto:</strong> $${salarioCalculo - Math.floor(calculoSalud)}`
 
    resultadosDOM.style.display = 'flex'
}


// SECCION 11: FUNCIONES DE APOYO

function calcularPorcentaje(base, porcentaje) {
    return base * porcentaje
}

function mostrarErrores() {
    erroresDOM.innerHTML = ""
    erroresDOM.style.display = 'block'

    mensajes.forEach(m => {
        let newLi = document.createElement("li")
        newLi.innerHTML = m
        erroresDOM.appendChild(newLi)
    })
}