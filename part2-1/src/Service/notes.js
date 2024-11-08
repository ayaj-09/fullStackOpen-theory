const baseUrl = 'https://notes-backend-ai07.onrender.com'
import axios from "axios"

const getAll = () => {
    return axios
            .get(baseUrl)
            .then(response=>response.data)
}

const createNote = (noteObject) => {
    return axios
            .post(baseUrl,noteObject)
            .then(response=>response.data)
}

const updateNote = (id,noteObject) => {
    return axios
            .put(`${baseUrl}/${id}`,noteObject)
            .then(response=>response.data)
}

export default{
    getAll,
    createNote,
    updateNote
}