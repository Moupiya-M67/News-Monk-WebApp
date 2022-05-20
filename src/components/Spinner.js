import loading from './loading.gif'
const Spinner = () => {
        return (
            <div>
                <div className="text-center">
                    <img className="my-3" src={loading} alt="Loading..."/>
                </div>
            </div>
        )
}

export default Spinner
