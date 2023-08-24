local http = require("socket.http")
local cjson = require("cjson") -- Load the cjson library
local Notifier = {}

function Notifier.notify(message)
    local url = "http://localhost:3001/notify" -- Change this to the correct URL

    local data = {
        message = message
    }

    local response, status_code = http.request{
        url = url,
        method = "POST",
        headers = {
            ["Content-Type"] = "application/json", -- Use JSON content type
        },
        source = ltn12.source.string(cjson.encode(data)) -- Encode the data as JSON using cjson
    }

    if status_code == 200 then
        return true, response
    else
        return false, response
    end
end

return Notifier
