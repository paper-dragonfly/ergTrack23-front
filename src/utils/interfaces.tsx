 // Shared
export interface TypesWorkoutInfo {
    entryMethod: string;
    workoutType: string;
    workoutLength:string;
    customLength: string;
    rest:string;
    subWorkouts: string;
    showHR: boolean;
    ergImg: File | null; 
}

export interface TypesWorkoutMetrics {
    workoutName: string;
    workoutDate: string;
    time:string[];
    meter: string[];
    split:  string[];
    sr: string[];
    hr: string[]
}

// LengthOptions
export interface TypesLengthOptions {
    singleTime: string[];
    singleDist: string[];
    intervalDist: string[];
    intervalTime: string[];
}


export interface LOProps {
    className: string;
    workoutInfo: TypesWorkoutInfo;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// UploadAndDisplayImage
export interface UADIProps {
    workoutInfo: TypesWorkoutInfo;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// WorkoutTable
export interface TypesWoMetaData{
    workoutName: string;
    workoutDate: string;
    comment: string; 
}

export interface TypesWorkoutTableMetrics{
    id: string;
    time: string;
    distance: number;
    split: string;
    strokeRate: number;
    heartRate: number |  null;
}

export interface ERProps {
    workoutMetrics: TypesWorkoutMetrics;
    userToken: unknown;
    photoHash: string;
}

// Workout Log
export interface TypeSubWorkout{
    id: string;
    time: string;
    distance: number;
    split: string;
    strokeRate: number;
    heartRate: number | null ;
}

export interface TypeFetchedWorkouts{
    workout_id: number;
    user_id: number;
    description: string | null;
    date: Date;
    time: string;
    meter: number;
    split: string;
    stroke_rate: number;
    heart_rate: number | null;
    watts: number;
    cal: number;
    image_hash: string | null;
    subworkouts: TypeSubWorkout[] ;
    comment: string | null
}

export interface TypeLogCols{
    workoutId:number;
    date: Date;
    time: string;
    meter: number;
    split: string;
    strokeRate: number;
}

//Workout Details 

export interface TypeDetailsCols{
    time?: string;
    meter?: number;
    split?: string;
    rate?: number;
    hr?: number;
    watts?: number;
    cal?: number;
}

// Profile
export interface TypeProfileLoaded{
    userInfo: TypeUserInfo;
    userToken: string;
}

export interface TypeUserInfo{
    auth_uid: string;
    user_name: string;
    email: string;
    joined: Date;
    country: string | null;
    sex: string | null;
    age: number | null; 
    weight_class: string | null;
    para_class: string | null;

}

export interface TypeProfileInfo{
    userInfo: TypeUserInfo;
    setEditting: React.Dispatch<React.SetStateAction<boolean>>
}
export interface TypeProfileEdit{
    userInfo: TypeUserInfo
    userToken: string;
    setUserInfo: React.Dispatch<React.SetStateAction<TypeUserInfo>>
    setEditting: React.Dispatch<React.SetStateAction<boolean>>
}
