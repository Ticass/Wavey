# Wavey
(TAKE NOTE THAT THE VERCEL LINK IS NOT WORKING WITHOUT AN ACTIVE BACKEND SERVER, I AM WORKING ON GETTING IT DEPLOYED SOON FOR DEMO PURPOSES)
<br/>
<br/>
A social media platform built using the Lapis framework (lua), Express.js and socket.io (For websocket) and React.js, backed by a PostgreSQL database. Connect with friends, share posts, and experience real-time interactions.

Wavey is the proof Lua can be used for more than just video games, and makes an awesome web project to show off. 

[![Wavey Demo](https://i.gyazo.com/8e2fd2b396ce0ecd76ccf1d773d3e984.gif)](https://gyazo.com/8e2fd2b396ce0ecd76ccf1d773d3e984)

[![Image from Gyazo](https://i.gyazo.com/78f583099b2d2bede23d4bb1c07d6ebd.gif)](https://gyazo.com/78f583099b2d2bede23d4bb1c07d6ebd)

[![Image from Gyazo](https://i.gyazo.com/0021b8d69138339c3f60b7af0451671a.gif)](https://gyazo.com/0021b8d69138339c3f60b7af0451671a)

[![Image from Gyazo](https://i.gyazo.com/3fe2d42eee19cccd83d59cb8bce1e7a0.gif)](https://gyazo.com/3fe2d42eee19cccd83d59cb8bce1e7a0)

## Current Features

- **Authentication**: Securely log in to your Wavey account.
- **Posting**: Share your thoughts and updates with your friends.
- **Commenting**: Engage in conversations by commenting on posts.
- **Comment Replies**: Share your thoughts about a certain comment.
- **Liking / Unliking**: Show appreciation for posts through likes.
- **User Profiles**: Customize your profile and let others know about you.
- **Friend Requests**: Connect with others by sending and accepting friend requests.
- **Friends**: Build your social circle; upcoming integration with the feed.

## Implemented Features with WebSockets

| Feature                 | Status   |
|-------------------------|----------|
| Posting            | ✅       |
| Commenting  |  ✅       |
| Likes     | ✅        |
| Friend requests | ✅       |
| Comment Reply  | ✅      |

## Running the project locally
- start postgreSQL service
- lapis server (in main folder)
- yarn start (in aquascape/src)
- node Server.js (in websocket folder)

## Contact

For any questions or suggestions, feel free to reach out at [alexis.grenier2000@gmail.com](mailto:alexis.grenier2000@gmail.com).

## License

Wavey is released under the [MIT License](LICENSE).
