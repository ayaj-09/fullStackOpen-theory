const baseUrl = 'http://localhost:3001/notes'
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