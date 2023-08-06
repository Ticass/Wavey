local Counter = require("models.counter")

local CounterController = {}

function CounterController:increment()
    local counter = Counter:find(1)

    if counter then
        counter.count = counter.count + 1 -- Increment Counter value
        counter:update("count") -- Save changes to DB
    end
    return { json = { count = counter and counter.count or "Counter not found" } }
end

function CounterController:getCount()
    local params = self.params
    local id = params.id
    local counter = Counter:find(id)
    if counter == nil then return end

    return {json = {count = counter.count} }
end

return CounterController
