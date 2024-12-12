export const handleApiError = (error) => {
    if(error.response){
        const serverMessage = error.response.data?.message || 'Server Error';
        return serverMessage;
    }else if(error.request){
        return 'No response from server. Please try again';
    }else{
        return error.message;
    }
}