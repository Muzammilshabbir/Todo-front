import EditTodo from "../../../views/EditTodo"
import {getTodo} from "../../../services/todoService"

const fetchData = async (id) => {
    const [data, error] = await getTodo(id)
    
    return !error ? data : null
}

export default async function Page ({params}) {

    const { id } = await params;
    const data = await fetchData(id)
    return <EditTodo data={data}/>
}