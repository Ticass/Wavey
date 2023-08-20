local Model = require("lapis.db.model").Model
local Like = Model:extend("likes")

function Like:GetLikesByWaveId(wave_id)
    local likes = Like:count("wave_id = ?", wave_id)
    return likes
end

function Like:GetLikesByWaveAndUser(wave_id, user_id)
    return Like:count("wave_id = ?::text AND user_id = ?::text", tostring(wave_id), tostring(user_id))
end

function Like:GetUserLike(wave_id, user_id)
    return Like:select("wave_id = ?::text AND user_id = ?::text", tostring(wave_id), tostring(user_id))
end






return Like
