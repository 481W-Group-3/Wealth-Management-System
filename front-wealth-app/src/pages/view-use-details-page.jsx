import AdminView from "../components/account/admin-view.jsx";
import {useLocation, useParams} from "react-router-dom";

const ViewUseDetailsPage = () => {
    const {id} = useParams();
    
    return (
        <div>
            <AdminView userId={id} />
        </div>
    )
}

export default ViewUseDetailsPage;