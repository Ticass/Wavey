local Model = require("lapis.db.model").Model
local Like = Model:extend("likes")

function Like:GetLikesByWaveId(wave_id)
    local likes = Like:count("wave_id = ?", wave_id)
    return likes
end

function Like:GetLikesByWaveAndUser(wave_id, user_id)
    return Like:count("wave_id = ?::text AND user_id = ?::text AND deleted = ?", tostring(wave_id), tostring(user_id), false)
end

function Like:GetUserLike(wave_id, user_id)
    return Like:select("where wave_id = ?::text AND user_id = ?::text AND deleted = ?", tostring(wave_id), tostring(user_id), false)
end

function Like:RemoveLike(like_id)
    local like = Like:find(like_id)
    if not like then return end

    like:update({deleted = true})
end






return Like
