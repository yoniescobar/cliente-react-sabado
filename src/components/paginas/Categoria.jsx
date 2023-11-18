import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const Categoria = () => {

  const url = 'http://localhost:8080/api/v1'

  const [categorias, setCategorias] = useState([])
  const [id, setId] = useState('')
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [title, setTitle] = useState('')
  const [operacion, setOperacion] = useState('') // 1 = Agregar, 2 = Editar


  // ------------------------- Funcion para obtener las categorias ------------------------- //
  const getCategorias = async () => {
    try {
      const response = await axios.get(`${url}/categorias`) // http://localhost:8080/api/v1/categorias
      setCategorias(response.data.categoriaResponse.categorias)
      console.log(response.data.categoriaResponse.categorias)
    }
    catch (error) {
      console.log(error)
    }
  }

  //------------------ funcion para elegir la operacion ------------------//

  const openModal = (op, id, nombre, descripcion) => {
    //Seterar valors de los inputs
    setId('')
    setNombre('')
    setDescripcion('')

    setOperacion(op)
    if (op === 1) {
      setTitle('Agregar categoria')
    } else if (op === 2) {
      setTitle('Editar categoria')
      setId(id)
      setNombre(nombre)
      setDescripcion(descripcion)
    }

    //focus en el input nombre
    document.getElementById('nombre').focus()  // es para que el cursor se posicione en el input nombre

  }


  //------------------ funcion para validar los campos ------------------//

  const validar = () => {
    if (nombre === '') {
      Swal.fire({
        text: 'Ingrese un nombre',
        icon: 'warning',
      })
    } else if (descripcion === '') {
      Swal.fire({
        text: 'Ingrese una descripcion',
        icon: 'warning',
      })
    } else {
      if (operacion === 1) {
        agregarCategoria()
      } else if (operacion === 2) {
        updateCategoria()
      }
    }
  }

  //------------------ funcion para agregar categoria ------------------//
  const agregarCategoria = async () => {
    Swal.fire({
      title: '¿Está seguro de agregar el Categoria?',
      text: nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`${url}/categorias`, {
            nombre: nombre,
            descripcion: descripcion,

          })
          console.log(response.data)
          await getCategorias()
          document.getElementById('btnCerrar').click()
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  // ----------- udpate categoria ------------------//
  const updateCategoria = async () => {
    Swal.fire({
      title: '¿Está seguro de actualizar la categoria?',
      text: nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then(async (result) => { // async: es para que espere a que se ejecute await y luego continue el codigo
      if (result.isConfirmed) {
        try {
          const response = await axios.put(`${url}/categorias/${id}`, {
            nombre: nombre,
            descripcion: descripcion,
          })
          console.log(response.data)
          await getCategorias()
          document.getElementById('btnCerrar').click()
        } catch (error) {
          console.log(error)
        }
      }
    })
  }
  //------------------ Eliminar categoria ------------------//

  const eliminarCategoria = async (categoria) => {
    Swal.fire({
      title: `¿Está seguro de eliminar categoria ? ${categoria.nombre}`,
      text: categoria.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${url}/categorias/${categoria.id}`) // http://localhost:8080/api/v1/categorias/1
          console.log(response.data)
          await getCategorias()
        } catch (error) {
          console.log(error)
        }
      }
    })
  }





  // ------------------------- Renderizar el listado categoria  ------------------------- //
  useEffect(() => {
    getCategorias()
  }, [])


  return (
    <>
      {/*  Boton de Agregar categorias */}
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button onClick={() => openModal(1)} className='btn btn-dark btn-block' data-bs-toggle='modal' data-bs-target='#modalcategorias'>
                <i className='fa-solid fa-circle-plus'></i> Agregar categoria
              </button>
            </div>
          </div>
        </div>

        {/*  Tabla de categorias */}
        <div className='col-md-8 offset-md-2 py-3'>
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {
                categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>{categoria.id}</td>
                    <td>{categoria.nombre}</td>
                    <td>{categoria.descripcion}</td>
                    <td>
                      <button onClick={() => openModal(2, categoria.id, categoria.nombre, categoria.descripcion)} className='btn btn-sm  btn-outline-warning mx-1' data-bs-toggle='modal' data-bs-target='#modalcategorias' >
                        <i className='fa-solid fa-pencil'></i>
                      </button>
                      <button onClick={() => eliminarCategoria(categoria)} className='btn btn-sm  btn-outline-danger '>
                        <i className='fa-solid fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/*  Modal de categorias */}

      <div id='modalcategorias' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            {/* Cuerpo del Modal */}
            <div className='modal-body'>
              <input type='hidden' id='id' value={id}></input>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className="fa-solid fa-user"></i></span>
                <input
                  type='text'
                  id='nombre'
                  className='form-control'
                  placeholder='Agrega un nombre Categoria'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className="fa-solid fa-audio-description"></i></span>
                <input
                  type='description'
                  id='description'
                  className='form-control'
                  placeholder='Agrega una descripcion'
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              {/* Boton Guardar */}
              <div className='d-grid col-6 mx-auto'>
                <button onClick={() => validar()} className='btn btn-success btn-block'>
                  <i className='fa-solid fa-save'></i> Guardar...
                </button>
              </div>
            </div>
            {/* Pie del Modal */}
            <div className='modal-footer'>
              <button id='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                <i className='fa-solid fa-window-close'></i> Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Categoria
