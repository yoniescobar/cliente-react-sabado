

const Libros = () => {
  return (
    <div className="container py-5">
        <h1 className="display-4">Página de Libros</h1>

        <form className="form-group py-3">
          
          <input 
                type="text"
                placeholder="Nombre de la categoria"
                className="form-control mb-3" 
          />
          <input 
                type="text"
                placeholder="Descripcion de la categoria"
                className="form-control mb-3" 
          />

          <button className="btn btn-primary btn-block" type="submit">
          <i className="fa-solid fa-circle-plus px-2"></i>
             Agregar</button>

        </form>
    </div>
  )
}

export default Libros
