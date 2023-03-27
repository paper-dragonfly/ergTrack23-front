
// Shared
export interface FormData {
    entryMethod: string;
    workoutType: string;
    workoutLength:string;
    customLength: string;
    subWorkouts: string;
    selectedImage: File | null; 
}

// LengthOptions
export interface LengthOptions {
    singleTime: string[];
    singleDist: string[];
    intervalDist: string[];
    intervalTime: string[];
}


export interface LOProps {
    className: string;
    formData: FormData;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// UploadAndDisplayImage
export interface UADIProps {
    formData: FormData;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

