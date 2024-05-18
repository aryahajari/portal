import { Timestamp } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

export interface FeedSchema {
    feedId: string;
    uid: string;
    img: string | undefined;
    caption: string;
    likes: number;
    comments: string[];
    createdAt: Timestamp;
}
export interface UserSchema {
    email: string;
    name: string;
    uid: string;
    pfp: string;
    userName: string;
    dateOfBirth: string;
}
export interface AuthContextSchema {
    setIsSignedIn: Dispatch<SetStateAction<boolean>>;
    setUser: Dispatch<SetStateAction<string | null>>;
    userId: string;
    isSignedIn: boolean;
}