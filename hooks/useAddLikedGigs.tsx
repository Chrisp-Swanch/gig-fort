import { doc,updateDoc,getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { arrayUnion, increment } from 'firebase/firestore'


export const useAddLikedGigs = async (gigId:string, userId:string) => {
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
            likedGigs: arrayUnion(gigId)
        })
    }

export const incrementRecommendByOne = async (gigId:string) => {
    const gigRef = doc(db, 'gigs', gigId)
    await updateDoc(gigRef, {
        likes: increment(1)
    })
}

export const addRecommendedGigIDtoUser = async (gigId:string, userId:string) => {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
        recommendedGigs: arrayUnion(gigId)
    })
}

export const getRecommendations = async (gigID:string) => {
    const gigRef = doc(db, 'gigs', gigID)
    const gig = await getDoc(gigRef)
    return gig.data().likes
}






