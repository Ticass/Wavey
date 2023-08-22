local Model = require("lapis.db.model").Model
local FriendRequest = Model:extend("friend_requests")

--User Id (Int) The user requesting the friend
-- Friend Id (Int) the user who gets added as a friend
-- Accepted (Boolean) -- Wether the request was accepted or not, null means no answer was given

function FriendRequest:Status(user_id, friend_id)
    if not user_id and not friend_id then return end
    local request = FriendRequest:find({ user_id = user_id, friend_id = friend_id })

    --No request ?
    if not request then return end

    return request.accepted
end

function FriendRequest:AcceptRequest(request_id)
    local request = FriendRequest:find(request_id)
    if request then
        return request:update({ accepted = true })
    end
end

function FriendRequest:DenyRequest(request_id)
    local request = FriendRequest:find(request_id)
    if request then
        return request:update({ accepted = false })
    end
end

function FriendRequest:IgnoreRequest(request_id)
    local request = FriendRequest:find(request_id)
    if request then
        return request:update({ accepted = nil })
    end
end

return FriendRequest
