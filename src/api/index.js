
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore"
import { db } from "../config/firebase-config"

const userStatsCollection = collection(db, "user_stats")

export const sendUserStats = async ({  
  username, 
  email, 
  score, 
  click, 
  positionalClick, 
  stereoClick, 
  monoClick,
  missedClick,
  positionalMissedClick,
  stereoMissedClick,
  monoMissedClick,
  avgPositionalResponseTime, 
  minPositionalResponseTime, 
  avgStereoResponseTime, 
  minStereoResponseTime, 
  avgMonoResponseTime, 
  minMonoResponseTime 
}) => {
  try {
    await addDoc(userStatsCollection, {
      username,
      email,
      click,
      score,
      positionalClick,
      stereoClick,
      monoClick,
      missedClick,
      positionalMissedClick,
      stereoMissedClick,
      monoMissedClick,
      avgPositionalResponseTime,
      minPositionalResponseTime,
      avgStereoResponseTime,
      minStereoResponseTime,
      avgMonoResponseTime,
      minMonoResponseTime,
      date: Timestamp.fromDate(new Date()),
    })
  } catch (err) {
    console.error(err)
  }
}

export const getUserStats = async () => {
  try {
    const data = await getDocs(userStatsCollection)
    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    console.log('data from firebase:', filteredData)

    return filteredData
  } catch (err) {
    console.error(err)
  }
}
