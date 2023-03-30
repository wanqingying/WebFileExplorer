import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    entities: [],
    status: null
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded(state, action) {
            // ✅ This "mutating" code is okay inside of createSlice!
            state.entities.push(action.payload)
        },
        todoToggled(state, action) {
            const todo = state.entities.find(todo => todo.id === action.payload)
            todo.completed = !todo.completed
        },
        todosLoading(state, action) {
            return {
                ...state,
                status: 'loading'
            }
        }
    }
})


export const { todoAdded, todoToggled, todosLoading } = todosSlice.actions