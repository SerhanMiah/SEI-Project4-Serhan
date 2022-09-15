import spinnerImg from '../img/spinning-loading.gif'


const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <img src={spinnerImg} alt="Spinner" />
    </div>
  )
}

export default Spinner