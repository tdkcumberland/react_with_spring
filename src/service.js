import axios from 'axios'
const baseUrl = '/'

const getAll = () => {
    // const request = axios.get(baseUrl + 'Allemployee')
    const request = axios({
        method: 'get',
        url: baseUrl + 'Allemployee',
        headers: {}
    }
    )
    return request.then(response => response.data)
}

const create = newEmployee => {
    const request = axios({
        method: 'post',
        url: baseUrl + 'employee',
        headers: {},
        data: {
            firstName : newEmployee.firstName,
            lastName : newEmployee.lastName,
        }
    })
    return request.then(response => response.data)
}

export {
    getAll,
    create,
    // update,
    // removePerson
}