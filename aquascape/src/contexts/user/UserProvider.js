import React, {useState, useCallback, useEffect} from 'react'
import UserContext from './UserContext'
import axios from 'axios';
import urls from '../../constants/urls';


const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)


    const getCurrentUser = async () => {
      try {
          const response = await axios.get(`${urls.apiNgrok}/current`, {withCredentials: true});
          console.log(response.data.user, "Response");
          return response.data.user;
      } catch (error) {
          console.error("Error fetching current user:", error);
          return null;
      }
  }

  useEffect(() => {
    getCurrentUser().then((user) => setCurrentUser(user))
  }, [])

  const getUserById = async (id) => {
    try {
      const response = await axios.get(`${urls.apiNgrok}/getUser`, {params: {id: id}})
      return response.data.user
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }

  const getProfilePicture = useCallback(async (userId) => {
    try {
        const response = await axios.get(`${urls.apiNgrok}/profilePicture`, {params: {id: userId}})
        return response.data.photo;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}, []);


    return (
        <UserContext.Provider value={{currentUser, getCurrentUser, getUserById, getProfilePicture }}>
          {children}
        </UserContext.Provider>
      );
}
export default UserProvider;
