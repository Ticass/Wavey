local Like = require('models.likes')
local User = require('models.user')
local Wave = require('models.wave')


local LikeController = {}

function LikeController:GetLikesByWaveId()
    local params = self.params
    local wave_id = params.wave_id
    local count = Like:GetLikesByWaveId(wave_id)

    return {json = {count = count}}
end

return LikeController
