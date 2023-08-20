local Model = require("lapis.db.model").Model
local Like = Model:extend("likes")

function Like:GetLikesByWaveId(wave_id)
    local likes = Like:count("wave_id = ?", wave_id)
    return likes
end




return Like
