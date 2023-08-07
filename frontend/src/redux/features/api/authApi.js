import axios from 'axios'
import { baseUrl } from '../../../utils/constants'


const authAxios = axios.create({
    baseURL:baseUrl,
})

export default authAxios