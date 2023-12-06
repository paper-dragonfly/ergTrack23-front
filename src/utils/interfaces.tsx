import React from 'react'
 
 // Shared
export interface TypesWorkoutInfo {
    entryMethod: string;
    workoutType: string;
    workoutLength:string;
    customLength: string;
    rest:string;
    subWorkouts: string;
    showHR: boolean;
    ergImg: File[]; 
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
    workoutInfo: TypesWorkoutInfo 
    setWorkoutInfo: React.Dispatch<React.SetStateAction<any>>;
    numSubs: number;
    setNumSubs: React.Dispatch<React.SetStateAction<any>>;
    setShowError: React.Dispatch<React.SetStateAction<any>>;
    varInts: boolean
    setVarInts: React.Dispatch<React.SetStateAction<any>>
}

// EditableResults WorkoutTable
export interface TypesWoMetaData{
    workoutName: string;
    workoutDate: string;
    comment: string; 
    postToTeam: boolean;
}

export interface TypesWorkoutTableMetrics{
    id: string;
    time: string;
    distance: number;
    split: string;
    strokeRate: number;
    heartRate: number |  null;
}

export interface TypesRestInfoTable{
    id: string;
    intervalCount: number;
    time: string;
    meter: number
}

export interface TypeRestInfo{
    restTime: string[];
    restDist: number[] ;
}
export interface ERProps {
    workoutMetrics: TypesWorkoutMetrics;
    userToken: unknown;
    photoHash: string[];
    restInfo: TypeRestInfo;
    varInts: boolean;
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
    split_variance: number;
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
    user_id?: number;
    user_name: string;
    email: string;
    joined: Date;
    country: string | null;
    sex: string | null;
    dob: Date | null; 
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

// Team
export interface TypeAddTeamLoaded{
    userToken: string;
}
export interface TypeTeamLoaded{
    userToken: string;
    userTeamInfo: {
        team_member: boolean;
        team_info?: TypeTeamInfo;
        team_admin?: boolean
    }
    teamWorkoutsDTM: TypeWorkoutDTM[]
}

export interface TypeTeamInfo{
    team_id: number;
    team_name: string;
    team_code: string;
}

export interface TypeWorkoutDTM{
    date: Date;
    time: number;
    meter: number;
}

export interface TypeTeamAdminLoaded{
    userToken: string;
    teamAdminInfo: {
        team_info: TypeTeamInfo
        team_members: TypeUserInfo[]
        admin_uid: number
    };
    teamId: number
}
 

export interface TeamChildProps {
    userToken: string;
    toggleTeamMember: () => void;
}

export interface TeamLogProps {
    userToken: string;
}

export interface TypeFetchedTeamWorkouts{
    workout_id: number;
    user_id: number;
    description: string | null;
    date: Date | string;
    time: string;
    meter: number;
    split: string;
    stroke_rate: number;
    heart_rate: number | null;
    split_variance: number;
    watts: number;
    cal: number;
    image_hash: string | null;
    subworkouts: TypeSubWorkout[] ;
    comment: string | null;
    user_name: string;
    sex: string | null;
    dob: string | null;
}

export interface TypeSummaryData{
    workoutId: number;
    date: Date | string;
    workout: string | null;
    time: string;
    meters: number;
    split: string;
    rate: number;
    HR: number | null;
    variance: number;
    watts: number;
    cal: number;
    comment: string | null;
    athlete: string;
    sex: string | null;
    dob: string | null;
}

export interface TypeFilterableTeamWorkouts{
    workout_id: number;
    time: string;
    meter: number;
    split: string;
    stroke_rate: number;
    heart_rate?: number | null;
    split_variance: number;
    watts: number;
    cal?: number;
    comment: string | null;
    user_name: string;
    sex: string | null;
    dob: string | null;
}

export interface TypeTeamMemberCols{
    userId: number;
    name?: string;
    sex?: string;
    dob?: Date;
    email:string;
}




