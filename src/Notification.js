const Notification = ({message, statusCode}) => {
    if (message === null) {
        return null
    }
    if (statusCode !==null & statusCode <= 399) {
        console.log("in success block", statusCode);
        return (
            <div className="success">
                {message}
            </div>
        )
    }
    else {
        console.log("in error block", statusCode);
        return (
            <div className="error">
                {message}
            </div>
        )
    }


}

export default Notification