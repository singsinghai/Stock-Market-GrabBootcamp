import react from "react"
import {Link, useParams} from "react-router-dom"
function CompanySite(){
    let {symbol} = useParams();
    return (
        <div>
            <Link to="/"> DashBoard </Link>
            <div>
                Test Name of the company: {symbol}
            </div>
        </div>
    )
}

export default CompanySite