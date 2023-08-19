import React, {useState} from 'react'
import UserContext from './UserContext'
import axios from 'axios';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const getCurrentUser = async () => {
      try {
          const response = await axios.get('http://localhost:8080/current', {withCredentials: true});
          console.log(response.data.user, "Response");
          setUser(response.data.user)
          return response.data.user;
      } catch (error) {
          console.error("Error fetching current user:", error);
          return null;
      }
  }

  const getUserById = async (id) => {
    try {
      const response = await axios.get('http://localhost:8080/getUser', {params: {id: id}})
      return response.data.user
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }

  const getProfilePicture = async (userId) => {
    try {
      const response = await axios.get('http://localhost:8080/profilePicture', {params: {id: userId}})
      return response.data.photo
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }

    return (
        <UserContext.Provider value={{ user, getCurrentUser, getUserById, getProfilePicture }}>
          {children}
        </UserContext.Provider>
      );
}
export default UserProvider;
