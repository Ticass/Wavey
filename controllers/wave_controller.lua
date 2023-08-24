local Wave = require("models.wave")
local User = require("models.user")
local Like = require("models.likes")
local Comment = require("models.comments")
local Notifier = require("websocket.handler")
local  WaveController = {}

function WaveController:CreateWave()
    local params = self.params
    local user_id = params.id
    local user = User:find(user_id)
    local first_name = user.first_name
    local last_name = user.last_name
    local content = params.content
    local photo = params.content_photo

    if first_name and content then
        local wave = Wave:create({
            first_name = first_name,
            last_name = last_name,
            content = content,
            user_id = user.id,
            content_photo = photo
        })

        -- Notify WebSocket clients about the new post
        Notifier.notify("New post has been made")

        return { json = { wave = wave } }
    end
end

function WaveController:EditWave()
local params = self.params
local user_id = self.session.current_user_id
local wave_id = params.wave_id
local content = params.content

if not user_id and not wave_id then return end

local wave = Wave:find({id = wave_id, user_id = user_id})

if not wave then return {json = {error = {"no wave found"}}} end

wave:update({content = content})
end


function WaveController:DeleteWave()
    local params = self.params
    local user_id = self.session.current_user_id
    local wave_id = params.wave_id

    if not user_id and not wave_id then return end

    local wave = Wave:find({id = wave_id, user_id = user_id})

    if not wave then return {json = {error = {"no wave found"}}} end

    wave:update({deleted = true})
end

function WaveController:SurfWave()

end


function WaveController:GetAllWaves()
    local params = self.params
    local user_id = params.user_id
    if user_id then
        local waves = Wave:select("where user_id = ? and deleted = ? order by id desc", user_id, false)
        return {json = {waves = waves}}
    end

    if not user_id then
        local waves = Wave:select("where deleted = ? order by id desc", false)
    return {json = {waves = waves}}
    end

end

--Takes a wave ID from params and a user ID from the session
function WaveController:LikeWave()
    local params = self.params
    local wave_id = params.wave_id
    local user_id = self.session.current_user_id
    if not user_id and not wave_id then return end

    local wave = Wave:find(wave_id)
    local activeLikes = Like:GetUserLike(wave_id, user_id, false)
    local deletedLikes = Like:GetUserLike(wave_id, user_id, true)
    local liked = activeLikes[1]
    local unLiked = deletedLikes[1]
    if liked then
        Like:RemoveLike(liked.id)
    end
    if unLiked then
        Like:Like(unLiked.id)
    end

    if not liked and not unLiked then
        Like:create({
            user_id = user_id,
            wave_id = wave_id,
        })
    end

    wave:update({likes = Like:GetLikesByWaveId(wave_id)})
    return {json = {count = Like:GetLikesByWaveId(wave_id)}}
end

function WaveController:CommentWave()
    local params = self.params
    local wave_id = params.wave_id
    local user_id = self.session.current_user_id
    local content = params.content

    if not user_id and not wave_id then return end

    local comment = Comment:create({
        user_id = user_id,
        wave_id = wave_id,
        content = content,
    })

    return {json = {comment = comment}}

end

return WaveController
