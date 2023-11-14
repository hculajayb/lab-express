export const convertToCreateUser = (form) => {
    return {
        nombre : form.txtnombre,
        apellidos : form.txtapellido,
        asignacion_id : "1",
        cui : form.txtdpi,
        direccion : form.txtdireccion,
        edad : form.txtedad,
        genero : form.txtgenero,
        correo : form.txtemail,
        contrasenia : form.txtcontrasenia,
        creado_por: "0"
    }
}