-- app.lua
local lapis = require("lapis")
local app = lapis.Application()
app:enable("etlua")
app.layout = require "views.header"


app:get("/", function(self)
  return { render = "index" }
end)

return app
