import { useState, useEffect } from "react"
import axios from 'axios'

import Card from './Card'

const Bands =()=> {

    const [ bands, setBands ] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3005/api/band')
            .then(res => 
                setBands(res.data)
            )
    }, [])

    // console.log(bands)

    const bandCards = bands.map(band => {
        return <Card 
            key={band.band_id}
            id={band.band_id}
            name={band.band}
            img_URL={band.band_img}
        />
    })


    return(
        <>
                    <main className="main" id="bandsMain">
                        <div className="container">
                            <h2>bands</h2>
                            <div className="row row-cols-1 row-cols-md-5 g-4">
                                { bandCards }
                            </div>
                </div>
            </main>
        </>
    )
}

export default Bands