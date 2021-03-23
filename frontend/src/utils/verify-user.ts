import axios from 'axios';

export const verifyUser = async (props: any) => {
    try {
        const userVerification = await axios.get("/api/verify");
        const { error, isValidCookie } = userVerification.data;
        if (error || !isValidCookie) {
            props.history.push("/login");
        
        }
    
    } catch (error) {
        props.history.push("/login");
        throw new Error(error.message);
    }
}
