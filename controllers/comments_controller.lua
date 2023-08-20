local Comment = require("models.comments")
local  CommentController = {}

function CommentController:ShowByWave()
    local params = self.params
    local wave_id = params.wave_id

    if not wave_id then return end

    local comments = Comment:GetCommentsByWaveId(wave_id)
    return {json = {comments = comments}}
end

return CommentController;
