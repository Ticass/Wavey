-- app.lua
local lapis = require("lapis")
local app = lapis.Application()
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

lapis.Application.set_cookie = function(self, name, value, opts)
  local defaults = {
    path = "/",
    httponly = true,
    secure = self.req.parsed_url.scheme == "https",
    samesite = "None"
  }
  for k, v in pairs(defaults) do
    if opts[k] == nil then
      opts[k] = v
    end
  end
  return lapis.Application.super.set_cookie(self, name, value, opts)
end

local function modify_cookies_for_samesite(self)
  local cookies = self.res.headers["Set-Cookie"]

  if cookies then
      -- If there's only one cookie being set, Lua returns it as a string.
      -- Convert it to a table for consistency.
      if type(cookies) == "string" then
          cookies = {cookies}
      end

      for i, cookie in ipairs(cookies) do
          -- Only modify the session cookie
          if cookie:match("^lapis_session=") then
              -- Check if the SameSite attribute is missing. If it is, add it.
              if not cookie:match("SameSite=") then
                  cookies[i] = cookie .. "; SameSite=None; Secure"
              end
          end
      end

      -- Update the headers
      self.res.headers["Set-Cookie"] = cookies
  end
end



app:before_filter(modify_cookies_for_samesite)


-- Include the routes
app:include("routes")


return app
