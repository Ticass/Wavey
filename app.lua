-- app.lua
local lapis = require("lapis")
local app = lapis.Application()
app:enable("etlua")
app.layout = require "views.header"
local Counter = require("models.counter")
local CounterController = require("controllers.counter_controller")
local db = require("lapis.db")

function isConnectedToDB()
  local res = db.query("SELECT NOW() as time")
if res and #res > 0 then
  print("Successfully connected to the database. Current time is: " .. res[1].time)
else
  print("Failed to connect to the database.")
end
end




app:get("/", function(self)
  -- local counter = Counters:find(1)
  -- print(counter)
  isConnectedToDB()
  if not Counter:find(1) then
    Counter:create({
      count = 12,
    })
  end
  local firstCounter = Counter:find(1)
  self.firstCounter = firstCounter
  return { render = "index" }
end)

app:get("/increment", CounterController.increment) -- Connect the /increment route to the increment action



return app
