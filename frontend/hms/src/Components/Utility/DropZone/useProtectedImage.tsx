import { useEffect, useState } from "react";
import axiosInstance from "../../../Interceptor/AxiosInterceptor";

const useProtectedImage = (imageId?: string | null) => {
    const [imageUrl, setImageUrl] = useState<string>('/avatar.png');
    useEffect(() => {
        if (!imageId) return;
        axiosInstance.get('/media/' + imageId, { responseType: 'blob' })
            .then((response: { data: Blob | MediaSource; }) => {
                console.log(response);
                const url = URL.createObjectURL(response.data);
                setImageUrl(url);
            })
            .catch((error: any) => {
                console.error("Error fetching protected image:", error);
            });
    }, [imageId]);

    return imageUrl;
}

export default useProtectedImage;