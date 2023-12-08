import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

export const fetchCharacters = createAsyncThunk('fetchCharacters',async({query,page})=>{
    const data = await fetch(`https://swapi.dev/api/people/?name=${query}&page=${page}`)
    const jdata= await data.json()

    return jdata;
})
const apiSlice = createSlice({

    name:'starwars',
    initialState:{
        isLoading:false,
        data:null,
        error:false,
    
    },

    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCharacters.pending,(state,action)=>{
           state.isLoading=true
        })
        builder.addCase(fetchCharacters.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
            console.log(state.data)
         })
         builder.addCase(fetchCharacters.rejected,(state,action)=>{
            state.error=true
         })
    }
})
export default apiSlice.reducer;