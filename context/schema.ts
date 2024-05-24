import { Timestamp, collection } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
export interface FeedDbSchema {
    feedId: string;
    userName: string;
    name: string;
    pfp: string;
    uid: string;
    img: string | undefined;
    caption: string;
    createdAt: Timestamp;
}
export interface FeedSchema {
    feedId: string;
    userName: string;
    name: string;
    pfp: string;
    uid: string;
    img: { url: string, aspectRatio: number, type: string | undefined } | undefined;
    caption: string;
    createdAt: Timestamp;
}

export interface UserSchema {
    email: string;
    name: string;
    bio: string;
    uid: string;
    pfp: string | undefined;
    userName: string;
    dateOfBirth: string;
    lastFeedSeen: Timestamp | undefined;
    following: string[];
}
export interface AuthContextSchema {
    setIsSignedIn: Dispatch<SetStateAction<boolean>>;
    setUser: Dispatch<SetStateAction<string | null>>;
    userId: string;
    isSignedIn: boolean | null;
}