const Card =(props)=> {

    return(
        <>
            <div className="col">
                <div className="card">
                    <img src={`/media/${props.img_URL}`} alt={props.name} className="img-fluid image card-img-top"/>
                    {/* <img src="../media/abc.jpg" alt="" /> */}
                </div>
                <div className="card-body">
                    <h3 className="card-title">{props.name}</h3>
                </div>
            </div>
        </>
    )
}

export default Card