import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentSessionChats } from "../../api/getCurrentSessionChats";

const fetchCurrentSessionChats = createAsyncThunk(
    "loading/fetchCurrentSessionChats",
    async ( { token , sessionId } , {dispatch}  ) => {

        try{
            const backendResponse = await getCurrentSessionChats({ token , sessionId })

            if(backendResponse.status !== 200 && backendResponse.status !== 201){
                alert(backendResponse.message);
                return;
            }
            console.log("Backend Response in fetchCurrentSessionChats: ", backendResponse);
            return backendResponse
        }
        catch(err){
            alert(err.message);
        }

    }
)

export { fetchCurrentSessionChats };