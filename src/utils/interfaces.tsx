
// Shared
export interface TypesWorkoutInfo {
    entryMethod: string;
    workoutType: string;
    workoutLength:string;
    customLength: string;
    subWorkouts: string;
    ergImg: File | null; 
}

export interface TypesWorkoutMetrics {
    workoutName: string;
    workoutDate: string;
    time:string[];
    meter: string[],
    split:  string[],
    sr: string[],
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
export interface TypesNameAndDate{
    workoutName: string;
    workoutDate: string;
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
    date: Date;
    time: string;
    meter: number;
    split: string;
    stroke_rate: number;
    interval: boolean;
    image_hash: string | null;
    subworkouts: TypeSubWorkout[] 
}

export interface TypeLogCols{
    date: Date;
    time: string;
    meter: number;
    split: string;
    strokeRate: number;
    interval: boolean;
}