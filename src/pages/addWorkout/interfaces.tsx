
// Shared
export interface WorkoutInfoType {
    entryMethod: string;
    workoutType: string;
    workoutLength:string;
    customLength: string;
    subWorkouts: string;
    ergImg: File | null; 
}

// LengthOptions
export interface LengthOptionsTypes {
    singleTime: string[];
    singleDist: string[];
    intervalDist: string[];
    intervalTime: string[];
}


export interface LOProps {
    className: string;
    workoutInfo: WorkoutInfoType;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// UploadAndDisplayImage
export interface UADIProps {
    workoutInfo: WorkoutInfoType;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

