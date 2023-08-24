local lapis = require("lapis")
local UserController = require("controllers.user_controller")
local WaveController = require("controllers.wave_controller")
local LikeController = require("controllers.like_controller")
local CommentController = require("controllers.comments_controller")
local FriendsController = require("controllers.friends_controller")
local app = lapis.Application()

--Auth and User context API
app:post("/register", UserController.Register)
app:post("/login", UserController.Login)
app:get("/getUser", UserController.GetUser)
app:get("/current", UserController.GetCurrentUser)
app:get('/profilePicture', UserController.GetProfilePictureUrl)
-- Waves
app:get("/waves", WaveController.GetAllWaves)
app:post("/wave", WaveController.CreateWave)
app:get("/waves/likes", LikeController.GetLikesByWaveId)
app:post("/wave/comment", WaveController.CommentWave)
app:post("/wave/like", WaveController.LikeWave)
app:get("/waves/comments", CommentController.ShowByWave)
app:post('/wave/delete',  WaveController.DeleteWave)
app:post('/wave/edit', WaveController.EditWave)
--Comments
app:post('/comment/:parent_id/reply', CommentController.Reply)
app:post('/reply/:comment_id/edit', CommentController.EditReply)
app:post('/reply/:comment_id/delete', CommentController.DeleteReply)
--User and friends
app:get("/user/:user_id/friends", FriendsController.DisplayFriends)
app:post("/user/:user_id/friend/:friend_id/add", FriendsController.AddFriend)
app:post("/user/:user_id/friend/:friend_id/remove", FriendsController.Unfriend)
app:get("/friends/:user_id/:friend_id/status", FriendsController.Status)
app:get('/user/:user_id/friend_requests', FriendsController.GetAllFriendRequestsByUser)
app:post('/user/:friend_id/request', FriendsController.SendFriendRequest)
app:post('/request/:request_id/accept', FriendsController.AcceptFriendRequest)
app:post('/request/:request_id/deny', FriendsController.DenyFriendRequest)


return app
