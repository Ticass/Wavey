local Wave = require("models.wave")
local User = require("models.user")
local Like = require("models.likes")
local  WaveController = {}

function WaveController:CreateWave()
    local params = self.params
    local user_id = params.id
    local user = User:find(user_id)
    local first_name = user.first_name
    local last_name = user.last_name
    local content = params.content
    local photo = params.content_photo

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

--Takes a wave ID from params and a user ID from the session
function WaveController:LikeWave()
    local params = self.params
    local wave_id = params.wave_id
    local user_id = self.session.current_user_id
    if not user_id and not wave_id then return end

    local wave = Wave:find(wave_id)
    local likes = Like:GetLikesByWaveId(wave_id)
    --TODO: Add validation that the user did not already like
    Like:create({
        user_id = user_id,
        wave_id = wave_id,
    })
    wave:update({likes = likes})
    return {json = {count = likes}}
end

return WaveController
