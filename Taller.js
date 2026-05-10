// Nombre: Juan Pablo Salamanca Mahecha | Documento: 1028863980

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

const riesgos = [0.00522, 0.01044, 0.02436, 0.04350, 0.06960]


// SECCION 3: MENSAJES DE ERROR REUTILIZABLES

const mensajesDeError = [
    "No se permiten numeros en este campo",
    "Solo se permiten numeros en este campo",
    " debe estar entre un rango de "
]

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


// SECCION 5: FUNCION validarCampos

function validarCampos(valor, tipo, inputNombre) {

    valor = valor.trim()

    if (tipo == "texto") {

        if (valor === "") {
            mensajes.push("El campo " + inputNombre + " no puede estar vacío")
            return null
        }

        if (valor.length > 80) {
            mensajes.push("El campo " + inputNombre + " no puede tener más de 80 caracteres")
            return null
        }

        return valor
    }

    if (tipo == "number") {

        if (valor === "") {
            mensajes.push("El campo " + inputNombre + " no puede estar vacío")
            return null
        }

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

    // FIX: resetear mensajes al inicio del evento
    mensajes = []

    salario = validarCampos(document.getElementById('salario').value, "number", "salario")

    if (edad < 60) {
        comisiones       = validarCampos(document.getElementById('comisiones').value, "number", "comisiones")
        totalHorasExtras = validarCampos(document.getElementById('horasExtra').value, "number", "horas extra")
        nivelRiesgo      = validarCampos(document.getElementById('nivelRiesgo').value, "number", "nivel de riesgo")

        // FIX: solo validar rangos si los campos no son null
        if (salario !== null && (salario < 100000 || 99999999 < salario)) {
            mensajes.push("Salario" + mensajesDeError[2] + "100000 a 99999999")
        }
        if (comisiones !== null && (comisiones < 1000 || 99999999 < comisiones)) {
            mensajes.push("Comisiones" + mensajesDeError[2] + "1000 a 99999999")
        }
        if (totalHorasExtras !== null && (totalHorasExtras < 1000 || 50000000 < totalHorasExtras)) {
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
})


// SECCION 7: Formulario de datos generales

formDatosGenerales.addEventListener('submit', (event) => {
    event.preventDefault()

    // FIX: resetear mensajes al inicio del evento
    mensajes = []

    nombre          = validarCampos(document.getElementById('nombre').value, "texto", "nombre")
    edad            = validarCampos(document.getElementById('edad').value, "number", "edad")
    tipoDocumento   = validarCampos(document.getElementById('tipoDocumento').value, "texto", "tipo de documento")
    numeroDocumento = validarCampos(document.getElementById('numeroDocumento').value, "number", "numero de documento")

    // FIX: convertir edad a entero solo si no es null
    if (edad !== null) {
        edad = parseInt(edad)
        if (edad < 1 || edad > 130) {
            mensajes.push("La edad debe estar entre 1 y 130 años")
        }
    }

    // FIX: verificar que ningún campo sea null antes de continuar
    if (nombre === null || edad === null || tipoDocumento === null || numeroDocumento === null) {
        mostrarErrores()
        return
    }

    if (mensajes.length > 0) {
        mostrarErrores()
    } else {
        erroresDOM.style.display = 'none'
        show()
    }
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
        // FIX: mostrar el form salarial correctamente
        formDatosSalariales.style.display = 'flex'
        formDatosSalariales.innerHTML = `
            <p class="form-title">02 · Mesada pensional</p>
            <label>Mesada pensional (COP)
              <input type="text" id="salario" placeholder="Ej. 4000000">
            </label>
            <button type="submit">Calcular</button>
        `
        resultadosDOM.style.display = 'block'

    } else {
        formDatosGenerales.style.display = 'none'
        // FIX: mostrar el form salarial correctamente
        formDatosSalariales.style.display = 'flex'
    }
}


// SECCION 9: FUNCION calcular

function calcular(salarioCalculo, comision, horasExtras, riesgo) {

    salarioCalculo = Number(salarioCalculo)
    comision       = Number(comision)
    horasExtras    = Number(horasExtras)

    let ibc                      = calcularPorcentaje(salarioCalculo + comision + horasExtras, 0.7)
    let calculoAuxilioTransporte = salarioCalculo < 2 * salarioMinimo ? auxilioTransporte : 0
    let calculoSalud             = calcularPorcentaje(ibc, porcentajeSalud)
    let calculoFondoSolidaridad  = ibc >= 4 * salarioMinimo ? calcularPorcentaje(ibc, porcentajeFondoSolidaridad) : 0
    let calculoPension           = calcularPorcentaje(ibc, porcentajePension) + calculoFondoSolidaridad
    let calculoArl               = calcularPorcentaje(ibc, riesgos[parseInt(riesgo)])

    salarioDOM.innerHTML    = `<strong>Salario:</strong> $${salarioCalculo.toLocaleString('es-CO')}`
    comisionesDOM.innerHTML = `<strong>Comisiones:</strong> $${comision.toLocaleString('es-CO')}`
    horasExtraDOM.innerHTML = `<strong>Horas Extra:</strong> $${horasExtras.toLocaleString('es-CO')}`

    ibcDOM.innerHTML               = `<strong>IBC:</strong> $${Math.floor(ibc).toLocaleString('es-CO')}`
    auxilioTransporteDOM.innerHTML = `<strong>Auxilio de transporte:</strong> $${calculoAuxilioTransporte.toLocaleString('es-CO')}`
    saludDOM.innerHTML             = `<strong>Salud:</strong> $${Math.floor(calculoSalud).toLocaleString('es-CO')}`
    fondoSolidaridadDOM.innerHTML  = `<strong>Fondo solidaridad:</strong> $${Math.floor(calculoFondoSolidaridad).toLocaleString('es-CO')}`
    pensionDOM.innerHTML           = `<strong>Pensión:</strong> $${Math.floor(calculoPension).toLocaleString('es-CO')}`
    arlDOM.innerHTML               = `<strong>ARL:</strong> $${Math.floor(calculoArl).toLocaleString('es-CO')}`

    totalDevDom.innerHTML = `<strong>Total devengado:</strong> $${(salarioCalculo + comision + horasExtras).toLocaleString('es-CO')}`
    totalDedDOM.innerHTML = `<strong>Total deducciones:</strong> $${Math.floor(calculoSalud + calculoPension + calculoArl).toLocaleString('es-CO')}`
    netoDOM.innerHTML     = `<strong>Ingreso neto:</strong> $${(salarioCalculo + comision + horasExtras + calculoAuxilioTransporte - Math.floor(calculoSalud + calculoPension + calculoArl)).toLocaleString('es-CO')}`

    resultadosDOM.style.display = 'flex'
}


// SECCION 10: FUNCION calcularPension

function calcularPension(salarioCalculo) {

    salarioCalculo = Number(salarioCalculo)

    let ibc                     = calcularPorcentaje(salarioCalculo, 0.7)
    let calculoSalud            = calcularPorcentaje(ibc, porcentajeSalud)
    let calculoFondoSolidaridad = ibc >= 4 * salarioMinimo ? calcularPorcentaje(ibc, porcentajeFondoSolidaridad) : 0

    salarioDOM.innerHTML          = `<strong>Mesada pensional:</strong> $${salarioCalculo.toLocaleString('es-CO')}`
    ibcDOM.innerHTML              = `<strong>IBC:</strong> $${Math.floor(ibc).toLocaleString('es-CO')}`
    saludDOM.innerHTML            = `<strong>Salud:</strong> $${Math.floor(calculoSalud).toLocaleString('es-CO')}`
    fondoSolidaridadDOM.innerHTML = `<strong>Fondo solidaridad:</strong> $${Math.floor(calculoFondoSolidaridad).toLocaleString('es-CO')}`

    comisionesDOM.innerHTML = ''
    horasExtraDOM.innerHTML = ''
    auxilioTransporteDOM.innerHTML = ''
    pensionDOM.innerHTML = ''
    arlDOM.innerHTML = ''

    totalDevDom.innerHTML = `<strong>Total devengado:</strong> $${salarioCalculo.toLocaleString('es-CO')}`
    totalDedDOM.innerHTML = `<strong>Total deducciones:</strong> $${Math.floor(calculoSalud + calculoFondoSolidaridad).toLocaleString('es-CO')}`
    netoDOM.innerHTML     = `<strong>Ingreso neto:</strong> $${(salarioCalculo - Math.floor(calculoSalud + calculoFondoSolidaridad)).toLocaleString('es-CO')}`

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