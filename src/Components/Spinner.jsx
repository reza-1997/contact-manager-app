import spinnerGif from '../assets/Spinner.gif'

const Spinner = () => {
    
    return (
        <>
            <img src={spinnerGif} alt="spinner" className='d-block m-auto'
                style={{ width: '200px' }} />
        </>
    )
}
export default Spinner;