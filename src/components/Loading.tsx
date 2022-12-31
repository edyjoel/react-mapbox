export const Loading = () => {
  return (
    <div className="loading-map d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h1 className="ms-3">Localizando...</h1>
    </div>
  )
}
