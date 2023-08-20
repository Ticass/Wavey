-- app.lua
local lapis = require("lapis")
local app = lapis.Application()
local UserController = require("controllers.user_controller")
local WaveController = require("controllers.wave_controller")
local LikeController = require("controllers.like_controller")
local db = require("lapis.db")

local function isConnectedToDB()
  local res = db.query("SELECT NOW() as time")
if res and #res > 0 then
  print("Successfully connected to the database. Current time is: " .. res[1].time)
else
  print("Failed to connect to the database.")
end
end

app:get("/", function(self)
  isConnectedToDB()
  return { render = "index" }
end)



app:get("/getUser", UserController.GetUser)
app:post("/register", UserController.Register)
app:post("/login", UserController.Login)
app:get("/waves", WaveController.GetAllWaves)
app:post("/wave", WaveController.CreateWave)
app:get("/current", UserController.GetCurrentUser)
app:get('/profilePicture', UserController.GetProfilePictureUrl)
app:get("/waves/likes", LikeController.GetLikesByWaveId)
return app
