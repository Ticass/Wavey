local Wave = require("models.wave")
local User = require("models.user")
local  WaveController = {}

function WaveController:CreateWave()
    local params = self.params
    local user_id = params.id
    local user = User:find(user_id)
    local first_name = user.first_name
    local last_name = user.last_name
    local content = params.content
    local photo = params.photo

    if (first_name and content) then
        local wave = Wave:create({
            first_name = first_name,
            last_name = last_name,
            content = content,
            user_id = user.id,
            content_photo = photo
        })

        return {json = {wave = wave }}
    end

end

function WaveController:GetAllWaves()
    local waves = Wave:select()
    return {json = {waves = waves}}
end

return WaveController
