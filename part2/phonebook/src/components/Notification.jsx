const Notification = (props) => {
    if (props.successMessage === null && props.errorMessage === null) {
        return null
    } else if (props.successMessage !== null) {
        return (
            <div className='success'>
                {props.successMessage}
            </div>
        )
    } else {
        return (
            <div className='error'>
                {props.errorMessage}
            </div>
        )
    }
}

export default Notification