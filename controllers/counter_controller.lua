local Counter = require("models.counter")
local lapis = require("lapis")

local CounterController = {}

function CounterController:increment()
    local counter = Counter:find(1)

    if counter then
        counter.count = counter.count + 1 -- Increment Counter value
        counter:update("count") -- Save changes to DB
    end
    return { json = { count = counter and counter.count or "Counter not found" } }
end

return CounterController
