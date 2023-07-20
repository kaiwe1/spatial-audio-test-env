
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore"
import { db } from "../config/firebase-config"

const userStatsCollection = collection(db, "user_stats")

export const sendUserStats = async ({ username, email, click, score, averageResponseTime, minResponseTime }) => {
  try {
    await addDoc(userStatsCollection, {
      username,
      email,
      click,
      score,
      averageResponseTime,
      minResponseTime,
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
    console.log(filteredData)

    return filteredData
  } catch (err) {
    console.error(err)
  }
}
