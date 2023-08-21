local Model = require("lapis.db.model").Model
local Comment = Model:extend("comments")

function Comment:GetCommentsByWaveId(wave_id)
    local comments = Comment:select("where wave_id = ? order by id desc ", wave_id)
    return comments
end

return Comment
