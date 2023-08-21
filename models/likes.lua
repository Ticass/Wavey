local Model = require("lapis.db.model").Model
local Like = Model:extend("likes")

function Like:GetLikesByWaveId(wave_id)
    local likes = Like:count("wave_id = ? AND deleted = ?", wave_id, false)
    return likes
end

function Like:GetLikesByWaveAndUser(wave_id, user_id)
    return Like:count("wave_id = ? AND user_id = ? AND deleted = ?", wave_id, user_id, false)
end

function Like:GetUserLike(wave_id, user_id, deleted)
    return Like:select("where wave_id = ? AND user_id = ? AND deleted = ?", wave_id, user_id, deleted)
end

function Like:RemoveLike(like_id)
    local like = Like:find(like_id)
    if not like then return end

    like:update({deleted = true})
end

function Like:Like(like_id)
    local like = Like:find(like_id)

    if not like then return end

    like:update({deleted = false})
end






return Like
