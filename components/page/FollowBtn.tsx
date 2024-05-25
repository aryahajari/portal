import React from 'react'
import { $Text, $TouchableOpacity } from '../NativeWind'
import { useUserData } from '@/context/UserDataProvider'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firebaseFirestore } from '@/FirebaseConfig'
const FollowBtn = ({ targetId }: { targetId: string }) => {
    const self = useUserData()
    if (!self) return null
    const isFollowed = self?.following && self.following.includes(targetId)
    async function followUser() {
        console.log('follow')
        if (!self) return
        const userRef = doc(firebaseFirestore, "users", self.uid);
        await updateDoc(userRef, {
            following: arrayUnion(targetId)
        });
    }
    async function unfollowUser() {
        console.log('unfollow')
        if (!self) return
        const userRef = doc(firebaseFirestore, "users", self.uid);
        await updateDoc(userRef, {
            following: arrayRemove(targetId)
        });
    }
    return (
        <$TouchableOpacity
            className='bg-primary p-2 rounded-lg justify-center items-center mr-4 ml-4'
            onPress={() => { isFollowed ? unfollowUser() : followUser() }}
        >
            <$Text className='text-white'>{isFollowed ? 'unfollow' : 'follow'}</$Text>
        </$TouchableOpacity>
    )
}

export default FollowBtn