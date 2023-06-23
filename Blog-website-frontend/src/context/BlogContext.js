import { createContext, useReducer } from "react";

export const BlogsContext = createContext()

export const blogReducer = (state , action)=>{
    switch (action.type){
        case 'SET_BLOG':
            return{
                blogs: action.payload
            }
        
        case 'CREATE_BLOG':
            console.log('Here   :    ' ,state.blogs)
            return {
                blogs: [action.payload , ...state.blogs]
            }
        
        case 'DELETE_BLOG':
            return {
                blogs: state.blogs.filter((w) => w._id !== action.payload._id)
            }
    

        default:
            return state
    }
}

export const BlogContextProvider = ({children})=>{

    const [state,dispatch] = useReducer(blogReducer, {blogs:null})


    return (
        <BlogsContext.Provider value={{...state,dispatch}}>
            {children}
        </BlogsContext.Provider>
    )
} 
