import {io} from 'socket.io-client'
import { server } from './constants'

export const socket = io(`${server}`, {
    path: '/ws/socket.io'
})