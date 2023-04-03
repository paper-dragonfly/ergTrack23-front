
// Shared
export interface TypesWorkoutInfo {
    entryMethod: string;
    workoutType: string;
    workoutLength:string;
    customLength: string;
    subWorkouts: string;
    ergImg: File | null; 
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
export interface TypesNameDateTotals{
    workoutName: string;
    workoutDate: string;
    totalType: string | null;
    totalValue: string | number | null;
}

export interface TypesWorkoutMetrics{
    id: string;
    time: string;
    distance: number;
    split: string;
    strokeRate: number;
    heartRate: number |  null;
}