local Comment = require("models.comments")
local User = require("models.user")
local Notifier = require("notifier")
local CommentController = {}

function CommentController:ShowByWave()
    local params = self.params
    local wave_id = params.wave_id

    if not wave_id then return end

    local comments = Comment:GetCommentsByWaveId(wave_id)

    if not comments then return { json = { message = "No comments found" } } end

    local data = {}

    for _, v in pairs(comments) do
        local comment_id = v.id
        local user_id = v.user_id
        local parent_id = v.parent_id
        local content = v.content
        if not user_id then return end
        local user = User:find(user_id)

        table.insert(data, {
            id = comment_id,
            user_id = user_id,
            wave_id = wave_id,
            parent_id = parent_id,
            content = content,
            profile_picture = user.profile_picture,
            first_name = user.first_name,
            last_name = user.last_name
        })
    end

    return { json = { comments = data } }
end

function CommentController:Reply()
    local current_user = User:find(self.session.current_user_id)
    local params = self.params
    local parent_id = params.parent_id
    local content = params.content
    local wave_id = params.wave_id
    local parent_comment = Comment:find(parent_id)
    if not current_user and not parent_comment then return end

    local reply = Comment:create({
        wave_id = wave_id, user_id = current_user.id, content = content, parent_id = parent_comment.id
    })
    Notifier.notify("New Reply Received")
    return {json = {reply = reply}}
end

function CommentController:EditReply()
    local current_user = User:find(self.session.current_user_id)
    local params = self.params
    local comment_id = params.comment_id
    local content = params.content
    local reply = Comment:find(comment_id)
    if not current_user and not reply then return {json = {message = "Error no reply or current_user found"}} end

    local new_reply = reply:update({content = content})
    Notifier.notify("New Reply Received")
    return {json = {reply = new_reply}}

end

function CommentController:DeleteReply()
    local current_user = User:find(self.session.current_user_id)
    local params = self.params
    local comment_id = params.comment_id
    local reply = Comment:find(comment_id)
    if not current_user and not reply then return {json = {message = "Error no reply or current_user found"}} end

    reply:delete()
    Notifier.notify("New Reply Received")
    return {json = {Message = 'Deleted reply successfully'}}
end

return CommentController;
