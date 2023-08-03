local Model = require("lapis.db.model").Model
local Counter = Model:extend("counter") -- 'counter' is the name of your table in the database

return Counter
